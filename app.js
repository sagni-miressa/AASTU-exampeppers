let isUnlocked = false;
let currentSemester = 1;
let searchQuery = "";

const courses = {
  1: [
    {
      name: "Communicative English Language Skills I", code: "ENG101",
      years: {
        "2016": ["2016 Midterm (PDF)", "2016 Final (PDF)"],
        "2017": ["2017 Midterm (PDF)", "2017 Final (IMG)"],
        "2018": ["2018 Midterm (PDF)", "2018 Final (PDF)"]
      }
    },
    {
      name: "General Psychology", code: "PSY101",
      years: {
        "2016": ["2016 Midterm (PDF)", "2016 Final (PDF)"],
        "2017": ["2017 Midterm (PDF)", "2017 Final (PDF)"],
        "2018": ["2018 Midterm (PDF)", "2018 Final (PDF)"]
      }
    },
    {
      name: "Applied Mathematics I", code: "MATH101",
      years: {
        "2016": ["2016 Midterm (PDF)", "2016 Final (PDF)"],
        "2017": ["2017 Midterm (PDF)", "2017 Final (IMG)"],
        "2018": ["2018 Midterm (PDF)", "2018 Final (PDF)"]
      }
    },
    {
      name: "Logic & Critical Thinking", code: "LOG101",
      years: {
        "2016": ["2016 Midterm (PDF)", "2016 Final (PDF)"],
        "2017": ["2017 Midterm (PDF)", "2017 Final (PDF)"],
        "2018": ["2018 Midterm (PDF)", "2018 Final (PDF)"]
      }
    },
    {
      name: "General Mathematics", code: "MATH100",
      years: {
        "2016": ["2016 Midterm (PDF)", "2016 Final (PDF)"],
        "2017": ["2017 Midterm (PDF)", "2017 Final (PDF)"],
        "2018": ["2018 Midterm (PDF)", "2018 Final (PDF)"]
      }
    }
  ],
  2: [
    {
      name: "Communicative English Language Skills II", code: "ENG102",
      years: {
        "2016": ["2016 Midterm (PDF)", "2016 Final (PDF)"],
        "2017": ["2017 Midterm (PDF)", "2017 Final (PDF)"],
        "2018": ["2018 Midterm (PDF)", "2018 Final (PDF)"]
      }
    },
    {
      name: "Entrepreneurship", code: "ENT102",
      years: {
        "2016": ["2016 Midterm (PDF)", "2016 Final (PDF)"],
        "2017": ["2017 Midterm (PDF)", "2017 Final (PDF)"],
        "2018": ["2018 Midterm (PDF)", "2018 Final (PDF)"]
      }
    },
    {
      name: "Social Anthropology", code: "ANT102",
      years: {
        "2016": ["2016 Midterm (PDF)", "2016 Final (PDF)"],
        "2017": ["2017 Midterm (PDF)", "2017 Final (PDF)"],
        "2018": ["2018 Midterm (PDF)", "2018 Final (PDF)"]
      }
    },
    {
      name: "Emerging Technologies", code: "EMTG102",
      years: {
        "2016": ["2016 Midterm (PDF)", "2016 Final (PDF)"],
        "2017": ["2017 Midterm (PDF)", "2017 Final (PDF)"],
        "2018": ["2018 Midterm (PDF)", "2018 Final (PDF)"]
      }
    },
    {
      name: "Health & Physical Education", code: "HPE102",
      years: {
        "2016": ["2016 Final (PDF)"],
        "2017": ["2017 Final (PDF)"],
        "2018": ["2018 Final (PDF)"]
      }
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  renderCourses();

  document.getElementById("unlockBtn").addEventListener("click", () => {
    document.getElementById("paymentModal").classList.remove("hidden");
  });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderCourses();
  });
});

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
        <button class="paper-btn" onclick="openPaper('${course.name}', '${p}')">
          <span>📄 ${p}</span>
          <span>${isUnlocked ? '👀 View' : '🔒 Locked'}</span>
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

function previewScreenshot(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("screenshotPreview").src = e.target.result;
      document.getElementById("previewContainer").classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }
}

function processPayment() {
  const txnRef = document.getElementById("txnRef").value;
  const fileInput = document.getElementById("screenshotInput");

  if (!txnRef && fileInput.files.length === 0) {
    alert("Please enter a payment transaction code OR attach a receipt screenshot.");
    return;
  }

  isUnlocked = true;
  document.getElementById("accessBadge").className = "status-badge unlocked";
  document.getElementById("accessBadge").innerText = "✅ UNLOCKED";
  document.getElementById("unlockBtn").style.display = "none";

  closeModal("paymentModal");
  renderCourses();
  alert("Payment verified successfully! All AASTU freshman papers are unlocked.");
}

function openPaper(course, paper) {
  if (!isUnlocked) {
    document.getElementById("paymentModal").classList.remove("hidden");
    return;
  }

  const modal = document.getElementById("viewerModal");
  document.getElementById("viewerTitle").innerText = `${course} - ${paper}`;
  
  const body = document.getElementById("viewerBody");
  if (paper.includes("(PDF)")) {
    body.innerHTML = `<iframe src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" width="100%" height="400px"></iframe>`;
  } else {
    body.innerHTML = `<img src="https://via.placeholder.com/600x800?text=AASTU+Exam+Paper+Image" style="max-width:100%; height:auto;" />`;
  }

  modal.classList.remove("hidden");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

/* Floating AI Assistant Logic */
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
    let reply = "I am here to help you navigate the portal! Ask me about buying access, uploading payment receipts, or contacting Sagni Miressa.";
    const query = text.toLowerCase();

    if (query.includes("buy") || query.includes("payment") || query.includes("unlock")) {
      reply = "To buy access:\n1. Click 'Unlock (100 ETB)'.\n2. Transfer 100 ETB via CBE (1000654224657 - Sagni Miressa) or Telebirr (0944899465 - Abebe Jabessa).\n3. Enter transaction code or upload receipt screenshot!";
    } else if (query.includes("owner") || query.includes("sagni") || query.includes("contact")) {
      reply = "The portal owner is Sagni Miressa. Contact via Telegram @samirgob or call 0944899465.";
    } else if (query.includes("receipt") || query.includes("upload") || query.includes("screenshot")) {
      reply = "Open the Unlock modal, choose your screenshot under 'Upload Payment Screenshot', and click Submit Verification!";
    }

    appendAiMsg(reply, "bot");
  }, 400);
}

function appendAiMsg(text, sender) {
  const container = document.getElementById("aiMessages");
  const msgDiv = document.createElement("div");
  msgDiv.className = `ai-msg ${sender}`;
  msgDiv.innerText = text;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}