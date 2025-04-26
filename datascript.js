import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadVisitors() {
    const visitorTable = document.getElementById('visitorTableBody');
    visitorTable.innerHTML = ''; // Clear existing

    const querySnapshot = await getDocs(collection(db, "visitors"));
    querySnapshot.forEach((docData) => {
        const visitor = docData.data();
        const row = `<tr>
            <td>${visitor.visitorName}</td>
            <td>${visitor.visitorAddress}</td>
            <td>${visitor.visitorContact}</td>
            <td>${visitor.residentName}</td>
            <td>${visitor.visitTime}</td>
            <td>${visitor.visitDate}</td>
            <td>${visitor.purpose}</td>
        </tr>`;
        visitorTable.innerHTML += row;
    });
}

document.getElementById('clearEntriesBtn').addEventListener('click', async () => {
    if (confirm("Are you sure you want to clear all entries?")) {
        const querySnapshot = await getDocs(collection(db, "visitors"));
        querySnapshot.forEach(async (docItem) => {
            await deleteDoc(doc(db, "visitors", docItem.id));
        });
        alert("All entries cleared!");
        loadVisitors(); // reload table
    }
});

loadVisitors();
