// admin-lessons.js

import { db } from './firebaseConfig.js';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const lessonsContainer = document.getElementById('lessons-container');
const newLessonInput = document.getElementById('new-lesson');
const addLessonBtn = document.getElementById('add-lesson');

async function loadLessons() {
    const lessonsSnapshot = await getDocs(collection(db, "lessons"));
    const lessons = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    lessonsContainer.innerHTML = '';
    lessons.forEach(lesson => {
        const lessonElement = document.createElement('div');
        lessonElement.classList.add('lesson');
        lessonElement.innerHTML = `
            <span>${lesson.name}</span>
            <button class="delete-lesson" data-id="${lesson.id}">Delete</button>
        `;
        lessonsContainer.appendChild(lessonElement);
    });

    document.querySelectorAll('.delete-lesson').forEach(btn => {
        btn.addEventListener('click', async () => {
            const lessonId = btn.getAttribute('data-id');
            await deleteDoc(doc(db, "lessons", lessonId));
            loadLessons();
        });
    });
}

addLessonBtn.addEventListener('click', async () => {
    const lessonName = newLessonInput.value.trim();
    if (lessonName) {
        await addDoc(collection(db, "lessons"), { name: lessonName });
        newLessonInput.value = '';
        loadLessons();
    }
});

loadLessons();
