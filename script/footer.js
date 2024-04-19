/*LINK PLAYBTNFOOTER WITH THE PROGRESSBAR */
const playBtnFooter = document.getElementById("playBtnFooter");
// DENTRO QUEST'ADDEVENTLISTENER HO FATTO PARTIRE LE FUNZIONI DELLA PROGRESSBAR E DEL TIMER DELLE CANZONI
playBtnFooter.addEventListener("click", () => {
  const updateProgressBar = function () {
    const progressBar = document.getElementsByClassName("progress-bar")[0];
    const computedStyle = getComputedStyle(progressBar);
    const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
    progressBar.style.setProperty("--width", width + 3.4);

    if (width === 30) {
      clearInterval(progressInterval);
    }
  };

  const progressInterval = setInterval(updateProgressBar, 1000);
  const formatTime = function (seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondi = seconds % 60;
    const formattedSeconds = secondi < 10 ? `0${secondi}` : secondi;
    return `${minutes}:${formattedSeconds}`;
  };

  const startTimer = function () {
    let seconds = 0;
    timerInterval = setInterval(() => {
      seconds++;
      document.getElementById("songTimer").textContent = formatTime(seconds);
      if (seconds >= 30) {
        clearInterval(timerInterval);
      }
    }, 1000);
  };
  startTimer();
  // if (seconds > 0 && width > 0) clearInterval(updateProgressBar);
  // clearInterval(startTimer);
});

document.addEventListener("DOMContentLoaded", startTimer);

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
