import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported as analyticsSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Optional analytics (browser only)
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  analyticsSupported().then((ok) => {
    if (ok) {
      analytics = getAnalytics(app);
    }
  });
}

export const firebaseApp = app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };


