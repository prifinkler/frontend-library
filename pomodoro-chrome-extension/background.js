let minutes = 25;
let seconds = 0;
let isPaused = true;
let timerMode = 'pomodoro';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({minutes, seconds, isPaused, timerMode}, () => {
    // console.log("initial state set:", {minutes, seconds, isPaused, timerMode});
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log("message received:", request);
  switch (request.action) {
    case "startTimer":
      startTimer();
      break;
    case "pauseTimer":
      pauseTimer();
      break;
    case "setTime":
      setTime(request.minutes, request.mode);
      break;
    case "getState":
      // console.log("sending state:", { minutes, seconds, isPaused, timerMode, time: formatTime() });
      sendResponse({ minutes, seconds, isPaused, timerMode, time: formatTime() });
      return true;
  }
});

function startTimer() {
  isPaused = false;
  chrome.alarms.create("pomodoroTimer", { periodInMinutes: 1/60 });
  updateState();
}

function pauseTimer() {
  isPaused = true;
  chrome.alarms.clear("pomodoroTimer");
  updateState();
}

function setTime(newMinutes, mode) {
  minutes = newMinutes;
  seconds = 0;
  timerMode = mode;
  updateState();
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    updateTimer();
  }
});

function updateTimer() {
  if (seconds > 0) {
    seconds--;
  } else if (minutes > 0) {
    minutes--;
    seconds = 59;
  } else {
    createNotification();
    pauseTimer();
    return;
  }
  updateState();
}

function updateState() {
  chrome.storage.local.set({ minutes, seconds, isPaused, timerMode });
  const state = {
    action: "updateTimer",
    time: formatTime(),
    isPaused: isPaused,
    timerMode: timerMode
  };
  // console.log("sending updated state:", state);
  chrome.runtime.sendMessage(state);
}

function formatTime() {
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function createNotification() {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "pomodoro.png",
    title: "Pomodoro Timer",
    message: `${timerMode.charAt(0).toUpperCase() + timerMode.slice(1)} time is up!`,
    priority: 2,
    requireInteraction: true
  });
}
