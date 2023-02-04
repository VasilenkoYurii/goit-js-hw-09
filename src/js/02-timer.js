import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
};

let selDates = null;
let intervalId = null;

refs.start.setAttribute('disabled', true);
refs.stop.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selDates = selectedDates[0].getTime();
    if (selDates < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    if (selDates > Date.now()) {
      Notiflix.Notify.success('This date is right');
      refs.start.removeAttribute('disabled', true);
    }
  },
};

flatpickr('#datetime-picker', options);

refs.start.addEventListener('click', function interval() {
  intervalId = setInterval(() => {
    const dateNow = selDates - Date.now();
    refs.stop.removeAttribute('disabled', true);

    if (dateNow < 1000) {
      window.clearInterval(intervalId);
    }

    const { days, hours, minutes, seconds } = convertMs(dateNow);
    changeSpanDates({ days, hours, minutes, seconds });
  }, 1000);
});

refs.stop.addEventListener('click', function stopInterval() {
  window.clearInterval(intervalId);
  refs.start.setAttribute('disabled', true);
  refs.stop.setAttribute('disabled', true);
  refs.spanDays.textContent = '00';
  refs.spanHours.textContent = '00';
  refs.spanMinutes.textContent = '00';
  refs.spanSeconds.textContent = '00';
  Notiflix.Notify.info('You can choose a new date');
});

function changeSpanDates({ days, hours, minutes, seconds }) {
  refs.spanDays.textContent = days;
  refs.spanHours.textContent = hours;
  refs.spanMinutes.textContent = minutes;
  refs.spanSeconds.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
