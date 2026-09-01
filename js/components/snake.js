const GRID_SIZE = 18;
const CELL_SIZE = 20;
const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export function initializeSnake() {
  const game = document.querySelector('[data-snake-game]');
  if (!game) return;

  const canvas = game.querySelector('[data-snake-canvas]');
  const context = canvas.getContext('2d');
  const scoreOutput = game.querySelector('[data-snake-score]');
  const lengthOutput = game.querySelector('[data-snake-length]');
  const bestOutput = game.querySelector('[data-snake-best]');
  const status = game.querySelector('[data-snake-status]');
  const resetButton = game.querySelector('[data-snake-reset]');
  let snake = [];
  let food = { x: 13, y: 9 };
  let direction = DIRECTIONS.right;
  let queuedDirection = DIRECTIONS.right;
  let score = 0;
  let best = Number(window.localStorage.getItem('snake-best') || 0);
  let running = false;
  let finished = false;
  let timerId = null;

  const isActive = () => game.closest('[data-game-view]')?.classList.contains('active');
  const formatScore = (value) => String(value).padStart(4, '0');

  const updateScoreboard = () => {
    scoreOutput.value = formatScore(score);
    lengthOutput.value = String(snake.length).padStart(2, '0');
    bestOutput.value = formatScore(best);
  };

  const placeFood = () => {
    const freeCells = [];
    for (let y = 0; y < GRID_SIZE; y += 1) {
      for (let x = 0; x < GRID_SIZE; x += 1) {
        if (!snake.some((segment) => segment.x === x && segment.y === y)) freeCells.push({ x, y });
      }
    }
    food = freeCells[Math.floor(Math.random() * freeCells.length)] || food;
  };

  const draw = () => {
    const background = context.createLinearGradient(0, 0, 0, canvas.height);
    background.addColorStop(0, '#071948');
    background.addColorStop(1, '#00111d');
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#2d86a522';
    context.lineWidth = 1;
    for (let index = 0; index <= GRID_SIZE; index += 1) {
      context.beginPath();
      context.moveTo(index * CELL_SIZE, 0);
      context.lineTo(index * CELL_SIZE, canvas.height);
      context.stroke();
      context.beginPath();
      context.moveTo(0, index * CELL_SIZE);
      context.lineTo(canvas.width, index * CELL_SIZE);
      context.stroke();
    }

    const pulse = 1 + Math.sin(performance.now() * 0.009) * 0.12;
    const foodX = food.x * CELL_SIZE + CELL_SIZE / 2;
    const foodY = food.y * CELL_SIZE + CELL_SIZE / 2;
    context.beginPath();
    context.arc(foodX, foodY, 6 * pulse, 0, Math.PI * 2);
    context.fillStyle = '#ff4f81';
    context.shadowColor = '#ff4f81';
    context.shadowBlur = 15;
    context.fill();
    context.shadowBlur = 0;
    context.fillStyle = '#fff8';
    context.beginPath();
    context.arc(foodX - 2, foodY - 2, 2, 0, Math.PI * 2);
    context.fill();

    snake.forEach((segment, index) => {
      const x = segment.x * CELL_SIZE + 2;
      const y = segment.y * CELL_SIZE + 2;
      const body = context.createLinearGradient(x, y, x + 16, y + 16);
      body.addColorStop(0, index === 0 ? '#d8fff0' : '#78ffab');
      body.addColorStop(0.45, index === 0 ? '#4fffea' : '#22cf72');
      body.addColorStop(1, '#08703c');
      context.fillStyle = body;
      context.shadowColor = '#42ff9b';
      context.shadowBlur = index === 0 ? 10 : 4;
      context.fillRect(x, y, 16, 16);
      context.shadowBlur = 0;
      context.strokeStyle = '#d8fff099';
      context.strokeRect(x + 0.5, y + 0.5, 15, 15);
    });

    if (finished) {
      context.fillStyle = '#000c';
      context.fillRect(45, 140, 270, 80);
      context.fillStyle = '#fff';
      context.font = 'bold 25px Arial';
      context.textAlign = 'center';
      context.fillText('GAME OVER', 180, 177);
      context.fillStyle = '#62ff72';
      context.font = '12px Courier New';
      context.fillText(`SCORE ${formatScore(score)}`, 180, 199);
    }
  };

  const scheduleTick = () => {
    window.clearTimeout(timerId);
    if (!running) return;
    const delay = Math.max(65, 145 - score * 1.5);
    timerId = window.setTimeout(tick, delay);
  };

  const finish = () => {
    running = false;
    finished = true;
    if (score > best) {
      best = score;
      window.localStorage.setItem('snake-best', String(best));
    }
    updateScoreboard();
    status.textContent = `Game over! Score: ${score}. Select New Game to retry.`;
    draw();
  };

  function tick() {
    if (!running) return;
    if (!isActive()) {
      scheduleTick();
      return;
    }
    direction = queuedDirection;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    const hitWall = head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;
    const ateFood = head.x === food.x && head.y === food.y;
    const bodyToCheck = ateFood ? snake : snake.slice(0, -1);
    const hitSelf = bodyToCheck.some((segment) => segment.x === head.x && segment.y === head.y);
    if (hitWall || hitSelf) {
      finish();
      return;
    }
    snake.unshift(head);
    if (ateFood) {
      score += 10;
      placeFood();
      status.textContent = `Nice! Speed level ${Math.min(9, Math.floor(score / 40) + 1)}.`;
    } else {
      snake.pop();
    }
    updateScoreboard();
    draw();
    scheduleTick();
  }

  const turn = (name) => {
    if (finished || !isActive()) return;
    const next = DIRECTIONS[name];
    if (next.x === -direction.x && next.y === -direction.y) return;
    queuedDirection = next;
    if (!running) {
      running = true;
      status.textContent = 'Collect the glowing data orbs. Do not hit the wall!';
      scheduleTick();
    }
  };

  const reset = () => {
    window.clearTimeout(timerId);
    snake = [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }];
    direction = DIRECTIONS.right;
    queuedDirection = DIRECTIONS.right;
    score = 0;
    running = false;
    finished = false;
    placeFood();
    status.textContent = 'Press an arrow key or direction button to start.';
    updateScoreboard();
    draw();
  };

  const keyDirections = {
    ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down',
    ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
  };
  document.addEventListener('keydown', (event) => {
    const next = keyDirections[event.code];
    if (!next || !isActive()) return;
    event.preventDefault();
    turn(next);
  });
  game.querySelectorAll('[data-snake-direction]').forEach((button) => {
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      turn(button.dataset.snakeDirection);
    });
  });
  resetButton.addEventListener('click', reset);
  reset();
}
