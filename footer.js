// START PROGRESS BAR
const progressBar = document.getElementsByClassName("progress-bar")[0];
setInterval(() => {
  const computedStyle = getComputedStyle(progressBar);
  const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
  progressBar.style.setProperty("--width", width + 1);
}, 1000);
// END PROGRESS BAR

//START SONG TIMER

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${formattedSeconds}`;
}

function startTimer() {
  let seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    document.getElementById("songTimer").textContent = formatTime(seconds);
  }, 1000);
}

document.addEventListener("DOMContentLoaded", startTimer);
//END SONG TIMER
