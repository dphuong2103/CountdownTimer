let time = 0;
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
      inputHour.val(`0${inputHour.val()}`);
    }
  });
  start.click(() => {
    if (runCountDown == undefined) {
      timeInput =
        inputHour.val() * 3600 + inputMinute.val() * 60 + inputSecond.val() * 1;

      time =
        inputHour.val() * 3600 + inputMinute.val() * 60 + inputSecond.val() * 1;

      runCountDown = setInterval(() => {
        if (time < 0) {
          clearInterval(runCountDown);
          return;
        }

        setTime(time);

        time += -1;
      }, 1000);
    }
  });

  pause.click(() => {
    clearInterval(runCountDown);
    runCountDown = undefined;
  });

  reset.click(() => {
    if (runCountDown) {
      clearInterval(runCountDown);
      setTime(timeInput);
      runCountDown = undefined;
    } else {
      inputMinute.val("");
      inputSecond.val("");
      inputHour.val("");
      resetCount = 0;
      document.title = `Countdown Timer`;
    }
  });

  function setTime(time) {
    if (time > 0) {
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
