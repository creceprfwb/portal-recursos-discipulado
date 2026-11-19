(function () {
  const resourcesStorageKey = 'discipulado-resources-v1';
  const prayerStorageKey = 'discipulado-prayer-requests-v1';
  const eventRegistrationsStorageKey = 'discipulado-event-registrations-v1';
  const forumStorageKey = 'discipulado-forum-posts-v1';
  const subscribersStorageKey = 'discipulado-subscribers-v1';
  const resourceDownloadsStorageKey = 'discipulado-resource-downloads-v1';
  const authStorageKey = 'discipulado-admin-session-v1';
  const parkingServersStorageKey = 'prfwb-parking-servers-v1';
  const parkingAssignmentsStorageKey = 'prfwb-parking-assignments-v1';
  const calendarEventsStorageKey = 'prfwb-calendar-events-v1';
  const config = window.firebaseConfig || {};
  const hasRealConfig = Boolean(
    config.apiKey &&
      config.apiKey !== 'TU_API_KEY' &&
      config.projectId &&
      config.projectId !== 'tu-proyecto-id' &&
      config.appId &&
      config.appId !== 'TU_APP_ID'
  );

  const firebaseState = {
    app: null,
    auth: null,
    db: null,
    isConfigured: hasRealConfig,
    isReady: false
  };

  function initFirebase() {
    if (!hasRealConfig || !window.firebase) {
      return false;
    }

    try {
      firebaseState.app = firebase.initializeApp(config);
      firebaseState.auth = firebase.auth();
      firebaseState.db = firebase.firestore();
      firebaseState.isReady = true;
      return true;
    } catch (error) {
      console.warn('No se pudo inicializar Firebase:', error);
      return false;
    }
  }

  async function getResources() {
    const localResources = JSON.parse(localStorage.getItem(resourcesStorageKey) || 'null') || [];

    if (!firebaseState.isConfigured || !firebaseState.db) {
      return localResources;
    }

    try {
      const snapshot = await firebaseState.db.collection('resources').orderBy('displayOrder', 'desc').get();
      const remoteResources = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (remoteResources.length) {
        localStorage.setItem(resourcesStorageKey, JSON.stringify(remoteResources));
        return remoteResources;
      }
    } catch (error) {
      console.warn('No se pudo leer desde Firestore, usando fallback local:', error);
    }

    return localResources;
  }

  async function saveResources(resources) {
    localStorage.setItem(resourcesStorageKey, JSON.stringify(resources));

    if (!firebaseState.isConfigured || !firebaseState.db) {
      return;
    }

    try {
      const batch = firebaseState.db.batch();
      const nextResourceIds = new Set(resources.map((resource, index) => resource.id || `res-${index}`));
      const currentSnapshot = await firebaseState.db.collection('resources').get();

      currentSnapshot.docs.forEach((doc) => {
        if (!nextResourceIds.has(doc.id)) {
          batch.delete(doc.ref);
        }
      });

      resources.forEach((resource, index) => {
        const resourceRef = firebaseState.db.collection('resources').doc(resource.id || `res-${index}`);
        batch.set(resourceRef, {
          ...resource,
          displayOrder: Number(resource.displayOrder ?? index + 1)
        });
      });
      await batch.commit();
    } catch (error) {
      console.warn('No se pudo guardar en Firestore, se conserva el fallback local:', error);
    }
  }

  async function signIn(email, password) {
    if (!firebaseState.isConfigured || !firebaseState.auth) {
      return false;
    }

    try {
      await firebaseState.auth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.warn('Firebase Auth falló:', error);
      return false;
    }
  }

  async function signOut() {
    if (firebaseState.auth && firebaseState.isConfigured) {
      await firebaseState.auth.signOut();
    }
    localStorage.removeItem(authStorageKey);
  }

  function sanitizePrayerRequest(doc) {
    const data = doc.data ? doc.data() : doc;
    return {
      id: doc.id || data.id,
      name: data.name || '',
      anonymous: Boolean(data.anonymous),
      title: data.title || '',
      description: data.description || '',
      category: data.category || 'Otra',
      status: data.status || 'pending',
      urgent: Boolean(data.urgent),
      privacy: data.privacy || 'public',
      allowEncouragement: data.allowEncouragement !== false,
      prayerCount: Number(data.prayerCount || 0),
      approved: Boolean(data.approved),
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt || ''
    };
  }

  async function getPrayerRequests({ includePending = false } = {}) {
    const localRequests = JSON.parse(localStorage.getItem(prayerStorageKey) || 'null') || [];

    if (!firebaseState.isConfigured || !firebaseState.db) {
      return includePending ? localRequests : localRequests.map(({ phone, email, notificationPreference, allowWhatsAppContact, ...request }) => request);
    }

    try {
      let query = firebaseState.db.collection('prayerRequests');
      if (!includePending) {
        query = query.where('approved', '==', true).where('privacy', '==', 'public');
      }
      const snapshot = await query.limit(80).get();
      let remoteRequests = snapshot.docs.map(sanitizePrayerRequest);

      if (includePending && firebaseState.auth?.currentUser) {
        remoteRequests = await Promise.all(remoteRequests.map(async (request) => {
          try {
            const contactDoc = await firebaseState.db.collection('prayerContacts').doc(request.id).get();
            const contact = contactDoc.exists ? contactDoc.data() : {};
            return {
              ...request,
              email: contact.email || '',
              phone: contact.phone || '',
              notificationPreference: contact.notificationPreference || 'none',
              allowWhatsAppContact: contact.notificationPreference === 'whatsapp'
            };
          } catch (contactError) {
            console.warn('No se pudo leer el contacto privado de la peticion:', contactError);
            return request;
          }
        }));
      }

      remoteRequests = remoteRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      if (!includePending) {
        localStorage.setItem(prayerStorageKey, JSON.stringify(remoteRequests));
      }
      return remoteRequests;
    } catch (error) {
      console.warn('No se pudieron leer peticiones de oración:', error);
      return localRequests;
    }
  }

  async function createPrayerRequest(payload) {
    const now = new Date().toISOString();
    const request = {
      name: payload.name || '',
      anonymous: Boolean(payload.anonymous),
      title: payload.title || '',
      description: payload.description || '',
      category: payload.category || 'Otra',
      status: 'pending',
      urgent: Boolean(payload.urgent),
      privacy: payload.privacy || 'public',
      allowEncouragement: payload.allowEncouragement !== false,
      prayerCount: 0,
      approved: false,
      createdAt: now,
      updatedAt: now
    };

    if (!firebaseState.isConfigured || !firebaseState.db) {
      const localRequests = JSON.parse(localStorage.getItem(prayerStorageKey) || 'null') || [];
      localStorage.setItem(prayerStorageKey, JSON.stringify([{
        id: `prayer-${Date.now()}`,
        ...request,
        email: payload.email || '',
        phone: payload.phone || '',
        notificationPreference: payload.notificationPreference || 'none'
      }, ...localRequests]));
      return true;
    }

    try {
      const docRef = await firebaseState.db.collection('prayerRequests').add({
        ...request,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      if (payload.email || payload.phone || payload.notificationPreference) {
        try {
          await firebaseState.db.collection('prayerContacts').doc(docRef.id).set({
            requestId: docRef.id,
            email: payload.email || '',
            phone: payload.phone || '',
            notificationPreference: payload.notificationPreference || 'none',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        } catch (contactError) {
          console.warn('La peticion se creo, pero no se pudo guardar el contacto privado:', contactError);
        }
      }
      return true;
    } catch (error) {
      console.warn('No se pudo crear la petición de oración:', error);
      return false;
    }
  }

  async function markPraying(requestId) {
    const localKey = `prayed-${requestId}`;
    if (localStorage.getItem(localKey)) return false;

    if (!firebaseState.isConfigured || !firebaseState.db) {
      localStorage.setItem(localKey, 'true');
      return true;
    }

    try {
      const ref = firebaseState.db.collection('prayerRequests').doc(requestId);
      await firebaseState.db.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(ref);
        const nextCount = Number(snapshot.data()?.prayerCount || 0) + 1;
        transaction.update(ref, {
          prayerCount: nextCount,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      });
      localStorage.setItem(localKey, 'true');
      return true;
    } catch (error) {
      console.warn('No se pudo registrar la oración:', error);
      return false;
    }
  }

  async function updatePrayerRequest(requestId, patch) {
    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return false;
    }

    try {
      await firebaseState.db.collection('prayerRequests').doc(requestId).update({
        ...patch,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return true;
    } catch (error) {
      console.warn('No se pudo actualizar la petición:', error);
      return false;
    }
  }

  async function createEventRegistration(payload) {
    const now = new Date().toISOString();
    const registration = {
      eventId: payload.eventId || 'convencion-2027',
      eventTitle: payload.eventTitle || '',
      name: payload.name || '',
      email: payload.email || '',
      phone: payload.phone || '',
      church: payload.church || '',
      attendees: String(payload.attendees || '1'),
      attendeeNames: Array.isArray(payload.attendeeNames) ? payload.attendeeNames.filter(Boolean) : [],
      role: payload.role || 'Miembro',
      notes: payload.notes || '',
      status: 'new',
      createdAt: now,
      updatedAt: now
    };

    if (!registration.name || !registration.email || !registration.attendeeNames.length) {
      return false;
    }

    if (!firebaseState.isConfigured || !firebaseState.db) {
      const localRegistrations = JSON.parse(localStorage.getItem(eventRegistrationsStorageKey) || 'null') || [];
      localStorage.setItem(
        eventRegistrationsStorageKey,
        JSON.stringify([{ id: `event-registration-${Date.now()}`, ...registration }, ...localRegistrations])
      );
      return true;
    }

    try {
      await firebaseState.db.collection('eventRegistrations').add({
        ...registration,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return true;
    } catch (error) {
      console.warn('No se pudo crear el registro del evento:', error);
      return false;
    }
  }

  async function getEventRegistrations() {
    const localRegistrations = JSON.parse(localStorage.getItem(eventRegistrationsStorageKey) || 'null') || [];

    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return localRegistrations;
    }

    try {
      const snapshot = await firebaseState.db
        .collection('eventRegistrations')
        .orderBy('createdAt', 'desc')
        .limit(200)
        .get();
      const remoteRegistrations = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || ''
        };
      });
      localStorage.setItem(eventRegistrationsStorageKey, JSON.stringify(remoteRegistrations));
      return remoteRegistrations;
    } catch (error) {
      console.warn('No se pudieron leer registros de eventos:', error);
      return localRegistrations;
    }
  }

  function sanitizeForumPost(doc) {
    const data = doc.data ? doc.data() : doc;
    return {
      id: doc.id || data.id,
      name: data.name || '',
      message: data.message || '',
      parentId: data.parentId || null,
      resourceId: data.resourceId || '',
      resourceTitle: data.resourceTitle || '',
      status: data.status || 'pending',
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt || ''
    };
  }

  async function getForumPosts({ includePending = false } = {}) {
    const localPosts = JSON.parse(localStorage.getItem(forumStorageKey) || 'null') || [];

    if (!firebaseState.isConfigured || !firebaseState.db) {
      return includePending ? localPosts : localPosts.filter((post) => post.status === 'approved').map(({ email, ...post }) => post);
    }

    try {
      let query = firebaseState.db.collection('forumPosts');
      if (!includePending) {
        query = query.where('status', '==', 'approved');
      }
      const snapshot = await query.limit(200).get();
      let remotePosts = snapshot.docs.map(sanitizeForumPost);

      if (includePending && firebaseState.auth?.currentUser) {
        remotePosts = await Promise.all(remotePosts.map(async (post) => {
          try {
            const contactDoc = await firebaseState.db.collection('forumContacts').doc(post.id).get();
            return { ...post, email: contactDoc.exists ? contactDoc.data().email || '' : '' };
          } catch (contactError) {
            console.warn('No se pudo leer el contacto privado del foro:', contactError);
            return post;
          }
        }));
      }

      remotePosts = remotePosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      if (!includePending) {
        localStorage.setItem(forumStorageKey, JSON.stringify(remotePosts));
      }
      return remotePosts;
    } catch (error) {
      console.warn('No se pudieron leer las publicaciones del foro:', error);
      return localPosts;
    }
  }

  async function createForumPost(payload) {
    const now = new Date().toISOString();
    const post = {
      name: payload.name || '',
      message: payload.message || '',
      parentId: payload.parentId || null,
      resourceId: payload.resourceId || '',
      resourceTitle: payload.resourceTitle || '',
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };

    if (!post.name || !post.message || !post.resourceId) {
      return false;
    }

    if (!firebaseState.isConfigured || !firebaseState.db) {
      const localPosts = JSON.parse(localStorage.getItem(forumStorageKey) || 'null') || [];
      localStorage.setItem(forumStorageKey, JSON.stringify([
        ...localPosts,
        { id: `forum-${Date.now()}`, ...post, email: payload.email || '' }
      ]));
      return true;
    }

    try {
      const docRef = await firebaseState.db.collection('forumPosts').add({
        ...post,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      if (payload.email) {
        try {
          await firebaseState.db.collection('forumContacts').doc(docRef.id).set({
            postId: docRef.id,
            email: payload.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        } catch (contactError) {
          console.warn('La publicación se creó, pero no se pudo guardar el contacto privado:', contactError);
        }
      }
      return docRef.id;
    } catch (error) {
      console.warn('No se pudo crear la publicación del foro:', error);
      return false;
    }
  }

  async function updateForumPost(postId, patch) {
    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return false;
    }

    if (patch?.delete) {
      try {
        await firebaseState.db.collection('forumPosts').doc(postId).delete();
        return true;
      } catch (error) {
        console.warn('No se pudo eliminar la publicación:', error);
        return false;
      }
    }

    try {
      await firebaseState.db.collection('forumPosts').doc(postId).update({
        ...patch,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return true;
    } catch (error) {
      console.warn('No se pudo actualizar la publicación del foro:', error);
      return false;
    }
  }

  async function createSubscriber(payload) {
    const now = new Date().toISOString();
    const subscriber = {
      name: payload.name || '',
      email: payload.email || '',
      phone: payload.phone || '',
      church: payload.church || '',
      purpose: payload.purpose || '',
      createdAt: now
    };

    if (!subscriber.name || !subscriber.email || !subscriber.church) {
      return false;
    }

    if (!firebaseState.isConfigured || !firebaseState.db) {
      const localSubscribers = JSON.parse(localStorage.getItem(subscribersStorageKey) || 'null') || [];
      const id = `subscriber-${Date.now()}`;
      localStorage.setItem(subscribersStorageKey, JSON.stringify([...localSubscribers, { id, ...subscriber }]));
      return id;
    }

    try {
      const docRef = await firebaseState.db.collection('subscribers').add({
        ...subscriber,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.warn('No se pudo crear el suscriptor:', error);
      return false;
    }
  }

  async function getSubscribers() {
    const localSubscribers = JSON.parse(localStorage.getItem(subscribersStorageKey) || 'null') || [];

    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return localSubscribers;
    }

    try {
      const snapshot = await firebaseState.db.collection('subscribers').orderBy('createdAt', 'desc').limit(300).get();
      const remoteSubscribers = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || ''
        };
      });
      localStorage.setItem(subscribersStorageKey, JSON.stringify(remoteSubscribers));
      return remoteSubscribers;
    } catch (error) {
      console.warn('No se pudieron leer los suscriptores:', error);
      return localSubscribers;
    }
  }

  async function logResourceDownload(payload) {
    const now = new Date().toISOString();
    const download = {
      subscriberId: payload.subscriberId || '',
      resourceId: payload.resourceId || '',
      resourceTitle: payload.resourceTitle || '',
      createdAt: now
    };

    if (!download.subscriberId || !download.resourceId) {
      return false;
    }

    if (!firebaseState.isConfigured || !firebaseState.db) {
      const localDownloads = JSON.parse(localStorage.getItem(resourceDownloadsStorageKey) || 'null') || [];
      localStorage.setItem(resourceDownloadsStorageKey, JSON.stringify([
        ...localDownloads,
        { id: `download-${Date.now()}`, ...download }
      ]));
      return true;
    }

    try {
      await firebaseState.db.collection('resourceDownloads').add({
        ...download,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return true;
    } catch (error) {
      console.warn('No se pudo registrar la descarga:', error);
      return false;
    }
  }

  async function getResourceDownloads() {
    const localDownloads = JSON.parse(localStorage.getItem(resourceDownloadsStorageKey) || 'null') || [];

    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return localDownloads;
    }

    try {
      const snapshot = await firebaseState.db.collection('resourceDownloads').orderBy('createdAt', 'desc').limit(300).get();
      const remoteDownloads = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || ''
        };
      });
      localStorage.setItem(resourceDownloadsStorageKey, JSON.stringify(remoteDownloads));
      return remoteDownloads;
    } catch (error) {
      console.warn('No se pudieron leer las descargas:', error);
      return localDownloads;
    }
  }

  // Teléfonos y notas: con las reglas de protección de contactos viven en parkingContacts (privado, solo quien administra el calendario). Mientras esas reglas no existan
  // (o si la sesión no tiene permiso) todo sigue funcionando como antes con lo que haya en parkingServers.
  // contactsMode: 'desconocido' hasta la primera lectura; 'privado' si parkingContacts respondió; 'anterior' si se denegó el permiso (un error de red NO cambia el modo).
  // contactsLoaded: última lectura CONFIRMADA por el servidor de parkingContacts en esta sesión (null = todavía ninguna). Solo con ella un valor vacío puede borrar un contacto.
  let contactsMode = 'desconocido';
  let contactsLoaded = null;
  // Notas privadas: con las reglas del diseño de equipos viven en parkingNotes (solo administración; así parkingContacts puede compartirse con compañeros sin exponer notas).
  // notesMode: 'desconocido' → 'privado' si parkingNotes respondió · 'anterior' si no existe o se denegó (las notas siguen en parkingContacts, como hasta ahora). notesLoaded: última lectura CONFIRMADA.
  let notesMode = 'desconocido';
  let notesLoaded = null;
  async function readParkingContacts() {
    if (!firebaseState.db || !firebaseState.auth) return null;
    try {
      if (firebaseState.auth.authStateReady) await firebaseState.auth.authStateReady();
      if (!firebaseState.auth.currentUser) return null; // sin sesión no se pide nada
      const snapshot = await firebaseState.db.collection('parkingContacts').get();
      contactsMode = 'privado';
      const contacts = new Map(snapshot.docs.map((doc) => [doc.id, doc.data()]));
      if (!(snapshot.metadata && snapshot.metadata.fromCache)) contactsLoaded = contacts;
      return contacts;
    } catch (error) {
      if (error && error.code === 'permission-denied') contactsMode = 'anterior';
      return null; // sin permiso o sin la colección protegida: se conserva lo que traiga parkingServers
    }
  }

  async function readParkingNotes() {
    if (!firebaseState.db || !firebaseState.auth) return null;
    try {
      if (firebaseState.auth.authStateReady) await firebaseState.auth.authStateReady();
      if (!firebaseState.auth.currentUser) return null;
      const snapshot = await firebaseState.db.collection('parkingNotes').get();
      notesMode = 'privado';
      const notes = new Map(snapshot.docs.map((doc) => [doc.id, doc.data()]));
      if (!(snapshot.metadata && snapshot.metadata.fromCache)) notesLoaded = notes;
      return notes;
    } catch (error) {
      if (error && error.code === 'permission-denied') notesMode = 'anterior'; // un error de red NO cambia el modo
      return null;
    }
  }

  async function getParkingServers() {
    const localServers = JSON.parse(localStorage.getItem(parkingServersStorageKey) || 'null') || [];

    if (!firebaseState.isConfigured || !firebaseState.db) {
      return localServers;
    }

    try {
      const snapshot = await firebaseState.db.collection('parkingServers').get();
      const remoteServers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      localStorage.setItem(parkingServersStorageKey, JSON.stringify(remoteServers)); // la copia del navegador no lleva los contactos privados
      const contacts = await readParkingContacts();
      if (!contacts) return remoteServers;
      // Modo privado: el contacto manda; lo que aún quedara en parkingServers solo sirve mientras no exista el contacto (migración a medias).
      const notas = await readParkingNotes();
      return remoteServers.map((s) => (contacts.has(s.id) ? { ...s, phone: contacts.get(s.id).phone || '', notes: (notas && notas.has(s.id) ? notas.get(s.id).notes : contacts.get(s.id).notes) || '' } : s));
    } catch (error) {
      console.warn('No se pudieron leer los servidores de estacionamiento:', error);
      return localServers;
    }
  }

  async function saveParkingServer(server) {
    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return false;
    }

    try {
      const { id, phone, notes, ...rest } = server;
      let data = { ...rest, ...(phone !== undefined ? { phone } : {}), ...(notes !== undefined ? { notes } : {}) }; // modo anterior
      if (phone !== undefined || notes !== undefined) {
        // Un valor vacío solo se guarda como «borrar» si esta sesión leyó ese contacto (o esa nota) del servidor; si no, podría ser un formulario abierto sin los contactos.
        const fields = {}; let notaPrivada;
        for (const [key, value] of [['phone', phone], ['notes', notes]]) {
          if (value === undefined) continue;
          const aparte = key === 'notes' && notesMode === 'privado', cargado = aparte ? (notesLoaded && notesLoaded.has(id)) : (contactsLoaded && contactsLoaded.has(id));
          if (value !== '' || cargado) { if (aparte) notaPrivada = value; else fields[key] = value; }
        }
        if (notaPrivada !== undefined) {
          // La nota va a parkingNotes ANTES de tocar el contacto (si falla, no se pierde nada) y el contacto no conserva notas (así su teléfono se puede compartir con compañeros).
          const refNota = firebaseState.db.collection('parkingNotes').doc(id);
          if (notaPrivada === '') await refNota.delete(); else await refNota.set({ notes: notaPrivada }, { merge: true });
          if (notesLoaded) { if (notaPrivada === '') notesLoaded.delete(id); else notesLoaded.set(id, { notes: notaPrivada }); }
          if (contactsLoaded && contactsLoaded.get(id) && contactsLoaded.get(id).notes) fields.notes = firebase.firestore.FieldValue.delete();
          delete data.notes; // nunca viaja una nota al directorio público, aunque no haya que tocar el contacto
        }
        if (Object.keys(fields).length) {
          try {
            await firebaseState.db.collection('parkingContacts').doc(id).set(fields, { merge: true });
            contactsMode = 'privado';
            if (contactsLoaded) { const previo = { ...(contactsLoaded.get(id) || {}) }; for (const [k, v] of Object.entries(fields)) { if (k === 'notes' && v && typeof v === 'object') delete previo.notes; else previo[k] = v; } contactsLoaded.set(id, previo); }
            // El contacto quedó en la colección privada: el servidor público conserva solo lo público y se retiran restos antiguos.
            data = { ...rest, phone: firebase.firestore.FieldValue.delete(), notes: firebase.firestore.FieldValue.delete() };
          } catch (error) {
            // Solo si la colección protegida AÚN no existe (permiso denegado y nunca visto en modo privado) se guarda como antes.
            // Con cualquier otro error, o en modo privado, no se escribe el teléfono en el servidor público: se informa del fallo.
            if (!(error && error.code === 'permission-denied' && contactsMode !== 'privado')) throw error;
            contactsMode = 'anterior';
          }
        }
      }
      await firebaseState.db.collection('parkingServers').doc(id).set(data, { merge: true });
      return true;
    } catch (error) {
      console.warn('No se pudo guardar el servidor de estacionamiento:', error);
      return false;
    }
  }

  async function deleteParkingServer(id) {
    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return false;
    }

    try {
      await firebaseState.db.collection('parkingServers').doc(id).delete();
      try { await firebaseState.db.collection('parkingContacts').doc(id).delete(); } catch (error) { /* sin colección protegida o sin contacto */ }
      if (notesMode === 'privado') { try { await firebaseState.db.collection('parkingNotes').doc(id).delete(); } catch (error) { /* sin nota */ } if (notesLoaded) notesLoaded.delete(id); }
      if (contactsLoaded) contactsLoaded.delete(id);
      return true;
    } catch (error) {
      console.warn('No se pudo borrar el servidor de estacionamiento:', error);
      return false;
    }
  }

  async function getParkingAssignments() {
    const localAssignments = JSON.parse(localStorage.getItem(parkingAssignmentsStorageKey) || 'null') || [];

    if (!firebaseState.isConfigured || !firebaseState.db) {
      return localAssignments;
    }

    try {
      const snapshot = await firebaseState.db.collection('parkingAssignments').get();
      const remoteAssignments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      localStorage.setItem(parkingAssignmentsStorageKey, JSON.stringify(remoteAssignments));
      return remoteAssignments;
    } catch (error) {
      console.warn('No se pudieron leer las asignaciones de estacionamiento:', error);
      return localAssignments;
    }
  }

  async function saveParkingAssignment(assignment) {
    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return false;
    }

    try {
      const { id, ...data } = assignment;
      await firebaseState.db.collection('parkingAssignments').doc(id).set(data, { merge: true });
      return true;
    } catch (error) {
      console.warn('No se pudo guardar la asignación de estacionamiento:', error);
      return false;
    }
  }

  async function deleteParkingAssignment(id) {
    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return false;
    }

    try {
      await firebaseState.db.collection('parkingAssignments').doc(id).delete();
      return true;
    } catch (error) {
      console.warn('No se pudo borrar la asignación de estacionamiento:', error);
      return false;
    }
  }

  async function getCalendarEvents() {
    const localEvents = JSON.parse(localStorage.getItem(calendarEventsStorageKey) || 'null') || [];

    if (!firebaseState.isConfigured || !firebaseState.db) {
      return localEvents;
    }

    try {
      const snapshot = await firebaseState.db.collection('calendarEvents').get();
      const remoteEvents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      localStorage.setItem(calendarEventsStorageKey, JSON.stringify(remoteEvents));
      return remoteEvents;
    } catch (error) {
      console.warn('No se pudieron leer los eventos del calendario:', error);
      return localEvents;
    }
  }

  async function createCalendarEvent(payload) {
    const event = {
      title: payload.title || '',
      date: payload.date || '',
      start: payload.start || '',
      end: payload.end || '',
      location: payload.location || '',
      description: payload.description || '',
      category: payload.category || 'General',
      color: payload.color || '#078ca3',
      link: payload.link || '',
      isRecurring: Boolean(payload.isRecurring)
    };

    if (!event.title || !event.date) {
      return false;
    }

    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return false;
    }

    try {
      const docRef = await firebaseState.db.collection('calendarEvents').add(event);
      return docRef.id;
    } catch (error) {
      console.warn('No se pudo crear el evento del calendario:', error);
      return false;
    }
  }

  async function saveCalendarEvent(event) {
    if (!event.id || !event.title || !event.date) {
      return false;
    }

    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return false;
    }

    try {
      const { id, ...data } = event;
      await firebaseState.db.collection('calendarEvents').doc(id).set({
        title: data.title || '',
        date: data.date || '',
        start: data.start || '',
        end: data.end || '',
        location: data.location || '',
        description: data.description || '',
        category: data.category || 'General',
        color: data.color || '#078ca3',
        link: data.link || '',
        isRecurring: Boolean(data.isRecurring)
      }, { merge: true });
      return true;
    } catch (error) {
      console.warn('No se pudo guardar el evento del calendario:', error);
      return false;
    }
  }

  async function updateCalendarEvent(id, patch) {
    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return false;
    }

    try {
      await firebaseState.db.collection('calendarEvents').doc(id).update(patch);
      return true;
    } catch (error) {
      console.warn('No se pudo actualizar el evento del calendario:', error);
      return false;
    }
  }

  async function deleteCalendarEvent(id) {
    if (!firebaseState.isConfigured || !firebaseState.db || !firebaseState.auth?.currentUser) {
      return false;
    }

    try {
      await firebaseState.db.collection('calendarEvents').doc(id).delete();
      return true;
    } catch (error) {
      console.warn('No se pudo borrar el evento del calendario:', error);
      return false;
    }
  }

  window.discipladoFirebase = {
    ...firebaseState,
    init: initFirebase,
    getResources,
    saveResources,
    getPrayerRequests,
    createPrayerRequest,
    markPraying,
    updatePrayerRequest,
    createEventRegistration,
    getEventRegistrations,
    getForumPosts,
    createForumPost,
    updateForumPost,
    createSubscriber,
    getSubscribers,
    logResourceDownload,
    getResourceDownloads,
    getParkingServers,
    saveParkingServer,
    deleteParkingServer,
    getParkingAssignments,
    saveParkingAssignment,
    deleteParkingAssignment,
    getCalendarEvents,
    createCalendarEvent,
    saveCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    signIn,
    signOut
  };

  initFirebase();
})();
