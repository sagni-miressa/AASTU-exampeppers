let isUnlocked = false;
let currentSemester = 1;

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
});

function renderCourses() {
  const grid = document.getElementById("courseGrid");
  grid.innerHTML = "";

  courses[currentSemester].forEach(course => {
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
      <p style="color:#777; font-size: 0.85rem;">Code: ${course.code}</p>
      <div class="paper-list">${paperListHTML}</div>
    `;

    grid.appendChild(card);
  });
}

function switchSemester(sem) {
  currentSemester = sem;
  document.querySelectorAll(".tab-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx + 1 === sem);
  });
  renderCourses();
}

function processPayment() {
  const phone = document.getElementById("phone").value;
  if (!phone || phone.length < 9) {
    alert("Please enter a valid phone number.");
    return;
  }

  isUnlocked = true;
  document.getElementById("accessBadge").className = "status-badge unlocked";
  document.getElementById("accessBadge").innerText = "✅ UNLOCKED";
  document.getElementById("unlockBtn").style.display = "none";

  closeModal("paymentModal");
  renderCourses();
  alert("Payment successful! All freshman exam papers are now unlocked.");
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
    body.innerHTML = `<div style="padding:2rem; text-align:center;">
      <p>PDF Document Loaded Successfully.</p>
      <iframe src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" width="100%" height="400px"></iframe>
    </div>`;
  } else {
    body.innerHTML = `<div style="padding:2rem; text-align:center;">
      <img src="https://via.placeholder.com/600x800?text=AASTU+Exam+Paper+Image" style="max-width:100%; height:auto;" />
    </div>`;
  }

  modal.classList.remove("hidden");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}