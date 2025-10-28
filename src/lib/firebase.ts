// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase, connectDatabaseEmulator, Database, enableLogging } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";

// Enable logging in development
if (process.env.NODE_ENV === 'development') {
  enableLogging(true);
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2SR3tQai6S-3D9f2uZWbk4j89Cf201kc",
  authDomain: "aura-6b04d.firebaseapp.com",
  databaseURL: "https://aura-6b04d-default-rtdb.firebaseio.com",
  projectId: "aura-6b04d",
  storageBucket: "aura-6b04d.firebasestorage.app",
  messagingSenderId: "271012255355",
  appId: "1:271012255355:web:8b0fb72293c25efe2a34de",
  measurementId: "G-K8EJ2L039X"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Realtime Database and get a reference to the service
let database: Database;
try {
  database = getDatabase(app);
  
  // Connect to emulator if in development
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_FIREBASE_DATABASE_EMULATOR_HOST) {
    const host = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_EMULATOR_HOST || 'localhost';
    const port = parseInt(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_EMULATOR_PORT || '9000');
    connectDatabaseEmulator(database, host, port);
    console.log('Connected to Firebase Realtime Database emulator');
  }
} catch (error) {
  console.error('Error initializing Firebase Database:', error);
  // Create a mock database for development
  database = {
    app: app,
    type: 'database',
    _delegate: {},
    _instances: {},
    useEmulator: () => {},
    goOffline: () => {},
    goOnline: () => {},
    ref: () => ({
      database: null,
      key: null,
      parent: null,
      root: null,
      path: '',
      child: () => null,
      onDisconnect: () => ({
        cancel: () => Promise.resolve(),
        remove: () => Promise.resolve(),
        set: () => Promise.resolve(),
        setWithPriority: () => Promise.resolve(),
        update: () => Promise.resolve()
      }),
      push: () => ({
        key: 'mock-key',
        set: () => Promise.resolve(),
        update: () => Promise.resolve(),
        remove: () => Promise.resolve(),
        onDisconnect: () => ({
          cancel: () => Promise.resolve(),
          remove: () => Promise.resolve(),
          set: () => Promise.resolve(),
          setWithPriority: () => Promise.resolve(),
          update: () => Promise.resolve()
        })
      }),
      set: () => Promise.resolve(),
      update: () => Promise.resolve(),
      remove: () => Promise.resolve(),
      transaction: () => Promise.resolve({ committed: true, snapshot: null }),
      setWithPriority: () => Promise.resolve(),
      orderByChild: () => null,
      orderByKey: () => null,
      orderByPriority: () => null,
      orderByValue: () => null,
      startAt: () => null,
      startAfter: () => null,
      endAt: () => null,
      endBefore: () => null,
      equalTo: () => null,
      limitToFirst: () => null,
      limitToLast: () => null,
      on: () => () => {},
      off: () => {},
      once: () => Promise.resolve({ exists: () => false, val: () => null, key: null }),
      get: () => Promise.resolve({ exists: () => false, val: () => null, key: null })
    })
  } as unknown as Database;
}

// Initialize Analytics only on client-side
let analytics: any;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(err => {
    console.warn('Analytics not supported:', err);
  });
}

export { app, database, analytics };