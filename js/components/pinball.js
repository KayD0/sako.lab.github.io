const WIDTH = 400;
const HEIGHT = 500;
const BALL_RADIUS = 8;
const PLAYFIELD_RIGHT = 342;
const LAUNCH_LANE_LEFT = PLAYFIELD_RIGHT;
const LAUNCH_LANE_RIGHT = 382;
const BUMPERS = [
  { x: 70, y: 130, radius: 12, color: '#ffcc00', points: 50, pulse: 0 },
  { x: 175, y: 118, radius: 13, color: '#4fffea', points: 75, pulse: 0 },
  { x: 280, y: 130, radius: 12, color: '#ff4f81', points: 50, pulse: 0 },
  { x: 115, y: 205, radius: 13, color: '#8d74ff', points: 100, pulse: 0 },
  { x: 235, y: 205, radius: 13, color: '#ff8f3f', points: 100, pulse: 0 },
  { x: 115, y: 278, radius: 12, color: '#ff4fbd', points: 75, pulse: 0 },
  { x: 235, y: 278, radius: 12, color: '#62ff72', points: 75, pulse: 0 },
];
const STARS = Array.from({ length: 54 }, (_, index) => ({
  x: 24 + ((index * 83) % 306),
  y: 82 + ((index * 137) % 330),
  size: 0.5 + (index % 4) * 0.35,
  speed: 0.35 + (index % 5) * 0.12,
  phase: index * 0.73,
}));
const RANKS = ['CADET', 'PILOT', 'CAPTAIN', 'COMMANDER'];
const RANK_THRESHOLDS = [0, 1000, 3000, 6000];
const SLINGSHOTS = [
  { side: 'left', start: { x: 22, y: 350 }, end: { x: 120, y: 425 }, cooldown: 0 },
  { side: 'right', start: { x: 338, y: 350 }, end: { x: 240, y: 425 }, cooldown: 0 },
];

