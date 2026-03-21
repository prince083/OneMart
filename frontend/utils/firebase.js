
import { getAuth, GoogleAuthProvider, browserPopupRedirectResolver } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "onemart-ecom.onrender.com",  // Use actual domain for reliable redirects
  projectId: "onemart-e2876",
  storageBucket: "onemart-e2876.appspot.com",
  messagingSenderId: "1043438926556",
  appId: "1:1043438926556:web:1f77d4fccdcc3d221fd219"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export { auth, provider, browserPopupRedirectResolver };