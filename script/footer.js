/*LINK PLAYBTNFOOTER WITH THE PROGRESSBAR */
const playBtnFooter = document.getElementById("playBtnFooter");
// DENTRO QUEST'ADDEVENTLISTENER HO FATTO PARTIRE LE FUNZIONI DELLA PROGRESSBAR E DEL TIMER DELLE CANZONI
playBtnFooter.addEventListener("click", () => {
  let isPlayng = true;

  const updateProgressBar = function () {
    if (isPlayng) {
      const progressBar = document.getElementsByClassName("progress-bar")[0];
      const computedStyle = getComputedStyle(progressBar);
      let width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
      progressBar.style.setProperty("--width", width + 3.4);
      if (width === 30) {
        clearInterval(progressInterval);
      }
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
      if (isPlayng) {
        seconds++;
        document.getElementById("songTimer").textContent = formatTime(seconds);
        if (seconds >= 30) {
          clearInterval(timerInterval);
        }
      }
    }, 1000);
  };

  startTimer();
  // QUESTO E QUELLO CHE SUCCEDE AL SECONDO CLICK
  playBtnFooter.addEventListener("click", () => {
    isPlayng = !isPlayng;
    if (!isPlayng) {
      clearInterval(progressInterval);

      const progressBar = document.getElementsByClassName("progress-bar")[0];
      const computedStyle = getComputedStyle(progressBar);
      const currentWidth = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
      console.log(currentWidth);
      progressBar.style.setProperty("--width", ` ${currentWidth}`);
      clearInterval(timerInterval);
      width = 0;
    } else {
      updateProgressBar();
    }
  });
});

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
