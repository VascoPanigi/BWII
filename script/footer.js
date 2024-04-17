/*LINK PLAYBTNFOOTER WITH THE PROGRESSBAR */
const playBtnFooter = document.getElementById("playBtnFooter");
playBtnFooter.addEventListener("click", () => {
  function updateProgressBar() {
    const progressBar = document.getElementsByClassName("progress-bar")[0];
    const computedStyle = getComputedStyle(progressBar);
    const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
    progressBar.style.setProperty("--width", width + 3.4);

    // Controlla se la larghezza raggiunge 30 e ferma l'intervallo in tal caso
    if (width === 30) {
      clearInterval(progressInterval);
    }
  }

  // Avvia l'intervallo utilizzando la funzione appena definita
  const progressInterval = setInterval(updateProgressBar, 1000);
});

// START PROGRESS BAR

// END PROGRESS BAR

//START SONG TIMER

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondi = seconds % 60;
  const formattedSeconds = secondi < 10 ? `0${secondi}` : secondi;
  return `${minutes}:${formattedSeconds}`;
}

function startTimer() {
  let seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    document.getElementById("songTimer").textContent = formatTime(seconds);
    if (seconds >= 30) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", startTimer);
//END SONG TIMER

const slideValue = document.querySelector("span");
const inputSlider = document.querySelector("input");
inputSlider.oninput = () => {
  let value = inputSlider.value;
  slideValue.textContent = value;
  slideValue.style.left = value / 2 + "%";
  slideValue.classList.add("show");
};
inputSlider.onblur = () => {
  slideValue.classList.remove("show");
};
