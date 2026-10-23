let isUnlocked = false;
let currentSemester = 1;
let searchQuery = "";

const courses = {
  1: [
    { name: "Communicative English Language Skills I", code: "ENG101", papers: [{ name: "2023 Midterm", type: "pdf" }, { name: "2023 Final", type: "img" }, { name: "2022 Quiz 1", type: "pdf" }] },
    { name: "General Psychology", code: "PSY101", papers: [{ name: "2023 Midterm", type: "pdf" }, { name: "2023 Final", type: "pdf" }] },
    { name: "Applied Mathematics I", code: "MATH101", papers: [{ name: "2023 Midterm", type: "pdf" }, { name: "2023 Final", type: "pdf" }, { name: "2022 Final", type: "img" }] },
    { name: "Logic & Critical Thinking", code: "LOG101", papers: [{ name: "2023 Midterm", type: "pdf" }, { name: "2022 Final", type: "pdf" }] },
    { name: "General Mathematics", code: "MATH100", papers: [{ name: "2023 Midterm", type: "pdf" }, { name: "2023 Final", type: "pdf" }] }
  ],
  2: [
    { name: "Communicative English Language Skills II", code: "ENG102", papers: [{ name: "2023 Midterm", type: "pdf" }, { name: "2023 Final", type: "pdf" }] },
    { name: "Entrepreneurship", code: "ENT102", papers: [{ name: "2023 Midterm", type: "pdf" }, { name: "2023 Final", type: "pdf" }] },
    { name: "Social Anthropology", code: "ANT102", papers: [{ name: "2023 Midterm", type: "pdf" }, { name: "2023 Final", type: "pdf" }] },
    { name: "Emerging Technologies", code: "EMTG102", papers: [{ name: "2023 Midterm", type: "pdf" }, { name: "2023 Final", type: "pdf" }, { name: "2022 Quiz", type: "pdf" }] },
    { name: "Health & Physical Education", code: "HPE102", papers: [{ name: "2023 Final", type: "pdf" }] }
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
  document.querySelectorAll(".nav-item").forEach(nav => nav.classList.remove("active"));

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
  
  document.getElementById("sem1Card").classList.toggle("active", sem === 1);
  document.getElementById("sem2Card").classList.toggle("active", sem === 2);

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
      <div class="paper-item" onclick="openPaper('${course.name}', '${p.name}', '${p.type}')">
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="${p.type === 'pdf' ? 'tag-pdf' : 'tag-img'}">${p.type.toUpperCase()}</span>
          <span>${p.name}</span>
        </div>
        <span>${isUnlocked ? '👀 View' : '🔒'}</span>
      </div>
    `).join("");

    card.innerHTML = `
      <div class="course-header">
        <h4>${course.name}</h4>
        <span class="code-pill">${course.code}</span>
      </div>
      <div class="paper-list">${paperListHTML}</div>
    `;

    grid.appendChild(card);
  });
}

function processPayment() {
  const txnRef = document.getElementById("txnRef").value;
  if (!txnRef || txnRef.trim().length < 4) {
    alert("Please enter a valid transaction reference code.");
    return;
  }

  isUnlocked = true;
  document.getElementById("accessBadge").className = "status-badge unlocked";
  document.getElementById("accessBadge").innerText = "✅ UNLOCKED";
  document.getElementById("unlockBtn").style.display = "none";

  closeModal("paymentModal");
  renderCourses();
  alert("Payment submission received! All freshman exam papers are now unlocked.");
}

function openPaper(course, paperName, paperType) {
  if (!isUnlocked) {
    document.getElementById("paymentModal").classList.remove("hidden");
    return;
  }

  const modal = document.getElementById("viewerModal");
  document.getElementById("viewerTitle").innerText = `${course} - ${paperName}`;
  
  const body = document.getElementById("viewerBody");
  if (paperType === "pdf") {
    body.innerHTML = `
      <div style="padding:1rem; text-align:center;">
        <iframe src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" width="100%" height="450px" style="border-radius: 8px; border: 1px solid var(--border-color);"></iframe>
      </div>`;
  } else {
    body.innerHTML = `
      <div style="padding:1rem; text-align:center;">
        <img src="https://via.placeholder.com/600x800?text=AASTU+Past+Exam+Picture" style="max-width:100%; height:auto; border-radius: 8px;" />
      </div>`;
  }

  modal.classList.remove("hidden");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}