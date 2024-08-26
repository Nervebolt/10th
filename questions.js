// questions.js

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

const subject = document.body.getAttribute('data-subject'); // e.g., 'maths', 'science'
const questionsList = document.getElementById('questions-list');
const backBtn = document.getElementById('backBtn');

async function loadQuestions() {
    const questionsSnapshot = await getDocs(collection(db, `questions-${subject}`));
    const questions = questionsSnapshot.docs.map(doc => doc.data());

    questionsList.innerHTML = '';
    questions.forEach(question => {
        const listItem = document.createElement('li');
        listItem.textContent = question.text;
        questionsList.appendChild(listItem);
    });
}

backBtn.addEventListener('click', () => {
    window.location.href = 'dashboard.html'; // Redirect to the dashboard page
});

// Load questions on page load
loadQuestions();
