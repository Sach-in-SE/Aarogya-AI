export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'your_api_key_here',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'your_project_id.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'your_project_id_here',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'your_project_id.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'your_messaging_sender_id_here',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'your_app_id_here',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined
};


