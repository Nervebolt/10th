// quotes.js

import { getFirestore, collection, getDocs } from "firebase/firestore";
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
const db = getFirestore(app);

const quotesList = document.getElementById('quotes-list');
const backBtn = document.getElementById('backBtn');

async function loadQuotes() {
    const quotesSnapshot = await getDocs(collection(db, "quotes"));
    const quotes = quotesSnapshot.docs.map(doc => doc.data().text);

    quotesList.innerHTML = '';
    quotes.forEach(quote => {
        const listItem = document.createElement('li');
        listItem.textContent = quote;
        quotesList.appendChild(listItem);
    });
}

backBtn.addEventListener('click', () => {
    window.location.href = 'dashboard.html'; // Redirect to the dashboard page
});

// Load quotes on page load
loadQuotes();
