// index.js

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDGjiZK62p7bc90WaoBmCQJ2hf-AlX0Tlc",
    authDomain: "th-idp-1c650.firebaseapp.com",
    projectId: "th-idp-1c650",
    storageBucket: "th-idp-1c650.appspot.com",
    messagingSenderId: "251274346701",
    appId: "1:251274346701:web:bdaf809374ae52fbc5e984"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleSignInBtn = document.getElementById('googleSignInBtn');

googleSignInBtn.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info
            const user = result.user;
            console.log("User signed in: ", user);

            // Redirect to dashboard or handle user data
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error("Error during sign-in: ", error);
        });
});
