// ================================
//              MENU 
// ================================

// Dugmad
const btnSingle = document.getElementById("btn-1p");
const btnMulti  = document.getElementById("btn-2p");
const btnOptions = document.getElementById("btn-options");
const btnExit   = document.getElementById("btn-exit");

// 1 IGRAČ
btnSingle.addEventListener("click", () => {
  localStorage.setItem("players", "1");
  localStorage.setItem("mode", "single");
  window.location.href = "index.html";
});

// 2 IGRAČA
btnMulti.addEventListener("click", () => {
  localStorage.setItem("players", "2");
  localStorage.setItem("mode", "multi");
  window.location.href = "index.html";
});

// OPCIJE
btnOptions.addEventListener("click", () => {
  alert("Opcije će biti dodate kasnije.");
});

// IZLAZ
btnExit.addEventListener("click", () => {
  if (confirm("Da li želiš da izađeš iz igre?")) {
    window.close(); // radi ako je otvoreno iz browsera kao app
  }
});

// =========================
// PLAYER AVATAR MENI
// =========================
const avatarIcon = document.getElementById("avatar-icon");
const avatarMenu = document.getElementById("avatar-menu");

// Toggle avatar meni
avatarIcon.addEventListener("click", (e) => {
  e.stopPropagation(); // da klik ne zatvori odmah meni
  avatarMenu.style.display = avatarMenu.style.display === "flex" ? "none" : "flex";
});

// Klik van avatara zatvara meni
document.addEventListener("click", (e) => {
  if (!avatarIcon.contains(e.target) && !avatarMenu.contains(e.target)) {
    avatarMenu.style.display = "none";
  }
});

// =========================
// STATISTIKA MODAL
// =========================
const statsModal = document.getElementById("stats-modal");
const statsBtn = document.getElementById("statistika-btn");
const closeStats = document.getElementById("close-stats");

// Otvori modal statistike
statsBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // klik na dugme ne zatvara avatar meni
  statsModal.style.display = "flex";

  // Popuni tabelu primer vrednostima (kasnije poveži sa lokalnim storage ili server)
  document.getElementById("wins").textContent = 5;
  document.getElementById("matches").textContent = 12;
  document.getElementById("max-points").textContent = 99;
});

// Zatvori modal klikom na X
closeStats.addEventListener("click", () => {
  statsModal.style.display = "none";
});

// Zatvori modal klikom van njega
window.addEventListener("click", (e) => {
  if (e.target === statsModal) {
    statsModal.style.display = "none";
  }
});

// =========================
// NALOG DUGME (placeholder)
// =========================
document.getElementById("nalog-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  alert("Opcije naloga će biti prikazane ovde.");
});

