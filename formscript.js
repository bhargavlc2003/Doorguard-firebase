import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('checkInForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const visitorName = document.getElementById('visitorName').value;
    const visitorAddress = document.getElementById('visitorAddress').value;
    const visitorContact = document.getElementById('visitorContact').value;
    const residentName = document.getElementById('residentName').value;
    const visitTime = document.getElementById('visitTime').value;
    const visitDate = document.getElementById('visitDate').value;
    const purpose = document.getElementById('purpose').value;

    try {
        await addDoc(collection(db, "visitors"), {
            visitorName,
            visitorAddress,
            visitorContact,
            residentName,
            visitTime,
            visitDate,
            purpose
        });
        alert("Check-in successful!");
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to check-in. Please try again.");
    }
});
