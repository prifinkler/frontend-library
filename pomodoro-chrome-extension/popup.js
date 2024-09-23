document.addEventListener('DOMContentLoaded', function() {
  const timerEl = document.getElementById("timer");
  const pauseResumeBtn = document.getElementById("pause-resume-btn");
  const pomodoroBtn = document.getElementById("pomodoro-btn");
  const shortBreakBtn = document.getElementById("shortBreak-btn");
  const longBreakBtn = document.getElementById("longBreak-btn");

  const toggleBtns = [pomodoroBtn, shortBreakBtn, longBreakBtn];

  chrome.runtime.sendMessage({ action: "getState"}, (response) => {
    updateUI(response);
  })

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateTimer") {
      updateUI(request);
    }
  });

  function updateUI(state) {
    timerEl.textContent = state.time;
    pauseResumeBtn.textContent = state.isPaused ? "START" : "PAUSE";
    setActiveButton(state.timerMode);
  }

  pauseResumeBtn.addEventListener("click", function() {
    chrome.runtime.sendMessage({
      action: pauseResumeBtn.textContent === "START" ? "startTimer" : "pauseTimer"
    });
  });

  function setActiveButton(mode) {
    toggleBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtnId = `${mode}-btn`;
    // console.log("active button id:", activeBtnId);
    const activeBtn = document.getElementById(activeBtnId);
    activeBtn.classList.add('active');
  }

  pomodoroBtn.addEventListener("click", function() {
    chrome.runtime.sendMessage({action: "setTime", minutes: 25, mode: "pomodoro"});
  });

  shortBreakBtn.addEventListener("click", function() {
    chrome.runtime.sendMessage({action: "setTime", minutes: 5, mode: "shortBreak"});
  });

  longBreakBtn.addEventListener("click", function() {
    chrome.runtime.sendMessage({action: "setTime", minutes: 10, mode: "longBreak"});
  });
});
