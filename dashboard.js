import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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

const signOutBtn = document.getElementById('signOutBtn');
const checklistBtn = document.getElementById('checklistBtn');
const importantBtn = document.getElementById('importantBtn');
const motivationBtn = document.getElementById('motivationBtn');

async function loadUserData() {
    const user = auth.currentUser;
    if (user) {
        // Optional: Load user-specific data if needed
        console.log("User is signed in: ", user);
    } else {
        window.location.href = 'index.html'; // Redirect to home if not signed in
    }
}

signOutBtn.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            window.location.href = 'index.html'; // Redirect to home page on sign-out
        })
        .catch((error) => {
            console.error("Sign out error: ", error);
        });
});

checklistBtn.addEventListener('click', () => {
    window.location.href = 'checklist.html'; // Redirect to checklist page
});

importantBtn.addEventListener('click', () => {
    window.location.href = 'important-questions.html'; // Redirect to important questions questions page
});

motivationBtn.addEventListener('click', () => {
    window.location.href = 'motivation.html'; // Redirect to Motivation page
});

// Load user data on page load
loadUserData();
