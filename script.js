const manager = document.getElementById('manager');
const jail = document.getElementById('jail');
const gameContainer = document.getElementById('game-container');
const playerScoreElement = document.getElementById('player-score');
const managerScoreElement = document.getElementById('manager-score');

let playerScore = 0;
let managerScore = 0;

// Function to move the manager
function moveManager() {
  const containerWidth = gameContainer.offsetWidth;
  const containerHeight = gameContainer.offsetHeight;

  const randomX = Math.random() * (containerWidth - manager.offsetWidth);
  const randomY = Math.random() * (containerHeight - manager.offsetHeight);

  manager.style.left = `${randomX}px`;
  manager.style.top = `${randomY}px`;
}

// Move the manager every 1000ms (slower)
setInterval(moveManager, 1000);

// Add dragstart and dragend event listeners to the manager
manager.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', 'manager');
  setTimeout(() => manager.style.display = 'none', 0);
});

manager.addEventListener('dragend', () => {
  manager.style.display = 'block';
});

// Add dragover and drop event listeners to the jail
jail.addEventListener('dragover', (e) => {
  e.preventDefault();
  jail.classList.add('jail-highlight');
});

jail.addEventListener('dragleave', () => {
  jail.classList.remove('jail-highlight');
});

jail.addEventListener('drop', (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  if (data === 'manager') {
    jail.classList.remove('jail-highlight');
    jail.innerHTML = '<p>Manager Jailed!</p>';
    jail.style.backgroundColor = '#ff4500';
    manager.style.display = 'none';

    // Update score
    playerScore++;
    updateScore();
    restartGame();
  }
});

// Handle clicking anywhere in the game container
gameContainer.addEventListener('click', (e) => {
  // If the click is not on the manager, player missed
  if (e.target !== manager) {
    managerScore++;
    updateScore();
    alert('You missed! Manager wins this round!');
    restartGame();
  }
});

// Update the score display
function updateScore() {
  playerScoreElement.textContent = playerScore;
  managerScoreElement.textContent = managerScore;
}

// Restart the game
function restartGame() {
  jail.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  jail.innerHTML = '<p>Jail</p>';
  manager.style.display = 'block';

  // Reset manager position
  moveManager();
}
