// admin-questions.js

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

const subject = document.body.getAttribute('data-subject'); // e.g., 'maths', 'science'
const addQuestionForm = document.getElementById('addQuestionForm');
const questionText = document.getElementById('questionText');
const questionsList = document.getElementById('questionsList');
const backBtn = document.getElementById('backBtn');

// Add a new question
addQuestionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = questionText.value.trim();
    if (question) {
        await addDoc(collection(db, `questions-${subject}`), { text: question });
        questionText.value = '';
        loadQuestions();
    }
});

// Load existing questions
async function loadQuestions() {
    const questionsSnapshot = await getDocs(collection(db, `questions-${subject}`));
    const questions = questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    questionsList.innerHTML = '';
    questions.forEach(question => {
        const listItem = document.createElement('li');
        listItem.textContent = question.text;

        // Add a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', async () => {
            await deleteDoc(doc(db, `questions-${subject}`, question.id));
            loadQuestions();
        });

        listItem.appendChild(deleteBtn);
        questionsList.appendChild(listItem);
    });
}

backBtn.addEventListener('click', () => {
    window.location.href = 'dashboard.html'; // Redirect to the dashboard page
});

// Load questions on page load
loadQuestions();
