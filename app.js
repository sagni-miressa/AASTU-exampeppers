let isUnlocked = localStorage.getItem("aastu_access_unlocked") === "true";
let currentSemester = 1;
let searchQuery = "";

// Course Dataset
const courses = {
  1: [
    // 1. LOGIC & CRITICAL THINKING (LOG101)
    {
      name: "Logic & Critical Thinking",
      code: "LOG101",
      years: {
        "2016": [
          { title: "2016 Midterm - Page 1", file: "./exams/log101-2016-mid-p1.jpg" },
          { title: "2016 Midterm - Page 2", file: "./exams/log101-2016-mid-p2.jpg" },
          { title: "2016 Midterm - Page 3", file: "./exams/log101-2016-mid-p3.jpg" },
          { title: "2016 Midterm - Page 4", file: "./exams/log101-2016-mid-p4.jpg" },
          { title: "2016 Midterm - Page 6", file: "./exams/log101-2016-mid-p6.jpg" },
          { title: "2016 Midterm - Page 7", file: "./exams/log101-2016-mid-p7.jpg" },
          { title: "2016 Midterm - Page 8", file: "./exams/log101-2016-mid-p8.jpg" },
          { title: "2016 Midterm - Page 9", file: "./exams/log101-2016-mid-p9.jpg" }
        ],
        "2017": [
          { title: "2017 Midterm - Page 1", file: "./exams/log101-2017-mid-p1.jpg" },
          { title: "2017 Midterm - Page 2", file: "./exams/log101-2017-mid-p2.jpg" },
          { title: "2017 Midterm - Page 3", file: "./exams/log101-2017-mid-p3.jpg" }
        ],
        "2018": [
          { title: "2018 Final - Page 1", file: "./exams/log101-2018-final-p1.jpg" },
          { title: "2018 Final - Page 2", file: "./exams/log101-2018-final-p2.jpg" },
          { title: "2018 Final - Page 3", file: "./exams/log101-2018-final-p3.jpg" },
          { title: "2018 Final - Page 4", file: "./exams/log101-2018-final-p4.jpg" },
          { title: "2018 Final - Page 5", file: "./exams/log101-2018-final-p5.jpg" }
        ]
      }
    },

    // 2. GENERAL PSYCHOLOGY (PSY101)
    {
      name: "General Psychology",
      code: "PSY101",
      years: {
        "2016": [
          { title: "2016 Final - Page 1", file: "./exams/psy101-2016-final-p1.jpg" },
          { title: "2016 Final - Page 2", file: "./exams/psy101-2016-final-p2.jpg" },
          { title: "2016 Final - Page 3", file: "./exams/psy101-2016-final-p3.jpg" },
          { title: "2016 Final - Page 4", file: "./exams/psy101-2016-final-p4.jpg" },
          { title: "2016 Final - Page 6", file: "./exams/psy101-2016-final-p6.jpg" }
        ],
        "2017": [
          { title: "2017 Final - Page 1", file: "./exams/psy101-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/psy101-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/psy101-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/psy101-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/psy101-2017-final-p5.jpg" }
        ]
      }
    },

    // 3. GENERAL MATHEMATICS (MATH100)
    {
      name: "General Mathematics",
      code: "MATH100",
      years: {
        "2016": [
          { title: "2016 Midterm - Page 1", file: "./exams/math100-2016-mid-p1.jpg" },
          { title: "2016 Midterm - Page 2", file: "./exams/math100-2016-mid-p2.jpg" },
          { title: "2016 Final - Page 1", file: "./exams/math100-2016-final-p1.jpg" },
          { title: "2016 Final - Page 2", file: "./exams/math100-2016-final-p2.jpg" },
          { title: "2016 Final - Page 3", file: "./exams/math100-2016-final-p3.jpg" },
          { title: "2016 Final - Page 9", file: "./exams/math100-2016-final-p9.jpg" },
          { title: "2016 Final - Page 10", file: "./exams/math100-2016-final-p10.jpg" },
          { title: "2016 Final - Page 11", file: "./exams/math100-2016-final-p11.jpg" },
          { title: "2016 Final - Page 12", file: "./exams/math100-2016-final-p12.jpg" },
          { title: "2016 Final - Page 13", file: "./exams/math100-2016-final-p13.jpg" },
          { title: "2016 Final - Page 14", file: "./exams/math100-2016-final-p14.jpg" },
          { title: "2016 Final - Page 15", file: "./exams/math100-2016-final-p15.jpg" }
        ],
        "2017": [
          { title: "2017 Final - Page 1", file: "./exams/math100-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/math100-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/math100-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/math100-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/math100-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/math100-2017-final-p6.jpg" },
          { title: "2017 Final - Page 7", file: "./exams/math100-2017-final-p7.jpg" },
          { title: "2017 Final - Page 8", file: "./exams/math100-2017-final-p8.jpg" },
          { title: "2017 Final - Page 9", file: "./exams/math100-2017-final-p9.jpg" },
          { title: "2017 Final - Page 10", file: "./exams/math100-2017-final-p10.jpg" },
          { title: "2017 Final - Page 11", file: "./exams/math100-2017-final-p11.jpg" },
          { title: "2017 Final - Page 12", file: "./exams/math100-2017-final-p12.jpg" }
        ],
        "2018": [
          { title: "2018 Final - Page 1", file: "./exams/math100-2018-final-p1.jpg" },
          { title: "2018 Final - Page 2", file: "./exams/math100-2018-final-p2.jpg" },
          { title: "2018 Final - Page 3", file: "./exams/math100-2018-final-p3.jpg" },
          { title: "2018 Final - Page 4", file: "./exams/math100-2018-final-p4.jpg" },
          { title: "2018 Final - Page 5", file: "./exams/math100-2018-final-p5.jpg" },
          { title: "2018 Final - Page 6", file: "./exams/math100-2018-final-p6.jpg" },
          { title: "2018 Final - Page 7", file: "./exams/math100-2018-final-p7.jpg" },
          { title: "2018 Final - Page 9", file: "./exams/math100-2018-final-p9.jpg" },
          { title: "2018 Final - Page 10", file: "./exams/math100-2018-final-p10.jpg" },
          { title: "2018 Final - Page 11", file: "./exams/math100-2018-final-p11.jpg" },
          { title: "2018 Final - Page 12", file: "./exams/math100-2018-final-p12.jpg" },
          { title: "2018 Final - Page 13", file: "./exams/math100-2018-final-p13.jpg" }
        ]
      }
    },

    // 4. COMMUNICATIVE ENGLISH I (ENG101)
    {
      name: "Communicative English I",
      code: "ENG101",
      years: {
        "2017": [
          { title: "2017 Final - Page 1", file: "./exams/eng101-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/eng101-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/eng101-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/eng101-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/eng101-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/eng101-2017-final-p6.jpg" },
          { title: "2017 Final - Page 7", file: "./exams/eng101-2017-final-p7.jpg" },
          { title: "2017 Final - Page 8", file: "./exams/eng101-2017-final-p8.jpg" }
        ],
        "2018": [
          { title: "2018 Final - Page 1", file: "./exams/eng101-2018-final-p1.jpg" },
          { title: "2018 Final - Page 2", file: "./exams/eng101-2018-final-p2.jpg" },
          { title: "2018 Final - Page 3", file: "./exams/eng101-2018-final-p3.jpg" },
          { title: "2018 Final - Page 4", file: "./exams/eng101-2018-final-p4.jpg" },
          { title: "2018 Final - Page 5", file: "./exams/eng101-2018-final-p5.jpg" },
          { title: "2018 Final - Page 6", file: "./exams/eng101-2018-final-p6.jpg" },
          { title: "2018 Final - Page 7", file: "./exams/eng101-2018-final-p7.jpg" },
          { title: "2018 Final - Page 8", file: "./exams/eng101-2018-final-p8.jpg" }
        ]
      }
    },

    // 5. GENERAL PHYSICS (PHYS101)
    {
      name: "General Physics",
      code: "PHYS101",
      years: {
        "2016": [
          { title: "2016 Final - Page 1", file: "./exams/phys101-2016-final-p1.jpg" },
          { title: "2016 Final - Page 2", file: "./exams/phys101-2016-final-p2.jpg" },
          { title: "2016 Final - Page 3", file: "./exams/phys101-2016-final-p3.jpg" },
          { title: "2016 Final - Page 4", file: "./exams/phys101-2016-final-p4.jpg" },
          { title: "2016 Final - Page 5", file: "./exams/phys101-2016-final-p5.jpg" },
          { title: "2016 Final - Page 6", file: "./exams/phys101-2016-final-p6.jpg" },
          { title: "2016 Final - Page 7", file: "./exams/phys101-2016-final-p7.jpg" },
          { title: "2016 Final - Page 8", file: "./exams/phys101-2016-final-p8.jpg" }
        ],
        "2017": [
          { title: "2017 Final - Page 1", file: "./exams/phys101-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/phys101-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/phys101-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/phys101-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/phys101-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/phys101-2017-final-p6.jpg" },
          { title: "2017 Final - Page 8", file: "./exams/phys101-2017-final-p8.jpg" },
          { title: "2017 Final - Page 9", file: "./exams/phys101-2017-final-p9.jpg" },
          { title: "2017 Final - Page 10", file: "./exams/phys101-2017-final-p10.jpg" },
          { title: "2017 Final - Page 12", file: "./exams/phys101-2017-final-p12.jpg" },
          { title: "2017 Final - Page 14", file: "./exams/phys101-2017-final-p14.jpg" },
          { title: "2017 Final - Page 15", file: "./exams/phys101-2017-final-p15.jpg" },
          { title: "2017 Final - Page 16", file: "./exams/phys101-2017-final-p16.jpg" },
          { title: "2017 Final - Page 17", file: "./exams/phys101-2017-final-p18.jpg" },
          { title: "2017 Final - Page 18", file: "./exams/phys101-2017-final-p18.jpg" },
          { title: "2017 Final - Page 19", file: "./exams/phys101-2017-final-p19.jpg" },
          { title: "2017 Final - Extra 1", file: "./exams/phys101-2017-final-p134.jpg" },
          { title: "2017 Final - Extra 2", file: "./exams/phys101-2017-final-p191.jpg" }
        ],
        "2018": [
          { title: "2018 Final - Page 1", file: "./exams/phys101-2018-final-p1.jpg" },
          { title: "2018 Final - Page 2", file: "./exams/phys101-2018-final-p2.jpg" },
          { title: "2018 Final - Page 3", file: "./exams/phys101-2018-final-p3.jpg" },
          { title: "2018 Final - Page 4", file: "./exams/phys101-2018-final-p4.jpg" },
          { title: "2018 Final - Page 5", file: "./exams/phys101-2018-final-p5.jpg" },
          { title: "2018 Final - Page 6", file: "./exams/phys101-2018-final-p6.jpg" },
          { title: "2018 Final - Page 7", file: "./exams/phys101-2018-final-p7.jpg" },
          { title: "2018 Final - Page 8", file: "./exams/phys101-2018-final-p8.jpg" },
          { title: "2018 Final - Page 9", file: "./exams/phys101-2018-final-p9.jpg" },
          { title: "2018 Final - Page 10", file: "./exams/phys101-2018-final-p10.jpg" },
          { title: "2018 Final - Page 11", file: "./exams/phys101-2018-final-p11.jpg" },
          { title: "2018 Final - Page 12", file: "./exams/phys101-2018-final-p12.jpg" },
          { title: "2018 Final - Page 13", file: "./exams/phys101-2018-final-p13.jpg" },
          { title: "2018 Final - Page 14", file: "./exams/phys101-2018-final-p14.jpg" },
          { title: "2018 Final - Page 15", file: "./exams/phys101-2018-final-p15.jpg" },
          { title: "2018 Final - Page 16", file: "./exams/phys101-2018-final-p16.jpg" },
          { title: "2018 Final - Page 17", file: "./exams/phys101-2018-final-p17.jpg" },
          { title: "2018 Final - Page 19", file: "./exams/phys101-2018-final-p19.jpg" },
          { title: "2018 Final - Page 20", file: "./exams/phys101-2018-final-p20.jpg" },
          { title: "2018 Final - Page 21", file: "./exams/phys101-2018-final-p21.jpg" },
          { title: "2018 Final - Page 22", file: "./exams/phys101-2018-final-p22.jpg" },
          { title: "2018 Final - Page 23", file: "./exams/phys101-2018-final-p23.jpg" },
          { title: "2018 Final - Page 24", file: "./exams/phys101-2018-final-24.jpg" },
          { title: "2018 Final - Page 25", file: "./exams/phys101-2018-final-p25.jpg" },
          { title: "2018 Final - Page 26", file: "./exams/phys101-2018-final-p26.jpg" },
          { title: "2018 Final - Page 27", file: "./exams/phys101-2018-final-p27.jpg" }
        ]
      }
    },

    // 6. HISTORY OF ETHIOPIA & THE HORN (HIST101)
    {
      name: "History of Ethiopia & the Horn",
      code: "HIST101",
      years: {
        "2016": [
          { title: "2016 Midterm - Page 1", file: "./exams/hist101-2016-mid-p1.jpg" },
          { title: "2016 Midterm - Page 2", file: "./exams/hist101-2016-mid-p2.jpg" },
          { title: "2016 Midterm - Page 3", file: "./exams/hist101-2016-mid-p3.jpg" },
          { title: "2016 Midterm - Page 4", file: "./exams/hist101-2016-mid-p4.jpg" },
          { title: "2016 Midterm - Page 5", file: "./exams/hist101-2016-mid-p5.jpg" },
          { title: "2016 Midterm - Page 6", file: "./exams/hist101-2016-mid-p6.jpg" },
          { title: "2016 Midterm - Page 7", file: "./exams/hist101-2016-mid-p7.jpg" }
        ]
      }
    }
  ],

  2: [
    // 1. SOCIAL ANTHROPOLOGY (ANT102)
    {
      name: "Social Anthropology",
      code: "ANT102",
      years: {
        "2016": [
          { title: "2016 Final - Page 1", file: "./exams/ant102-2016-final-p1.jpg" },
          { title: "2016 Final - Page 2", file: "./exams/ant102-2016-final-p2.jpg" },
          { title: "2016 Final - Page 3", file: "./exams/ant102-2016-final-p3.jpg" },
          { title: "2016 Final - Page 5", file: "./exams/ant102-2016-final-p5.jpg" }
        ],
        "2017": [
          { title: "2017 Final - Page 1", file: "./exams/ant102-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/ant102-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/ant102-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/ant102-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/ant102-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/ant102-2017-final-p6.jpg" }
        ]
      }
    },

    // 2. ENTREPRENEURSHIP (ENT102)
    {
      name: "Entrepreneurship",
      code: "ENT102",
      years: {
        "2017": [
          { title: "2017 Final - Page 1", file: "./exams/ent102-2017-final-p1.jpg" },
          { title: "2017 Final - Page 2", file: "./exams/ent102-2017-final-p2.jpg" },
          { title: "2017 Final - Page 3", file: "./exams/ent102-2017-final-p3.jpg" },
          { title: "2017 Final - Page 4", file: "./exams/ent102-2017-final-p4.jpg" },
          { title: "2017 Final - Page 5", file: "./exams/ent102-2017-final-p5.jpg" },
          { title: "2017 Final - Page 6", file: "./exams/ent102-2017-final-p6.jpg" },
          { title: "2017 Final - Page 7", file: "./exams/ent102-2017-final-p7.jpg" },
          { title: "2017 Final - Page 8", file: "./exams/ent102-2017-final-p8.jpg" },
          { title: "2017 Final - Page 9", file: "./exams/ent102-2017-final-p9.jpg" }
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
      reply = "To acquire access:\n1. Transfer 100 ETB to CBE (1000654224057 - Sagni Miressa) or Telebirr (0944899465).\n2. Send your payment screenshot to @samirgob on Telegram!";
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