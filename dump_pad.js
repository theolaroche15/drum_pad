function playSound(e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!key || !audio) return;
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
};

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
};

window.addEventListener('keydown', playSound);

const keys = document.querySelectorAll(`.key`);
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

// DEUXIÈME PARTIES :

function beatBox() {
  function simulateKey(keyCode) {
    const event = new KeyboardEvent('keydown', {
      keyCode: keyCode,
      which: keyCode,
      bubbles: true
    });
    document.dispatchEvent(event);
  }
  function playBeat(keyCode, delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        simulateKey(keyCode);
        resolve();
      }, delay);
    });
  };
  playBeat(65, 300)
    .then(() => playBeat(90, 300))
    .then(() => playBeat(69, 300))
    .then(() => playBeat(81, 300))
    .then(() => playBeat(83, 300))
    .then(() => playBeat(68, 300))
    .then(() => playBeat(87, 300))
    .then(() => playBeat(88, 300))
    .then(() => playBeat(67, 300))
    .then(() => console.log('Beat terminé !'));
}
const beatButton = document.createElement('button');
beatButton.textContent = 'Boîte à musique';
document.body.appendChild(beatButton);
beatButton.addEventListener('click', beatBox);