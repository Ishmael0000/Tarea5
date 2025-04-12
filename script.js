const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const message = document.getElementById('message');

let score = 0;
let timeLeft = 60;
const trashCount = 10;

for (let i = 0; i < trashCount; i++) {
  const trash = document.createElement('div');
  trash.classList.add('trash');
  trash.style.left = `${Math.random() * 580}px`;
  trash.style.top = `${Math.random() * 380}px`;
  gameArea.appendChild(trash);
}

let x = 200, y = 200;
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') y -= 10;
  if (e.key === 'ArrowDown') y += 10;
  if (e.key === 'ArrowLeft') x -= 10;
  if (e.key === 'ArrowRight') x += 10;

  x = Math.max(0, Math.min(570, x));
  y = Math.max(0, Math.min(370, y));

  player.style.left = `${x}px`;
  player.style.top = `${y}px`;

  checkCollision();
});

function checkCollision() {
  const trashes = document.querySelectorAll('.trash');
  trashes.forEach(trash => {
    const tRect = trash.getBoundingClientRect();
    const pRect = player.getBoundingClientRect();
    const overlap = !(
      pRect.right < tRect.left ||
      pRect.left > tRect.right ||
      pRect.bottom < tRect.top ||
      pRect.top > tRect.bottom
    );
    if (overlap && !trash.classList.contains('collected')) {
      trash.classList.add('collected');
      trash.style.display = 'none';
      score++;
      scoreDisplay.textContent = `Basuritas recogidas: ${score} / ${trashCount}`;
      if (score === trashCount) {
        clearInterval(timer);
        message.textContent = '¡Felicidades! Pasaste al siguiente nivel 🥳';
      }
    }
  });
}

const timer = setInterval(() => {
  timeLeft--;
  timerDisplay.textContent = `Tiempo: ${timeLeft}s`;

  if (timeLeft <= 0) {
    clearInterval(timer);
    if (score < trashCount) {
      message.textContent = 'Tiempo agotado. Intenta de nuevo 😢';
    }
  }
}, 1000);