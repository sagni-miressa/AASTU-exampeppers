let isUnlocked = localStorage.getItem("aastu_access_unlocked") === "true";
let currentSemester = 1;
let searchQuery = "";

// Course Dataset
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

  const unlockBtn = document.getElementById("unlockBtn");
  if (unlockBtn) {
    unlockBtn.addEventListener("click", () => {
      document.getElementById("paymentModal").classList.remove("hidden");
    });
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase();
      renderCourses();
    });
  }

  // Anti-Capture Security Restrictions
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  document.addEventListener("keydown", (e) => {
    if (
      (e.ctrlKey && (e.key === "p" || e.key === "s" || e.key === "u")) ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C" || e.key === "J")) ||
      e.key === "F12"
    ) {
      e.preventDefault();
      alert("Copying, printing, and saving exam materials is strictly disabled.");
    }
  });
});

function applyUnlockedUI() {
  const badge = document.getElementById("accessBadge");
  if (badge) {
    badge.className = "status-badge unlocked";
    badge.innerText = "UNLOCKED";
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
  
  // Toggle green active state on clicked button
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
          <span>${p.title}</span>
          <span style="font-weight: 600; font-size: 0.8rem; color: ${isUnlocked ? 'var(--primary)' : 'var(--text-muted)'};">${isUnlocked ? 'View PDF' : 'Locked'}</span>
        </button>
      `).join("");

      yearsHTML += `
        <div class="year-group">
          <div class="year-header" onclick="toggleYearGroup('${yearContainerId}')">
            <span>${yr} Academic Year</span>
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
      <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 10px;">Course Code: ${course.code}</p>
      ${yearsHTML}
    `;

    grid.appendChild(card);
  });
}

function toggleYearGroup(id) {
  document.getElementById(id).classList.toggle("hidden");
}

function openPaper(course, paperTitle, filePath) {
  if (!isUnlocked) {
    document.getElementById("paymentModal").classList.remove("hidden");
    return;
  }

  const modal = document.getElementById("viewerModal");
  document.getElementById("viewerTitle").innerText = `${course} - ${paperTitle}`;
  
  const body = document.getElementById("viewerBody");
  
  body.innerHTML = `
    <div style="position: relative; width: 100%; height: 500px; overflow: hidden; border-radius: 8px;">
      <div class="pdf-watermark-overlay">
        <div class="pdf-watermark-text">
          AASTU EXAM PEPPERS<br>
          PROPRIETARY COPY - DO NOT DISTRIBUTE
        </div>
      </div>
      <iframe src="${filePath}#toolbar=0&navpanes=0&scrollbar=0" width="100%" height="100%" style="border:none;"></iframe>
    </div>
  `;

  modal.classList.remove("hidden");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

/* Floating Assistant Logic */
function toggleAssistant() {
  const windowEl = document.getElementById("assistantWindow");
  if (windowEl) {
    windowEl.classList.toggle("hidden");
  }
}

function handleAssistantKeyPress(e) {
  if (e.key === "Enter") sendAssistantMessage();
}

function sendQuickPrompt(text) {
  document.getElementById("assistantInput").value = text;
  sendAssistantMessage();
}

function sendAssistantMessage() {
  const input = document.getElementById("assistantInput");
  const text = input.value.trim();
  if (!text) return;

  appendChatMsg(text, "user");
  input.value = "";

  setTimeout(() => {
    let reply = "I am here to assist with portal navigation. Ask about payments or owner contacts.";
    const lower = text.toLowerCase();

    if (lower.includes("buy") || lower.includes("pay") || lower.includes("access")) {
      reply = "To acquire access:\n1. Transfer 100 ETB to CBE (1000654224657 - Sagni Miressa) or Telebirr (0944899465).\n2. Send your payment screenshot to @samirgob on Telegram!";
    } else if (lower.includes("owner") || lower.includes("contact") || lower.includes("sagni")) {
      reply = "Portal administrator: Sagni Miressa. Contact via Telegram @samirgob or phone 0944899465.";
    }

    appendChatMsg(reply, "bot");
  }, 350);
}

function appendChatMsg(text, sender) {
  const container = document.getElementById("assistantMessages");
  if (!container) return;
  const msg = document.createElement("div");
  msg.className = `chat-bubble ${sender}`;
  msg.innerText = text;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}