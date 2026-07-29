(function () {
  const resourcesStorageKey = 'discipulado-resources-v1';
  const prayerStorageKey = 'discipulado-prayer-requests-v1';
  const eventRegistrationsStorageKey = 'discipulado-event-registrations-v1';
  const authStorageKey = 'discipulado-admin-session-v1';
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
    signIn,
    signOut
  };

  initFirebase();
})();
