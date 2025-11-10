
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "onemart-e2876.firebaseapp.com",
  projectId: "onemart-e2876",
  storageBucket: "onemart-e2876.firebasestorage.app",
  messagingSenderId: "1043438926556",
  appId: "1:1043438926556:web:1f77d4fccdcc3d221fd219"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider =  new GoogleAuthProvider();

export { auth, provider };