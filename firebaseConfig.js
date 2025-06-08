// Import firebase where you need it, e.g., in App.jsx or your main entry file.
// import firebase from 'firebase/compat/app'; // For v8 compatibility
// import 'firebase/compat/auth'; // For v8 compatibility
// import 'firebase/compat/firestore'; // For v8 compatibility, if you use Firestore

// For Firebase v9 modular SDK (recommended)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore'; // if you use Firestore
// import { getStorage } from 'firebase/storage'; // if you use Storage

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional: for Google Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const firestore = getFirestore(app); // Uncomment if using Firestore
// const storage = getStorage(app); // Uncomment if using Storage

// Export the initialized Firebase services
export { app, auth /*, firestore, storage */ };

// It's also common to initialize Firebase directly in App.js or index.js
// if you don't want a separate config file.

/*
IMPORTANT:
1. Replace the placeholder values in `firebaseConfig` with your actual Firebase project settings.
   You can find these in your Firebase project console:
   Project settings > General > Your apps > SDK setup and configuration.
2. Ensure you have `google-services.json` (for Android) and `GoogleService-Info.plist` (for iOS)
   correctly placed in your project for native Firebase services to work.
   - `google-services.json` should be in `android/app/`.
   - `GoogleService-Info.plist` should be in `ios/SellProductForm/` (or your specific iOS app folder).
3. If using Firebase v8 (compat libraries), adjust imports accordingly:
   import firebase from 'firebase/compat/app';
   import 'firebase/compat/auth';
   // etc.
   if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
   }
   export default firebase; // Or export specific services
*/
