(function () {
  const resourcesStorageKey = 'discipulado-resources-v1';
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

  window.discipladoFirebase = {
    ...firebaseState,
    init: initFirebase,
    getResources,
    saveResources,
    signIn,
    signOut
  };

  initFirebase();
})();
