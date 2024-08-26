// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGjiZK62p7bc90WaoBmCQJ2hf-AlX0Tlc",
  authDomain: "th-idp-1c650.firebaseapp.com",
  projectId: "th-idp-1c650",
  storageBucket: "th-idp-1c650.appspot.com",
  messagingSenderId: "251274346701",
  appId: "1:251274346701:web:bdaf809374ae52fbc5e984",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
