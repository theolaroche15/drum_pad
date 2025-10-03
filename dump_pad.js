function playSound(e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!key || !audio) return;
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  if (isRecording && e.keyCode !== 82 && e.keyCode !== 86) {
    recordedSequence.push({ keyCode: e.keyCode, time: Date.now() - startTime });
  }
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

window.addEventListener('keydown', playSound);
const keys = document.querySelectorAll(`.key`);
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

let isRecording = false;
let recordedSequence = [];
let startTime = 0;

window.addEventListener('keydown', (e) => {
  const key = e.keyCode;
  if (key === 82) {
    isRecording = !isRecording;
    const recordPad = document.querySelector(`.key[data-key="82"]`);
    if (recordPad) recordPad.classList.toggle('recording', isRecording);
    if (isRecording) {
      recordedSequence = [];
      startTime = Date.now();
      console.log("Enregistrement démarré");
    } else {
      console.log("Enregistrement terminé");
    }
    return; 
  }
  if (key === 86 && recordedSequence.length) {
    const playPad = document.querySelector(`.key[data-key="86"]`);
    if (playPad) {
      playPad.classList.add('playing');
      setTimeout(() => playPad.classList.remove('playing'), 300);
    }
    beatBox(recordedSequence);
    return;
  }
  if (key === 70) {
    recordedSequence = [];
    console.log("Séquence effacée");
    const resetPad = document.querySelector(`.key[data-key="70"]`);
    if (resetPad) {
      resetPad.classList.add('playing');
      setTimeout(() => resetPad.classList.remove('playing'), 300);
    }
    return;
  }
});

function beatBox(sequence) {
  if (!sequence.length) return;

  function simulateKey(keyCode) {
    window.dispatchEvent(new KeyboardEvent('keydown', {
      keyCode: keyCode,
      which: keyCode,
      bubbles: true
    }));
  }
  function playBeat(keyCode, delay) {
    return new Promise(resolve => setTimeout(() => {
        simulateKey(keyCode);
        resolve();
    }, delay));
  }
  let chain = Promise.resolve();
  sequence.forEach((event, i) => {
    const delay = i === 0 ? event.time : event.time - sequence[i - 1].time;
    chain = chain.then(() => playBeat(event.keyCode, delay));
  });
  chain.then(() => console.log("Séquence terminée"));
}
