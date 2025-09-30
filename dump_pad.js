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