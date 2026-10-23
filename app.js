// Firebase Project Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz_RU2rTvyr_fe3DmfwBUpVj2zxoyx7a4",
  authDomain: "aastu-exampeppers.firebaseapp.com",
  projectId: "aastu-exampeppers",
  storageBucket: "aastu-exampeppers.firebasestorage.app",
  messagingSenderId: "1062402927230",
  appId: "1:1062402927230:web:9c1a539b5b4e3e3b3922f3"
};

// Initialize Firebase App & Database
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let isUnlocked = localStorage.getItem("aastu_access_unlocked") === "true";
let currentSemester = 1;
let searchQuery = "";

// Course Data with file paths mapped to your exams/ folder
const courses = {
  1: [
    {
      name: "Communicative English Language Skills I", code: "ENG101",
      years: {
        "2016": [
          { title: "2016 Midterm (PDF)", file: "./exams/eng101-2016-mid.pdf" },
          { title: "2016 Final (PDF)", file: "./exams/eng101-2016-final.pdf" }
        ],
        "2017": [
          { title: "2017 Midterm (PDF)", file: "./exams/eng101-2017-mid.pdf" },
          { title: "2017 Final (PDF)", file: "./exams/eng101-2017-final.pdf" }
        ],
        "2018": [
          { title: "2018 Midterm (PDF)", file: "./exams/eng101-2018-mid.pdf" },
          { title: "2018 Final (PDF)", file: "./exams/eng101-2018-final.pdf" }
        ]
      }
    },
    {
      name: "General Psychology", code: "PSY101",
      years: {
        "2016": [
          { title: "2016 Midterm (PDF)", file: "./exams/psy101-2016-mid.pdf" },
          { title: "2016 Final (PDF)", file: "./exams/psy101-2016-final.pdf" }
        ],
        "2017": [
          { title: "2017 Midterm (PDF)", file: "./exams/psy101-2017-mid.pdf" },
          { title: "2017 Final (PDF)", file: "./exams/psy101-2017-final.pdf" }
        ],
        "2018": [
          { title: "2018 Midterm (PDF)", file: "./exams/psy101-2018-mid.pdf" },
          { title: "2018 Final (PDF)", file: "./exams/psy101-2018-final.pdf" }
        ]
      }
    },
    {
      name: "Applied Mathematics I", code: "MATH101",
      years: {
        "2016": [
          { title: "2016 Midterm (PDF)", file: "./exams/math101-2016-mid.pdf" },
          { title: "2016 Final (PDF)", file: "./exams/math101-2016-final.pdf" }
        ],
        "2017": [
          { title: "2017 Midterm (PDF)", file: "./exams/math101-2017-mid.pdf" },
          { title: "2017 Final (PDF)", file: "./exams/math101-2017-final.pdf" }
        ],
        "2018": [
          { title: "2018 Midterm (PDF)", file: "./exams/math101-2018-mid.pdf" },
          { title: "2018 Final (PDF)", file: "./exams/math101-2018-final.pdf" }
        ]
      }
    },
    {
      name: "Logic & Critical Thinking", code: "LOG101",
      years: {
        "2016": [
          { title: "2016 Midterm (PDF)", file: "./exams/log101-2016-mid.pdf" },
          { title: "2016 Final (PDF)", file: "./exams/log101-2016-final.pdf" }
        ],
        "2017": [
          { title: "2017 Midterm (PDF)", file: "./exams/log101-2017-mid.pdf" },
          { title: "2017 Final (PDF)", file: "./exams/log101-2017-final.pdf" }
        ],
        "2018": [
          { title: "2018 Midterm (PDF)", file: "./exams/log101-2018-mid.pdf" },
          { title: "2018 Final (PDF)", file: "./exams/log101-2018-final.pdf" }
        ]
      }
    },
    {
      name: "General Mathematics", code: "MATH100",
      years: {
        "2016": [
          { title: "2016 Midterm (PDF)", file: "./exams/math100-2016-mid.pdf" },
          { title: "2016 Final (PDF)", file: "./exams/math100-2016-final.pdf" }
        ],
        "2017": [
          { title: "2017 Midterm (PDF)", file: "./exams/math100-2017-mid.pdf" },
          { title: "2017 Final (PDF)", file: "./exams/math100-2017-final.pdf" }
        ],
        "2018": [
          { title: "2018 Midterm (PDF)", file: "./exams/math100-2018-mid.pdf" },
          { title: "2018 Final (PDF)", file: "./exams/math100-2018-final.pdf" }
        ]
      }
    }
  ],
  2: [
    {
      name: "Communicative English Language Skills II", code: "ENG102",
      years: {
        "2016": [
          { title: "2016 Midterm (PDF)", file: "./exams/eng102-2016-mid.pdf" },
          { title: "2016 Final (PDF)", file: "./exams/eng102-2016-final.pdf" }
        ],
        "2017": [
          { title: "2017 Midterm (PDF)", file: "./exams/eng102-2017-mid.pdf" },
          { title: "2017 Final (PDF)", file: "./exams/eng102-2017-final.pdf" }
        ],
        "2018": [
          { title: "2018 Midterm (PDF)", file: "./exams/eng102-2018-mid.pdf" },
          { title: "2018 Final (PDF)", file: "./exams/eng102-2018-final.pdf" }
        ]
      }
    },
    {
      name: "Entrepreneurship", code: "ENT102",
      years: {
        "2016": [
          { title: "2016 Midterm (PDF)", file: "./exams/ent102-2016-mid.pdf" },
          { title: "2016 Final (PDF)", file: "./exams/ent102-2016-final.pdf" }
        ],
        "2017": [
          { title: "2017 Midterm (PDF)", file: "./exams/ent102-2017-mid.pdf" },
          { title: "2017 Final (PDF)", file: "./exams/ent102-2017-final.pdf" }
        ],
        "2018": [
          { title: "2018 Midterm (PDF)", file: "./exams/ent102-2018-mid.pdf" },
          { title: "2018 Final (PDF)", file: "./exams/ent102-2018-final.pdf" }
        ]
      }
    },
    {
      name: "Social Anthropology", code: "ANT102",
      years: {
        "2016": [
          { title: "2016 Midterm (PDF)", file: "./exams/ant102-2016-mid.pdf" },
          { title: "2016 Final (PDF)", file: "./exams/ant102-2016-final.pdf" }
        ],
        "2017": [
          { title: "2017 Midterm (PDF)", file: "./exams/ant102-2017-mid.pdf" },
          { title: "2017 Final (PDF)", file: "./exams/ant102-2017-final.pdf" }
        ],
        "2018": [
          { title: "2018 Midterm (PDF)", file: "./exams/ant102-2018-mid.pdf" },
          { title: "2018 Final (PDF)", file: "./exams/ant102-2018-final.pdf" }
        ]
      }
    },
    {
      name: "Emerging Technologies", code: "EMTG102",
      years: {
        "2016": [
          { title: "2016 Midterm (PDF)", file: "./exams/emtg102-2016-mid.pdf" },
          { title: "2016 Final (PDF)", file: "./exams/emtg102-2016-final.pdf" }
        ],
        "2017": [
          { title: "2017 Midterm (PDF)", file: "./exams/emtg102-2017-mid.pdf" },
          { title: "2017 Final (PDF)", file: "./exams/emtg102-2017-final.pdf" }
        ],
        "2018": [
          { title: "2018 Midterm (PDF)", file: "./exams/emtg102-2018-mid.pdf" },
          { title: "2018 Final (PDF)", file: "./exams/emtg102-2018-final.pdf" }
        ]
      }
    },
    {
      name: "Health & Physical Education", code: "HPE102",
      years: {
        "2016": [
          { title: "2016 Final (PDF)", file: "./exams/hpe102-2016-final.pdf" }
        ],
        "2017": [
          { title: "2017 Final (PDF)", file: "./exams/hpe102-2017-final.pdf" }
        ],
        "2018": [
          { title: "2018 Final (PDF)", file: "./exams/hpe102-2018-final.pdf" }
        ]
      }
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  if (isUnlocked) {
    applyUnlockedUI();
  }

  renderCourses();

  document.getElementById("unlockBtn").addEventListener("click", () => {
    document.getElementById("paymentModal").classList.remove("hidden");
  });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderCourses();
  });
});

