let audioContext;
let oscillator;
let gainNode;
let isPlaying = false;

function toggleSound() {
  const button = document.getElementById('startStopButton');
  const frequencyInput = document.getElementById('frequency');
  const volumeInput = document.getElementById('volume');

  if (!isPlaying) {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    frequencyInput.addEventListener('input', updateSound);
    volumeInput.addEventListener('input', updateSound);

    updateSound();
    oscillator.start();
    button.textContent = 'STOP';
    isPlaying = true;
  } else {
    oscillator.stop();
    button.textContent = 'START';
    isPlaying = false;
  }
}

function updateSound() {
  const frequency = document.getElementById('frequency').value;
  const volume = document.getElementById('volume').value / 100;

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
}
