import { useEffect, useMemo, useState } from 'react';
import { categoryOptions, initialResources, typeOptions } from './data';
import { Resource } from './types';

const storageKey = 'discipulado-resources-v1';
const authStorageKey = 'discipulado-admin-session-v1';
const emptyResource: Omit<Resource, 'id' | 'createdAt' | 'displayOrder'> = {
  title: '',
  description: '',
  category: categoryOptions[0],
  type: 'document',
  imageUrl: '',
  fileUrl: '',
  externalUrl: '',
  author: '',
  isPublished: true,
  isFeatured: false,
};

const parseStoredResources = (): Resource[] => {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return initialResources;

  try {
    return JSON.parse(raw) as Resource[];
  } catch {
    return initialResources;
  }
};

function App() {
  const [resources, setResources] = useState<Resource[]>(() => parseStoredResources());
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem(authStorageKey) === 'authenticated');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [formState, setFormState] = useState<Resource | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(resources));
  }, [resources]);

  const publicResources = useMemo(() => {
    return resources
      .filter((resource) => resource.isPublished)
      .filter((resource) => {
        const query = search.toLowerCase().trim();
        return !query || [resource.title, resource.description, resource.category, resource.author]
          .join(' ')
          .toLowerCase()
          .includes(query);
      })
      .filter((resource) => !categoryFilter || resource.category === categoryFilter)
      .filter((resource) => !typeFilter || resource.type === typeFilter)
      .sort((a, b) => b.displayOrder - a.displayOrder);
  }, [resources, search, categoryFilter, typeFilter]);

  useEffect(() => {
    window.parent?.postMessage(
      {
        type: 'DISCIPLESHIP_APP_HEIGHT',
        height: document.documentElement.scrollHeight,
      },
      '*',
    );
  }, [publicResources]);

  const featuredResources = publicResources.filter((resource) => resource.isFeatured).slice(0, 3);
  const recentResources = publicResources;

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('Usa el panel admin.html publicado para iniciar sesión con Firebase.');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem(authStorageKey);
  };

  const createResource = () => {
    const next = {
      ...emptyResource,
      id: `res-${Date.now()}`,
      createdAt: new Date().toISOString(),
      displayOrder: resources.length + 1,
    } as Resource;

    setFormState(next);
  };

  const saveResource = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState) return;
    if (!formState.title.trim() || !formState.category.trim() || !formState.type.trim()) {
      setErrorMessage('Título, categoría y tipo son obligatorios.');
      return;
    }

    const normalized = {
      ...formState,
      title: formState.title.trim(),
      description: formState.description.trim(),
      author: formState.author?.trim() || 'Sin autor',
    };

    const existingIndex = resources.findIndex((resource) => resource.id === normalized.id);

    if (existingIndex >= 0) {
      setResources((current) =>
        current.map((resource) => (resource.id === normalized.id ? normalized : resource)),
      );
    } else {
      setResources((current) => [normalized, ...current]);
    }

    setFormState(null);
    setErrorMessage('');
  };

  const removeResource = (id: string) => {
    if (!window.confirm('¿Eliminar este recurso?')) return;
    setResources((current) => current.filter((resource) => resource.id !== id));
  };

  const togglePublished = (id: string) => {
    setResources((current) =>
      current.map((resource) =>
        resource.id === id ? { ...resource, isPublished: !resource.isPublished } : resource,
      ),
    );
  };

  const toggleFeatured = (id: string) => {
    setResources((current) =>
      current.map((resource) =>
        resource.id === id ? { ...resource, isFeatured: !resource.isFeatured } : resource,
      ),
    );
  };

  const editResource = (resource: Resource) => {
    setFormState(resource);
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <div className="brand-lockup">
            <div className="logo-badge">
              <img src="./prfwb-logo-cropped-v2.png" alt="PR Free Will Baptists" />
            </div>
            <div className="brand-name">Recursos de Discipulado</div>
          </div>
          <span className="eyebrow">Portal de Recursos</span>
          <h1>Recursos de discipulado para la iglesia</h1>
          <p>
            Encuentra materiales, estudios, devocionales y recursos para líderes en un único portal
            pensado para mostrarse dentro de Wix usando un iframe o HTML Embed.
          </p>
        </div>
        <button className="ghost-button" onClick={() => setIsAdmin((value) => !value)}>
          {isAdmin ? 'Panel activo' : 'Ir al panel'}
        </button>
      </header>

      <section className="filter-grid">
        <label>
          Buscar
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Título, tema o autor" />
        </label>
        <label>
          Categoría
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">Todas</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tipo
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">Todos</option>
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="public-section">
        <div className="section-header">
          <h2>Recursos destacados</h2>
        </div>
        {featuredResources.length === 0 ? (
          <div className="empty-state">No hay recursos destacados con los filtros actuales.</div>
        ) : (
          <div className="card-grid">
            {featuredResources.map((resource) => (
              <article key={resource.id} className="resource-card">
                <img src={resource.imageUrl || 'https://placehold.co/800x500'} alt={resource.title} loading="lazy" />
                <div className="card-body">
                  <span className="tag">{resource.category}</span>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <div className="card-meta">
                    <span>{resource.type}</span>
                    <span>{resource.author}</span>
                  </div>
                  <a href={resource.externalUrl || resource.fileUrl || '#'} target="_blank" rel="noreferrer noopener">
                    Abrir recurso
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="public-section">
        <div className="section-header">
          <h2>Todos los recursos</h2>
        </div>
        {recentResources.length === 0 ? (
          <div className="empty-state">No se encontraron recursos. Intenta cambiar los filtros.</div>
        ) : (
          <div className="card-grid compact-grid">
            {recentResources.map((resource) => (
              <article key={resource.id} className="resource-card compact-card">
                <div className="card-body">
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <div className="card-meta">
                    <span>{resource.category}</span>
                    <span>{resource.type}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="admin-section">
        <div className="section-header">
          <h2>Panel administrativo</h2>
          {isAdmin ? <button className="danger-button" onClick={handleLogout}>Cerrar sesión</button> : null}
        </div>

        {!isAdmin ? (
          <form className="admin-login" onSubmit={handleLogin}>
            <label>
              Email
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm((current) => ({ ...current, email: e.target.value }))}
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((current) => ({ ...current, password: e.target.value }))}
              />
            </label>
            <button type="submit">Iniciar sesión</button>
            {errorMessage ? <p className="error-text">{errorMessage}</p> : null}
          </form>
        ) : (
          <div className="admin-content">
            <div className="admin-actions">
              <button onClick={createResource}>Nuevo recurso</button>
            </div>

            {formState ? (
              <form className="resource-form" onSubmit={saveResource}>
                <h3>{formState.id ? 'Editar recurso' : 'Crear recurso'}</h3>
                <label>
                  Título
                  <input
                    value={formState.title}
                    onChange={(e) => setFormState((current) => (current ? { ...current, title: e.target.value } : null))}
                    required
                  />
                </label>
                <label>
                  Descripción
                  <textarea
                    value={formState.description}
                    onChange={(e) => setFormState((current) => (current ? { ...current, description: e.target.value } : null))}
                  />
                </label>
                <label>
                  Categoría
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState((current) => (current ? { ...current, category: e.target.value } : null))}
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Tipo
                  <select
                    value={formState.type}
                    onChange={(e) =>
                      setFormState((current) => (current ? { ...current, type: e.target.value as Resource['type'] } : null))
                    }
                  >
                    {typeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Autor
                  <input
                    value={formState.author || ''}
                    onChange={(e) => setFormState((current) => (current ? { ...current, author: e.target.value } : null))}
                  />
                </label>
                <label>
                  URL externa
                  <input
                    value={formState.externalUrl || ''}
                    onChange={(e) => setFormState((current) => (current ? { ...current, externalUrl: e.target.value } : null))}
                  />
                </label>
                <label>
                  Imagen URL
                  <input
                    value={formState.imageUrl || ''}
                    onChange={(e) => setFormState((current) => (current ? { ...current, imageUrl: e.target.value } : null))}
                  />
                </label>
                <label>
                  Enlace del archivo
                  <input
                    value={formState.fileUrl || ''}
                    onChange={(e) => setFormState((current) => (current ? { ...current, fileUrl: e.target.value } : null))}
                  />
                </label>
                <div className="checkbox-row">
                  <label>
                    <input
                      type="checkbox"
                      checked={formState.isPublished}
                      onChange={(e) => setFormState((current) => (current ? { ...current, isPublished: e.target.checked } : null))}
                    />
                    Publicado
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={formState.isFeatured}
                      onChange={(e) => setFormState((current) => (current ? { ...current, isFeatured: e.target.checked } : null))}
                    />
                    Destacado
                  </label>
                </div>
                <div className="form-actions">
                  <button type="submit">Guardar</button>
                  <button type="button" className="ghost-button" onClick={() => setFormState(null)}>
                    Cancelar
                  </button>
                </div>
              </form>
            ) : null}

            <div className="admin-table">
              {resources.map((resource) => (
                <div className="admin-row" key={resource.id}>
                  <div>
                    <strong>{resource.title}</strong>
                    <small>
                      {resource.category} · {resource.type} · {resource.isPublished ? 'Publicado' : 'Borrador'}
                    </small>
                  </div>
                  <div className="row-actions">
                    <button onClick={() => togglePublished(resource.id)}>{resource.isPublished ? 'Despublicar' : 'Publicar'}</button>
                    <button onClick={() => toggleFeatured(resource.id)}>{resource.isFeatured ? 'Quitar destaque' : 'Destacar'}</button>
                    <button onClick={() => editResource(resource)}>Editar</button>
                    <button className="danger-button" onClick={() => removeResource(resource.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
