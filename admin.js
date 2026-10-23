// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz_RU2rTvyr_fe3DmfwBUpVj2zxoyx7a4",
  authDomain: "aastu-exampeppers.firebaseapp.com",
  projectId: "aastu-exampeppers",
  storageBucket: "aastu-exampeppers.firebasestorage.app",
  messagingSenderId: "1062402927230",
  appId: "1:1062402927230:web:9c1a539b5b4e3e3b3922f3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Set your private admin password here!
const MASTER_ADMIN_PASS = "sagni2026"; 
let currentPin = "";

function loginAdmin() {
  const pass = document.getElementById("adminPass").value;
  if (pass === MASTER_ADMIN_PASS) {
    document.getElementById("loginCard").classList.add("hidden");
    document.getElementById("dashCard").classList.remove("hidden");
    loadPinsHistory();
  } else {
    alert("Incorrect admin password!");
  }
}

async function generatePin() {
  // Generate a random 6-digit PIN
  currentPin = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Save to Firebase access_pins collection via API call
    await db.collection("access_pins").add({
      pin: currentPin,
      used: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById("pinResult").innerText = currentPin;
    document.getElementById("pinBox").classList.remove("hidden");
    loadPinsHistory();
  } catch (error) {
    alert("Error creating PIN: " + error.message);
  }
}

function copyPin() {
  const message = `Hello! Here is your 1-time Access PIN for AASTU EXAM PAPERS: ${currentPin}\n\nEnter this PIN on https://sagni-miressa.github.io/AASTU-exampeppers/ to unlock full access.`;
  navigator.clipboard.writeText(message);
  alert("Message copied to clipboard! Paste it directly into Telegram.");
}

async function loadPinsHistory() {
  const listDiv = document.getElementById("pinsList");
  listDiv.innerHTML = "Loading PINs...";

  try {
    const snapshot = await db.collection("access_pins")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();

    if (snapshot.empty) {
      listDiv.innerHTML = "<p>No PINs generated yet.</p>";
      return;
    }

    let html = "<ul style='list-style: none; padding: 0;'>";
    snapshot.forEach(doc => {
      const data = doc.data();
      const statusBadge = data.used 
        ? "<span style='color: red; font-weight: bold;'>[USED / EXPIRED]</span>" 
        : "<span style='color: green; font-weight: bold;'>[ACTIVE / UNUSED]</span>";
      
      html += `<li style='padding: 6px 0; border-bottom: 1px solid #eee;'>
        <strong>${data.pin}</strong> - ${statusBadge}
      </li>`;
    });
    html += "</ul>";
    listDiv.innerHTML = html;
  } catch (err) {
    listDiv.innerHTML = "Error loading history: " + err.message;
  }
}