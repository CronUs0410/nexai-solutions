# NexAI Solutions

A complete, production-ready website for NexAI Solutions — an AI services company based in Mundra, Gujarat, India. Built with Next.js 14, Tailwind CSS, and Firebase.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables (.env.local)
Create a `.env.local` file at the root of the project.

Client-side config (Replace with your exact config provided during setup, these values are safe to be public):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=nexai-solutions10.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=nexai-solutions10
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=nexai-solutions10.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1082958931537
NEXT_PUBLIC_FIREBASE_APP_ID=1:...
```

Admin-side config (NEVER EXPOSE THESE publicly):
To get these, go to Firebase Console → Project Settings → Service Accounts → Generate New Private Key.
```env
FIREBASE_PROJECT_ID=nexai-solutions10
FIREBASE_CLIENT_EMAIL=your_new_client_email
FIREBASE_PRIVATE_KEY="your_new_private_key"
```

### 3. Firebase Console Setup
- Enable **Authentication** (Email/Password + Google).
- Enable **Firestore Database**.
- Update **Firestore Rules**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /services/{doc} {
      allow read: if true;
      allow write: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin','superadmin'];
    }
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'superadmin';
    }
  }
}
```

### 4. Running the Dev Server
```bash
npm run dev
```

### 5. First Time Admin Setup
1. Go to `http://localhost:3000/signup`
2. Create an account with your email.
3. Go to Firebase Console → Firestore Database.
4. Locate your newly created user document inside the `users` collection.
5. Change the `role` field value from `"user"` to `"superadmin"`.
6. Logout and Login again on your running application.
7. You now have access to the `/admin` dashboard.
8. (Optional) Make a GET request to `http://localhost:3000/api/seed` in your browser to pre-populate the 7 default placeholder services.
