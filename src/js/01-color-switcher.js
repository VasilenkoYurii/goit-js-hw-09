const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
  prg: document.querySelector('p'),
};

const div = document.createElement('div');
div.classList.add('boxForButton');
refs.start.classList.add('button-start');
refs.stop.classList.add('button-stop');
div.append(refs.start, refs.stop);
refs.prg.after(div);

refs.stop.setAttribute('disabled', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.start.addEventListener('click', () => {
  refs.start.setAttribute('disabled', true);
  refs.stop.removeAttribute('disabled', false);
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
});

refs.stop.addEventListener('click', () => {
  refs.start.removeAttribute('disabled', false);
  clearInterval(timerId);
});
