let runningTime = 0;
let runCountDown;
let timeInput;
$(document).ready(() => {
  inputMinute = $(".inputTime.minute");
  inputSecond = $(".inputTime.second");
  inputHour = $(".hour.inputTime");
  let start = $(".btn.start");
  let pause = $(".btn.pause");
  let reset = $(".btn.reset");
  inputMinute.val("");
  inputSecond.val("");
  inputHour.val("");
  let audio = $("#audio")[0];
  audio.src = "assets/sounds/Softchime.mp3";
  let timeControl = [inputMinute, inputSecond];

  timeControl.forEach((input) => {
    input.on("change", () => {
      inputVal = input.val();

      if (inputVal != "") {
        if (inputVal > 0) {
          if (inputVal < 10) {
            input.val(`0${Number(inputVal)}`);
          }
        } else {
          input.val("00");
        }
      }
    });
  });

  inputHour.change(() => {
    if (!(inputHour.val() > 0)) {
      inputHour.val("00");
    } else if (inputHour.val() < 10) {
      inputHour.val(`0${Number(inputHour.val())}`);
    }
  });

  start.click(() => {
    if (runCountDown == undefined) {
      timeInput =
        inputHour.val() * 3600 + inputMinute.val() * 60 + inputSecond.val() * 1;

      runningTime =
        inputHour.val() * 3600 + inputMinute.val() * 60 + inputSecond.val() * 1;
      if (runningTime == 0) {
        return;
      }
      runCountDown = setInterval(() => {
        if (runningTime < 0) {
          clearInterval(runCountDown);
          audio.play();
          return;
        }

        setTime(runningTime);
        runningTime += -1;
      }, 1000);
    }
  });

  pause.click(() => {
    audio.pause();
    clearInterval(runCountDown);
    runCountDown = undefined;
  });

  reset.click(() => {
    currentTimeInInput =
      inputHour.val() * 3600 + inputMinute.val() * 60 + inputSecond.val() * 1;
    if (runCountDown) {
      audio.pause();
      audio.currentTime = 0;
      clearInterval(runCountDown);
      setTime(timeInput);
      runCountDown = undefined;
    } else if (!runCountDown && currentTimeInInput == timeInput) {
      inputMinute.val("");
      inputSecond.val("");
      inputHour.val("");
      document.title = `Countdown Timer`;
      audio.currentTime = 0;
    } else if (!runCountDown && currentTimeInInput != timeInput) {
      setTime(timeInput);
      audio.currentTime = 0;
    }
  });

  function setTime(time) {
    if (time >= 0) {
      inputHourVal = Math.floor(time / 3600);

      inputHour.val(inputHourVal < 10 ? `0${inputHourVal}` : inputHourVal);

      inputMinuteVal = Math.floor((time - inputHourVal * 3600) / 60);
      inputMinute.val(
        inputMinuteVal < 10 ? `0${inputMinuteVal}` : inputMinuteVal
      );

      inputSecondVal = time - inputHourVal * 3600 - inputMinuteVal * 60;
      inputSecond.val(
        inputSecondVal < 10 ? `0${inputSecondVal}` : inputSecondVal
      );
      document.title = `${inputHour.val()}:${inputMinute.val()}:${inputSecond.val()} - Countdown Timer`;
    }
  }
});
