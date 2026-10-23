let isUnlocked = false;
let currentSemester = 1;
let searchQuery = "";

const courses = {
  1: [
    { name: "Communicative English Language Skills I", code: "ENG101", papers: ["2023 Midterm (PDF)", "2023 Final (IMG)", "2022 Quiz 1 (PDF)"] },
    { name: "General Psychology", code: "PSY101", papers: ["2023 Midterm (PDF)", "2023 Final (PDF)"] },
    { name: "Applied Mathematics I", code: "MATH101", papers: ["2023 Midterm (PDF)", "2023 Final (PDF)", "2022 Final (IMG)"] },
    { name: "Logic & Critical Thinking", code: "LOG101", papers: ["2023 Midterm (PDF)", "2022 Final (PDF)"] },
    { name: "General Mathematics", code: "MATH100", papers: ["2023 Midterm (PDF)", "2023 Final (PDF)"] }
  ],
  2: [
    { name: "Communicative English Language Skills II", code: "ENG102", papers: ["2023 Midterm (PDF)", "2023 Final (PDF)"] },
    { name: "Entrepreneurship", code: "ENT102", papers: ["2023 Midterm (PDF)", "2023 Final (PDF)"] },
    { name: "Social Anthropology", code: "ANT102", papers: ["2023 Midterm (PDF)", "2023 Final (PDF)"] },
    { name: "Emerging Technologies", code: "EMTG102", papers: ["2023 Midterm (PDF)", "2023 Final (PDF)", "2022 Quiz (PDF)"] },
    { name: "Health & Physical Education", code: "HPE102", papers: ["2023 Final (PDF)"] }
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

function showPage(pageName) {
  document.querySelectorAll(".page-section").forEach(sec => sec.classList.add("hidden"));
  document.querySelectorAll(".nav-bubble").forEach(btn => btn.classList.remove("active"));

  if (pageName === 'home') {
    document.getElementById("homePage").classList.remove("hidden");
  } else if (pageName === 'about') {
    document.getElementById("aboutPage").classList.remove("hidden");
  } else if (pageName === 'contact') {
    document.getElementById("contactPage").classList.remove("hidden");
  }

  event.target.classList.add("active");
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

  filtered.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";

    let paperListHTML = course.papers.map(p => `
      <button class="paper-btn" onclick="openPaper('${course.name}', '${p}')">
        <span>📄 ${p}</span>
        <span>${isUnlocked ? '👀 View' : '🔒 Locked'}</span>
      </button>
    `).join("");

    card.innerHTML = `
      <h4>${course.name}</h4>
      <p style="color:#777; font-size:0.85rem; margin-bottom:8px;">Code: ${course.code}</p>
      <div class="paper-list">${paperListHTML}</div>
    `;

    grid.appendChild(card);
  });
}

function processPayment() {
  const txnRef = document.getElementById("txnRef").value;
  if (!txnRef || txnRef.trim().length < 3) {
    alert("Please enter your payment reference transaction code.");
    return;
  }

  isUnlocked = true;
  document.getElementById("accessBadge").className = "status-badge unlocked";
  document.getElementById("accessBadge").innerText = "✅ UNLOCKED";
  document.getElementById("unlockBtn").style.display = "none";

  closeModal("paymentModal");
  renderCourses();
  alert("Payment verified! All freshman exam papers are unlocked.");
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