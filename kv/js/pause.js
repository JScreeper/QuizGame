let isPaused = false;

const pauseOverlay = document.getElementById("pause-overlay");
const resumeBtn = document.getElementById("resumeBtn");
const quitBtn = document.getElementById("quitBtn");

// ESC za pauzu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    togglePause();
  }
});

function togglePause() {
  isPaused = !isPaused;
  pauseOverlay.style.display = isPaused ? "flex" : "none";

  // Ako imaš tajmer interval, ovde ga stopiraš/pokrećeš
  // primer:
  // isPaused ? clearInterval(timerInterval) : startTimer();
}

// Nastavi igru
resumeBtn.addEventListener("click", () => {
  togglePause();
});

// Napusti igru → početni meni
quitBtn.addEventListener("click", () => {
  window.location.href = "menu.html";
});
