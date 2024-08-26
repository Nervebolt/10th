// admin-quotes.js

import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
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

const addQuoteForm = document.getElementById('addQuoteForm');
const quoteText = document.getElementById('quoteText');
const quotesList = document.getElementById('quotesList');
const backBtn = document.getElementById('backBtn');

// Add a new quote
addQuoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const quote = quoteText.value.trim();
    if (quote) {
        await addDoc(collection(db, "quotes"), { text: quote });
        quoteText.value = '';
        loadQuotes();
    }
});

// Load existing quotes
async function loadQuotes() {
    const quotesSnapshot = await getDocs(collection(db, "quotes"));
    const quotes = quotesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    quotesList.innerHTML = '';
    quotes.forEach(quote => {
        const listItem = document.createElement('li');
        listItem.textContent = quote.text;

        // Add a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', async () => {
            await deleteDoc(doc(db, "quotes", quote.id));
            loadQuotes();
        });

        listItem.appendChild(deleteBtn);
        quotesList.appendChild(listItem);
    });
}

backBtn.addEventListener('click', () => {
    window.location.href = 'dashboard.html'; // Redirect to the dashboard page
});

// Load quotes on page load
loadQuotes();