export function initializePinball() {
  const game = document.querySelector('[data-pinball-game]');
  if (!game) return;

  const canvas = game.querySelector('[data-pinball-canvas]');
  const context = canvas.getContext('2d');
  const scoreOutput = game.querySelector('[data-pinball-score]');
  const ballsOutput = game.querySelector('[data-pinball-balls]');
  const bestOutput = game.querySelector('[data-pinball-best]');
  const rankOutput = game.querySelector('[data-pinball-rank]');
  const multiplierOutput = game.querySelector('[data-pinball-multiplier]');
  const status = game.querySelector('[data-pinball-status]');
  const launchButton = game.querySelector('[data-pinball-launch]');
  const leftButton = game.querySelector('[data-pinball-left]');
  const rightButton = game.querySelector('[data-pinball-right]');
  const resetButton = game.querySelector('[data-pinball-reset]');
  const keys = { left: false, right: false };
  const ball = { x: 366, y: 446, vx: 0, vy: 0, ready: true };
  let score = 0;
  let balls = 3;
  let running = false;
  let animationId = null;
  let best = Number(window.localStorage.getItem('pinball-best') || 0);
  let rank = 0;
  let multiplier = 1;
  let audioContext = null;
  let launchGateClosed = false;
  let launchGateArmed = false;

  const formatScore = (value) => String(value).padStart(6, '0');

  const updateScoreboard = () => {
    scoreOutput.value = formatScore(score);
    ballsOutput.value = balls;
    bestOutput.value = formatScore(best);
    rankOutput.value = RANKS[rank];
    multiplierOutput.value = `x${multiplier}`;
  };

  const tone = (frequency, duration = 0.06) => {
    try {
      audioContext ||= new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.frequency.value = frequency;
      oscillator.type = 'square';
      gain.gain.setValueAtTime(0.035, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch { /* Sound is optional when the browser blocks audio. */ }
  };

  const addScore = (points) => {
    score += points * multiplier;
    const nextRank = RANK_THRESHOLDS.reduce(
      (current, threshold, index) => (score >= threshold ? index : current),
      0,
    );
    if (nextRank > rank) {
      rank = nextRank;
      multiplier = Math.min(4, rank + 1);
      status.textContent = `Rank up: ${RANKS[rank]} / multiplier x${multiplier}`;
      tone(980, 0.18);
    }
    updateScoreboard();
  };

  const flipper = (side) => {
    const left = side === 'left';
    const active = keys[side];
    const base = { x: left ? 120 : 240, y: 425 };
    const angle = left ? (active ? -0.48 : 0.32) : Math.PI - (active ? -0.48 : 0.32);
    return { base, end: { x: base.x + Math.cos(angle) * 45, y: base.y + Math.sin(angle) * 45 }, active };
  };

  const collideSegment = ({ base, end, active }) => {
    const dx = end.x - base.x;
    const dy = end.y - base.y;
    const lengthSquared = dx * dx + dy * dy;
    const amount = Math.max(0, Math.min(1, ((ball.x - base.x) * dx + (ball.y - base.y) * dy) / lengthSquared));
    const closestX = base.x + amount * dx;
    const closestY = base.y + amount * dy;
    let nx = ball.x - closestX;
    let ny = ball.y - closestY;
    const distance = Math.hypot(nx, ny);
    if (distance >= BALL_RADIUS + 7 || distance === 0 || ball.vy < -7) return;
    nx /= distance;
    ny /= distance;
    const overlap = BALL_RADIUS + 7 - distance;
    ball.x += nx * overlap;
    ball.y += ny * overlap;
    const velocity = ball.vx * nx + ball.vy * ny;
    if (velocity < 0) {
      ball.vx -= 1.8 * velocity * nx;
      ball.vy -= 1.8 * velocity * ny;
    }
    ball.vy -= active ? 5.4 : 1.5;
    ball.vx += (closestX < PLAYFIELD_RIGHT / 2 ? 1 : -1) * (active ? 1.8 : 0.5);
  };

  const collideBumper = (bumper) => {
    let dx = ball.x - bumper.x;
    let dy = ball.y - bumper.y;
    const distance = Math.hypot(dx, dy);
    const minimum = BALL_RADIUS + bumper.radius;
    if (distance >= minimum || distance === 0) return;
    dx /= distance;
    dy /= distance;
    ball.x = bumper.x + dx * minimum;
    ball.y = bumper.y + dy * minimum;
    const speed = Math.max(6.5, Math.hypot(ball.vx, ball.vy));
    ball.vx = dx * speed * 1.12;
    ball.vy = dy * speed * 1.12;
    bumper.pulse = 1;
    addScore(bumper.points);
    tone(360 + bumper.points);
  };

  const collideSling = (sling) => {
    if (sling.cooldown > 0) return;
    const { start, end } = sling;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const amount = Math.max(0, Math.min(1, ((ball.x - start.x) * dx + (ball.y - start.y) * dy) / (dx * dx + dy * dy)));
    const closestX = start.x + amount * dx;
    const closestY = start.y + amount * dy;
    const distance = Math.hypot(ball.x - closestX, ball.y - closestY);
    if (distance >= BALL_RADIUS + 7) return;
    const length = Math.hypot(dx, dy);
    let nx = -dy / length;
    let ny = dx / length;
    if (ny > 0) { nx *= -1; ny *= -1; }
    ball.x = closestX + nx * (BALL_RADIUS + 7);
    ball.y = closestY + ny * (BALL_RADIUS + 7);
    ball.vy = -Math.max(6.5, Math.abs(ball.vy) * 1.15);
    ball.vx += sling.side === 'left' ? 2.4 : -2.4;
    sling.cooldown = 6;
    addScore(75);
    tone(540);
  };

  const prepareBall = () => {
    ball.x = 366;
    ball.y = 446;
    ball.vx = 0;
    ball.vy = 0;
    ball.ready = true;
    launchGateClosed = false;
    launchGateArmed = false;
    running = false;
    launchButton.disabled = false;
    status.textContent = balls > 0 ? 'Press Space or Launch to start.' : 'Game over. Select New Game.';
    draw();
  };

  const loseBall = () => {
    balls -= 1;
    if (score > best) {
      best = score;
      window.localStorage.setItem('pinball-best', String(best));
    }
    updateScoreboard();
    if (balls <= 0) {
      ball.ready = false;
      running = false;
      launchButton.disabled = true;
      status.textContent = `Game over! Score: ${score}`;
      draw();
      return;
    }
    prepareBall();
  };

  const update = () => {
    BUMPERS.forEach((bumper) => { bumper.pulse = Math.max(0, bumper.pulse - 0.035); });
    SLINGSHOTS.forEach((sling) => { sling.cooldown = Math.max(0, sling.cooldown - 1); });
    const damping = Math.pow(0.998, 1 / 3);
    for (let step = 0; step < 3; step += 1) {
      ball.vy += 0.17 / 3;
      ball.vx *= damping;
      ball.vy *= damping;
      ball.x += ball.vx / 3;
      ball.y += ball.vy / 3;
      if (ball.x < 18 + BALL_RADIUS) { ball.x = 18 + BALL_RADIUS; ball.vx = Math.abs(ball.vx) * 0.88; }
      if (ball.x > LAUNCH_LANE_RIGHT - BALL_RADIUS) { ball.x = LAUNCH_LANE_RIGHT - BALL_RADIUS; ball.vx = -Math.abs(ball.vx) * 0.88; }
      if (ball.y < 18 + BALL_RADIUS) { ball.y = 18 + BALL_RADIUS; ball.vy = Math.abs(ball.vy) * 0.88; }
      if (ball.x > PLAYFIELD_RIGHT - BALL_RADIUS && ball.x < LAUNCH_LANE_LEFT + BALL_RADIUS && ball.y > 92) {
        ball.x = ball.vx < 0 ? LAUNCH_LANE_LEFT + BALL_RADIUS : PLAYFIELD_RIGHT - BALL_RADIUS;
        ball.vx *= -0.85;
      }
      if (!launchGateClosed && !launchGateArmed && !ball.ready && ball.x > PLAYFIELD_RIGHT && ball.y < 78) {
        launchGateArmed = true;
        ball.vx = -Math.max(4.2, Math.abs(ball.vx));
        status.textContent = 'Entering playfield...';
        tone(820, 0.1);
      }
      if (launchGateArmed && ball.x <= PLAYFIELD_RIGHT - BALL_RADIUS) {
        launchGateArmed = false;
        launchGateClosed = true;
        status.textContent = 'Launch wall closed. Mission active!';
        tone(980, 0.12);
      }
      if (launchGateClosed && ball.x > PLAYFIELD_RIGHT - BALL_RADIUS && ball.x < PLAYFIELD_RIGHT + BALL_RADIUS && ball.y < 104) {
        ball.x = PLAYFIELD_RIGHT - BALL_RADIUS;
        ball.vx = -Math.max(2.5, Math.abs(ball.vx) * 0.8);
      }
      if (ball.x > PLAYFIELD_RIGHT && ball.y < 88) ball.vx -= 0.22 / 3;
      BUMPERS.forEach(collideBumper);
      SLINGSHOTS.forEach(collideSling);
      collideSegment(flipper('left'));
      collideSegment(flipper('right'));
      if (ball.y > HEIGHT + 20) {
        loseBall();
        break;
      }
    }
  };

  const drawLine = (start, end, width, color) => {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.lineWidth = width;
    context.strokeStyle = color;
    context.lineCap = 'round';
    context.stroke();
  };

  const drawJoint = (point, radius = 8) => {
    const metal = context.createRadialGradient(point.x - 3, point.y - 3, 1, point.x, point.y, radius);
    metal.addColorStop(0, '#ffffff');
    metal.addColorStop(0.32, '#b9d9e8');
    metal.addColorStop(0.68, '#596d86');
    metal.addColorStop(1, '#18233d');
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    context.fillStyle = metal;
    context.fill();
    context.strokeStyle = '#d9f7ff';
    context.lineWidth = 1.5;
    context.stroke();
    context.beginPath();
    context.arc(point.x - 2, point.y - 2, 2, 0, Math.PI * 2);
    context.fillStyle = '#fff';
    context.fill();
  };

  const drawSling = (sling) => {
    const rubber = context.createLinearGradient(sling.start.x, sling.start.y, sling.end.x, sling.end.y);
    rubber.addColorStop(0, '#ff9bc4');
    rubber.addColorStop(0.28, '#ff3f82');
    rubber.addColorStop(0.72, '#b70f58');
    rubber.addColorStop(1, '#671047');
    context.save();
    context.shadowColor = '#ff2f78';
    context.shadowBlur = sling.cooldown > 0 ? 16 : 7;
    drawLine(sling.start, sling.end, 17, '#35133d');
    drawLine(sling.start, sling.end, 12, rubber);
    context.shadowBlur = 0;
    drawLine(
      { x: sling.start.x, y: sling.start.y - 2 },
      { x: sling.end.x, y: sling.end.y - 2 },
      3,
      '#ffd3e6aa',
    );
    drawJoint(sling.start, 7);
    drawJoint(sling.end, 7);
    context.restore();
  };

  const drawFlipper = (item) => {
    const body = context.createLinearGradient(item.base.x, item.base.y - 10, item.base.x, item.base.y + 10);
    body.addColorStop(0, '#f2b5ff');
    body.addColorStop(0.24, '#bd5cdb');
    body.addColorStop(0.62, '#6f248f');
    body.addColorStop(1, '#30134f');
    context.save();
    context.shadowColor = '#000';
    context.shadowBlur = 7;
    context.shadowOffsetY = 4;
    drawLine(item.base, item.end, 20, '#241039');
    context.shadowBlur = 0;
    context.shadowOffsetY = 0;
    drawLine(item.base, item.end, 16, body);
    drawLine(
      { x: item.base.x, y: item.base.y - 3 },
      { x: item.end.x, y: item.end.y - 3 },
      3,
      '#fbdcffbb',
    );
    drawJoint(item.base, 9);
    context.restore();
  };

  const drawSpace = (time) => {
    const drift = time * 0.018;
    const nebulaX = 175 + Math.sin(time * 0.00045) * 65;
    const nebulaY = 235 + Math.cos(time * 0.00038) * 90;
    const nebula = context.createRadialGradient(nebulaX, nebulaY, 5, nebulaX, nebulaY, 175);
    nebula.addColorStop(0, '#742da744');
    nebula.addColorStop(0.38, '#174fd32d');
    nebula.addColorStop(0.72, '#00d8ff12');
    nebula.addColorStop(1, '#0000');
    context.fillStyle = nebula;
    context.fillRect(16, 16, PLAYFIELD_RIGHT - 16, HEIGHT - 24);

    STARS.forEach((star) => {
      const y = 78 + ((star.y - 78 + drift * star.speed) % 345);
      const flicker = 0.35 + (Math.sin(time * 0.004 + star.phase) + 1) * 0.3;
      context.beginPath();
      context.arc(star.x, y, star.size, 0, Math.PI * 2);
      context.fillStyle = `rgba(185, 235, 255, ${flicker})`;
      context.fill();
      if (star.size > 1.2) {
        context.fillStyle = `rgba(98, 255, 232, ${flicker * 0.3})`;
        context.fillRect(star.x - 4, y, 8, 0.7);
      }
    });

    const scanY = 80 + ((time * 0.055) % 335);
    const scan = context.createLinearGradient(0, scanY - 16, 0, scanY + 16);
    scan.addColorStop(0, '#4fffea00');
    scan.addColorStop(0.5, '#4fffea18');
    scan.addColorStop(1, '#4fffea00');
    context.fillStyle = scan;
    context.fillRect(18, scanY - 16, PLAYFIELD_RIGHT - 36, 32);
  };

  const drawFrame = (time) => {
    const glow = 10 + Math.sin(time * 0.003) * 4;
    const frame = context.createLinearGradient(16, 16, PLAYFIELD_RIGHT, HEIGHT);
    frame.addColorStop(0, '#c8ffff');
    frame.addColorStop(0.28, '#42fff2');
    frame.addColorStop(0.62, '#4ba7ff');
    frame.addColorStop(1, '#934dff');
    context.save();
    context.strokeStyle = frame;
    context.lineWidth = 5;
    context.shadowColor = '#32fff0';
    context.shadowBlur = glow;
    context.beginPath();
    context.moveTo(16, HEIGHT - 8);
    context.lineTo(16, 16);
    context.lineTo(PLAYFIELD_RIGHT, 16);
    context.moveTo(PLAYFIELD_RIGHT, 96);
    context.lineTo(PLAYFIELD_RIGHT, HEIGHT - 8);
    context.lineTo(16, HEIGHT - 8);
    context.stroke();
    context.beginPath();
    context.moveTo(PLAYFIELD_RIGHT, HEIGHT - 8);
    context.lineTo(LAUNCH_LANE_RIGHT, HEIGHT - 8);
    context.lineTo(LAUNCH_LANE_RIGHT, 92);
    context.quadraticCurveTo(LAUNCH_LANE_RIGHT, 16, PLAYFIELD_RIGHT, 16);
    context.stroke();
    context.shadowBlur = 0;
    context.strokeStyle = '#eaffff99';
    context.lineWidth = 1;
    context.strokeRect(20, 20, PLAYFIELD_RIGHT - 24, HEIGHT - 32);
    context.restore();
  };

  const drawBumper = (bumper, time) => {
    const pulse = bumper.pulse;
    const radius = bumper.radius + pulse * 3;
    const halo = context.createRadialGradient(bumper.x, bumper.y, radius * 0.5, bumper.x, bumper.y, radius + 14 + pulse * 10);
    halo.addColorStop(0, `${bumper.color}66`);
    halo.addColorStop(1, `${bumper.color}00`);
    context.beginPath();
    context.arc(bumper.x, bumper.y, radius + 16 + pulse * 8, 0, Math.PI * 2);
    context.fillStyle = halo;
    context.fill();

    const metal = context.createRadialGradient(bumper.x - 7, bumper.y - 8, 2, bumper.x, bumper.y, radius + 5);
    metal.addColorStop(0, '#fff');
    metal.addColorStop(0.25, '#bfd5e2');
    metal.addColorStop(0.58, '#526679');
    metal.addColorStop(0.8, '#eefaff');
    metal.addColorStop(1, '#1a263b');
    context.beginPath();
    context.arc(bumper.x, bumper.y, radius + 5, 0, Math.PI * 2);
    context.fillStyle = metal;
    context.fill();

    const glass = context.createRadialGradient(bumper.x - 6, bumper.y - 7, 1, bumper.x, bumper.y, radius);
    glass.addColorStop(0, '#ffffff');
    glass.addColorStop(0.18, bumper.color);
    glass.addColorStop(0.72, bumper.color);
    glass.addColorStop(1, '#101839');
    context.beginPath();
    context.arc(bumper.x, bumper.y, radius, 0, Math.PI * 2);
    context.fillStyle = glass;
    context.shadowColor = bumper.color;
    context.shadowBlur = 10 + pulse * 18 + Math.sin(time * 0.004) * 2;
    context.fill();
    context.shadowBlur = 0;
    context.strokeStyle = '#ffffffcc';
    context.lineWidth = 1.5;
    context.stroke();
    context.fillStyle = '#071139';
    context.font = `bold ${bumper.radius < 13 ? 8 : 9}px Arial`;
    context.fillText(bumper.points, bumper.x, bumper.y + 4);
  };

  const drawBall = () => {
    if (running) {
      for (let index = 3; index > 0; index -= 1) {
        context.beginPath();
        context.arc(ball.x - ball.vx * index * 0.65, ball.y - ball.vy * index * 0.65, BALL_RADIUS * (1 - index * 0.16), 0, Math.PI * 2);
        context.fillStyle = `rgba(105, 226, 255, ${0.16 / index})`;
        context.fill();
      }
    }
    const chrome = context.createRadialGradient(ball.x - 3, ball.y - 4, 1, ball.x, ball.y, BALL_RADIUS);
    chrome.addColorStop(0, '#ffffff');
    chrome.addColorStop(0.25, '#e8fbff');
    chrome.addColorStop(0.52, '#7f9cac');
    chrome.addColorStop(0.76, '#f7ffff');
    chrome.addColorStop(1, '#26394b');
    context.beginPath();
    context.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
    context.fillStyle = chrome;
    context.shadowColor = '#a8f4ff';
    context.shadowBlur = 10;
    context.fill();
    context.shadowBlur = 0;
    context.strokeStyle = '#fff';
    context.lineWidth = 1;
    context.stroke();
  };

  function draw() {
    const time = performance.now();
    const gradient = context.createLinearGradient(0, 0, 0, HEIGHT);
    gradient.addColorStop(0, '#07124b');
    gradient.addColorStop(0.5, '#041332');
    gradient.addColorStop(1, '#000b1c');
    context.fillStyle = gradient;
    context.fillRect(0, 0, WIDTH, HEIGHT);
    drawSpace(time);
    drawFrame(time);
    context.fillStyle = '#ffffff18';
    for (let y = 35; y < 410; y += 35) context.fillRect(28, y, PLAYFIELD_RIGHT - 44, 1);
    context.fillStyle = '#fff';
    context.font = 'bold 18px Arial';
    context.textAlign = 'center';
    context.fillText('SAKO SPACE PINBALL', PLAYFIELD_RIGHT / 2 + 8, 50);
    context.fillStyle = '#7dff9b';
    context.font = 'bold 10px Courier New';
    context.fillText(`MISSION: BUILD SCORE   RANK ${RANKS[rank]}`, PLAYFIELD_RIGHT / 2 + 8, 68);
    BUMPERS.forEach((bumper) => drawBumper(bumper, time));
    if (launchGateClosed) {
      const lockedWall = context.createLinearGradient(PLAYFIELD_RIGHT - 3, 16, PLAYFIELD_RIGHT + 3, 96);
      lockedWall.addColorStop(0, '#eaffff');
      lockedWall.addColorStop(0.35, '#4fffea');
      lockedWall.addColorStop(0.7, '#4ba7ff');
      lockedWall.addColorStop(1, '#934dff');
      context.save();
      context.shadowColor = '#4fffea';
      context.shadowBlur = 12;
      drawLine({ x: PLAYFIELD_RIGHT, y: 16 }, { x: PLAYFIELD_RIGHT, y: 98 }, 6, lockedWall);
      context.restore();
    }
    context.fillStyle = '#90b7ff';
    context.font = 'bold 9px Arial';
    context.save();
    context.translate(366, 405);
    context.rotate(-Math.PI / 2);
    context.fillText('LAUNCH', 0, 0);
    context.restore();
    SLINGSHOTS.forEach(drawSling);
    const left = flipper('left');
    const right = flipper('right');
    drawFlipper(left);
    drawFlipper(right);
    drawBall();
    if (!running && balls <= 0) {
      context.fillStyle = '#000b';
      context.fillRect(55, 205, 250, 70);
      context.fillStyle = '#fff';
      context.font = 'bold 24px Arial';
      context.fillText('GAME OVER', PLAYFIELD_RIGHT / 2 + 8, 246);
    }
  }

  const frame = () => {
    if (running) update();
    draw();
    animationId = window.requestAnimationFrame(frame);
  };

  const launch = () => {
    if (!ball.ready || balls <= 0) return;
    ball.ready = false;
    ball.vx = -0.4;
    ball.vy = -11.8;
    running = true;
    launchButton.disabled = true;
    status.textContent = 'Use Left/Right or A/D to flip.';
    tone(240, 0.12);
  };

  const setFlipper = (side, pressed) => {
    keys[side] = pressed;
    (side === 'left' ? leftButton : rightButton).classList.toggle('pressed', pressed);
    if (pressed) tone(130, 0.035);
  };

  const bindPress = (button, side) => {
    button.addEventListener('pointerdown', (event) => { event.preventDefault(); setFlipper(side, true); });
    button.addEventListener('pointerup', () => setFlipper(side, false));
    button.addEventListener('pointercancel', () => setFlipper(side, false));
    button.addEventListener('pointerleave', () => setFlipper(side, false));
  };

  const reset = () => {
    score = 0;
    balls = 3;
    rank = 0;
    multiplier = 1;
    SLINGSHOTS.forEach((sling) => { sling.cooldown = 0; });
    launchGateClosed = false;
    launchGateArmed = false;
    updateScoreboard();
    prepareBall();
  };

  document.addEventListener('keydown', (event) => {
    if (!game.closest('.game-stage')?.classList.contains('active')) return;
    if (['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD', 'Space'].includes(event.code)) event.preventDefault();
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') setFlipper('left', true);
    if (event.code === 'ArrowRight' || event.code === 'KeyD') setFlipper('right', true);
    if (event.code === 'Space') launch();
  });
  document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft' || event.code === 'KeyA') setFlipper('left', false);
    if (event.code === 'ArrowRight' || event.code === 'KeyD') setFlipper('right', false);
  });
  bindPress(leftButton, 'left');
  bindPress(rightButton, 'right');
  launchButton.addEventListener('click', launch);
  resetButton.addEventListener('click', reset);
  updateScoreboard();
  prepareBall();
  animationId = window.requestAnimationFrame(frame);
  window.addEventListener('pagehide', () => window.cancelAnimationFrame(animationId), { once: true });
}
