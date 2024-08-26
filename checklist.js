// checklist.js

import { db } from './firebaseConfig.js';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const checklistContainer = document.getElementById('checklist-container');
const progressBar = document.getElementById('progress');

async function loadChecklist() {
    const lessonsSnapshot = await getDocs(collection(db, "lessons"));
    const lessons = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    checklistContainer.innerHTML = '';  // Clear the container before populating
    let completedCount = 0;

    lessons.forEach(lesson => {
        const lessonElement = document.createElement('div');
        lessonElement.classList.add('lesson');
        lessonElement.innerHTML = `
            <input type="checkbox" id="${lesson.id}" ${lesson.completed ? 'checked' : ''}>
            <label for="${lesson.id}">${lesson.name}</label>
        `;
        checklistContainer.appendChild(lessonElement);

        const checkbox = document.getElementById(lesson.id);
        checkbox.addEventListener('change', async () => {
            const docRef = doc(db, "lessons", lesson.id);
            await updateDoc(docRef, { completed: checkbox.checked });
            updateProgress();
        });

        if (lesson.completed) completedCount++;
    });

    updateProgress(completedCount, lessons.length);
}

function updateProgress(completedCount = 0, totalCount = 0) {
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}

loadChecklist();