function applyUnlockedUI() {
  const badge = document.getElementById("accessBadge");
  if (badge) {
    badge.className = "status-badge unlocked";
    badge.innerText = "✅ UNLOCKED";
  }
  const unlockBtn = document.getElementById("unlockBtn");
  if (unlockBtn) {
    unlockBtn.style.display = "none";
  }
}

function showPage(pageName, event) {
  document.querySelectorAll(".page-section").forEach(sec => sec.classList.add("hidden"));
  document.querySelectorAll(".nav-bubble").forEach(btn => btn.classList.remove("active"));

  if (pageName === 'home') {
    document.getElementById("homePage").classList.remove("hidden");
  } else if (pageName === 'about') {
    document.getElementById("aboutPage").classList.remove("hidden");
  } else if (pageName === 'contact') {
    document.getElementById("contactPage").classList.remove("hidden");
  }

  if (event && event.target) {
    event.target.classList.add("active");
  }
}

function switchSemester(sem) {
  currentSemester = sem;
  document.getElementById("sem1Btn").classList.toggle("active", sem === 1);
  document.getElementById("sem2Btn").classList.toggle("active", sem === 2);
  renderCourses();
}

function renderCourses() {
  const grid = document.getElementById("courseGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = courses[currentSemester].filter(c => 
    c.name.toLowerCase().includes(searchQuery) || c.code.toLowerCase().includes(searchQuery)
  );

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No courses found matching "${searchQuery}".</p>`;
    return;
  }

  filtered.forEach((course, courseIdx) => {
    const card = document.createElement("div");
    card.className = "course-card";

    let yearsHTML = "";
    Object.keys(course.years).forEach(yr => {
      const papers = course.years[yr];
      const yearContainerId = `yr-${courseIdx}-${yr}`;

      let paperBtnsHTML = papers.map(p => `
        <button class="paper-btn" onclick="openPaper('${course.name}', '${p.title}', '${p.file}')">
          <span>📄 ${p.title}</span>
          <span>${isUnlocked ? '👀 View PDF' : '🔒 Locked'}</span>
        </button>
      `).join("");

      yearsHTML += `
        <div class="year-group">
          <div class="year-header" onclick="toggleYearGroup('${yearContainerId}')">
            <span>📅 ${yr} Academic Year</span>
            <span>▼</span>
          </div>
          <div id="${yearContainerId}" class="year-papers hidden">
            ${paperBtnsHTML}
          </div>
        </div>
      `;
    });

    card.innerHTML = `
      <h4>${course.name}</h4>
      <p style="color:#777; font-size:0.85rem; margin-bottom:8px;">Code: ${course.code}</p>
      ${yearsHTML}
    `;

    grid.appendChild(card);
  });
}

function toggleYearGroup(id) {
  document.getElementById(id).classList.toggle("hidden");
}

async function processPayment() {
  const enteredPin = document.getElementById("txnRef").value.trim();
  const submitBtn = document.getElementById("submitPayBtn");

  if (!enteredPin) {
    alert("Please enter the Access PIN provided by Sagni Miressa on Telegram.");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerText = "Verifying PIN...";

  try {
    const pinQuery = await db.collection("access_pins")
      .where("pin", "==", enteredPin)
      .get();

    if (pinQuery.empty) {
      alert("Invalid Access PIN! Please contact @samirgob on Telegram to receive your valid PIN.");
      submitBtn.disabled = false;
      submitBtn.innerText = "Verify PIN & Unlock";
      return;
    }

    const pinDoc = pinQuery.docs[0];
    const pinData = pinDoc.data();

    if (pinData.used === true) {
      alert("This Access PIN has already been used and is now expired!");
      submitBtn.disabled = false;
      submitBtn.innerText = "Verify PIN & Unlock";
      return;
    }

    await db.collection("access_pins").doc(pinDoc.id).update({
      used: true,
      usedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    isUnlocked = true;
    localStorage.setItem("aastu_access_unlocked", "true");
    applyUnlockedUI();

    closeModal("paymentModal");
    renderCourses();
    alert("Success! Your 1-time Access PIN has been verified. All freshman exam papers are unlocked.");

  } catch (error) {
    console.error("Verification Error:", error);
    alert("Error verifying PIN: " + error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "Verify PIN & Unlock";
  }
}

function openPaper(course, paperTitle, filePath) {
  if (!isUnlocked) {
    document.getElementById("paymentModal").classList.remove("hidden");
    return;
  }

  const modal = document.getElementById("viewerModal");
  document.getElementById("viewerTitle").innerText = `${course} - ${paperTitle}`;
  
  const body = document.getElementById("viewerBody");
  body.innerHTML = `<iframe src="${filePath}" width="100%" height="500px" style="border:none; border-radius:8px;"></iframe>`;

  modal.classList.remove("hidden");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

/* AI Assistant Logic */
function toggleAiChat() {
  document.getElementById("aiChatBox").classList.toggle("hidden");
}

function handleAiKeyPress(e) {
  if (e.key === "Enter") sendAiMessage();
}

function sendAiPrompt(promptText) {
  document.getElementById("aiInput").value = promptText;
  sendAiMessage();
}

function sendAiMessage() {
  const input = document.getElementById("aiInput");
  const text = input.value.trim();
  if (!text) return;

  appendAiMsg(text, "user");
  input.value = "";

  setTimeout(() => {
    let reply = "I am here to help you navigate the portal! Ask me about buying access, submitting payment PINs, or contacting Sagni Miressa.";
    const query = text.toLowerCase();

    if (query.includes("buy") || query.includes("payment") || query.includes("unlock")) {
      reply = "To buy access:\n1. Click 'Unlock (100 ETB)'.\n2. Transfer 100 ETB via CBE (1000654224657 - Sagni Miressa) or Telebirr (0944899465 - Abebe Jabessa).\n3. Send receipt screenshot to @samirgob on Telegram to get your 1-time Access PIN!";
    } else if (query.includes("owner") || query.includes("sagni") || query.includes("contact")) {
      reply = "The portal owner is Sagni Miressa. Contact via Telegram @samirgob or call 0944899465.";
    }

    appendAiMsg(reply, "bot");
  }, 400);
}

function appendAiMsg(text, sender) {
  const container = document.getElementById("aiMessages");
  if (!container) return;
  const msgDiv = document.createElement("div");
  msgDiv.className = `ai-msg ${sender}`;
  msgDiv.innerText = text;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}