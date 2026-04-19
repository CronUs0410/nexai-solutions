import * as admin from 'firebase-admin';

function initFirebase() {
  if (!admin.apps.length) {
    try {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
      if (privateKey && !privateKey.includes('your_actual_private_key_here') && privateKey !== '"your_new_private_key"') {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey.replace(/\\n/g, '\n'),
          }),
        });
      } else {
        // Dummy credentials for build phase
        admin.initializeApp({
            projectId: "nexai-solutions10",
        });
      }
    } catch (error) {
      console.log('Firebase init error (ignored during build):', error);
    }
  }
}

initFirebase();

export const adminAuth = admin.apps.length > 0 ? admin.auth() : null;
export const adminDb = admin.apps.length > 0 ? admin.firestore() : null;
