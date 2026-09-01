const SIZE = 9;
const MINE_TOTAL = 10;

export function initializeMinesweeper() {
  const game = document.querySelector('[data-minesweeper]');
  if (!game) return;

  const boardElement = game.querySelector('[data-mine-board]');
  const counter = game.querySelector('[data-mine-count]');
  const timer = game.querySelector('[data-mine-timer]');
  const resetButton = game.querySelector('[data-mine-reset]');
  const status = game.querySelector('[data-mine-status]');
  let cells = [];
  let started = false;
  let finished = false;
  let elapsed = 0;
  let intervalId = null;

  const neighborsOf = (index) => {
    const row = Math.floor(index / SIZE);
    const column = index % SIZE;
    const neighbors = [];
    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
        const nextRow = row + rowOffset;
        const nextColumn = column + columnOffset;
        if ((rowOffset || columnOffset) && nextRow >= 0 && nextRow < SIZE && nextColumn >= 0 && nextColumn < SIZE) {
          neighbors.push(nextRow * SIZE + nextColumn);
        }
      }
    }
    return neighbors;
  };

  const updateCounter = () => {
    const flags = cells.filter((cell) => cell.flagged).length;
    counter.value = String(Math.max(0, MINE_TOTAL - flags)).padStart(3, '0');
  };

  const renderCell = (cell) => {
    cell.element.className = 'mine-cell';
    cell.element.textContent = '';
    cell.element.removeAttribute('data-nearby');
    cell.element.setAttribute('aria-label', `Row ${cell.row + 1}, column ${cell.column + 1}, hidden`);
    if (cell.flagged && !cell.open) {
      cell.element.classList.add('flagged');
      cell.element.textContent = '⚑';
      cell.element.setAttribute('aria-label', `Row ${cell.row + 1}, column ${cell.column + 1}, flagged`);
    }
    if (cell.open) {
      cell.element.classList.add('open');
      cell.element.disabled = true;
      if (cell.mine) {
        cell.element.classList.add('mine');
        cell.element.textContent = '✹';
        cell.element.setAttribute('aria-label', `Row ${cell.row + 1}, column ${cell.column + 1}, mine`);
      } else if (cell.nearby) {
        cell.element.dataset.nearby = cell.nearby;
        cell.element.textContent = cell.nearby;
        cell.element.setAttribute('aria-label', `Row ${cell.row + 1}, column ${cell.column + 1}, ${cell.nearby} nearby mines`);
      } else {
        cell.element.setAttribute('aria-label', `Row ${cell.row + 1}, column ${cell.column + 1}, empty`);
      }
    }
  };

  const placeMines = (safeIndex) => {
    const excluded = new Set([safeIndex, ...neighborsOf(safeIndex)]);
    const candidates = cells.map((_, index) => index).filter((index) => !excluded.has(index));
    for (let placed = 0; placed < MINE_TOTAL; placed += 1) {
      const selection = Math.floor(Math.random() * candidates.length);
      cells[candidates.splice(selection, 1)[0]].mine = true;
    }
    cells.forEach((cell, index) => {
      cell.nearby = neighborsOf(index).filter((neighbor) => cells[neighbor].mine).length;
    });
  };

  const stopTimer = () => {
    window.clearInterval(intervalId);
    intervalId = null;
  };

  const startTimer = () => {
    intervalId = window.setInterval(() => {
      elapsed = Math.min(999, elapsed + 1);
      timer.value = String(elapsed).padStart(3, '0');
      if (elapsed === 999) stopTimer();
    }, 1000);
  };

  const finish = (won) => {
    finished = true;
    stopTimer();
    resetButton.textContent = won ? 'B)' : ':(';
    status.textContent = won ? `You cleared the board in ${elapsed} seconds!` : 'Boom! Select the face to try again.';
    status.className = `mine-status ${won ? 'win' : 'lose'}`;
    cells.forEach((cell) => {
      if (!won && cell.mine) cell.open = true;
      if (won && cell.mine) cell.flagged = true;
      cell.element.disabled = true;
      renderCell(cell);
    });
    updateCounter();
  };

  const reveal = (index) => {
    const cell = cells[index];
    if (finished || cell.open || cell.flagged) return;
    if (!started) {
      started = true;
      placeMines(index);
      startTimer();
      status.textContent = 'Game in progress...';
    }
    if (cell.mine) {
      cell.open = true;
      finish(false);
      return;
    }
    const queue = [index];
    while (queue.length) {
      const currentIndex = queue.shift();
      const current = cells[currentIndex];
      if (current.open || current.flagged || current.mine) continue;
      current.open = true;
      renderCell(current);
      if (current.nearby === 0) {
        neighborsOf(currentIndex).forEach((neighbor) => {
          if (!cells[neighbor].open) queue.push(neighbor);
        });
      }
    }
    if (cells.filter((item) => item.open && !item.mine).length === SIZE * SIZE - MINE_TOTAL) finish(true);
  };

  const toggleFlag = (index) => {
    const cell = cells[index];
    if (finished || cell.open) return;
    const flagCount = cells.filter((item) => item.flagged).length;
    if (!cell.flagged && flagCount >= MINE_TOTAL) return;
    cell.flagged = !cell.flagged;
    renderCell(cell);
    updateCounter();
  };

  const reset = () => {
    stopTimer();
    started = false;
    finished = false;
    elapsed = 0;
    timer.value = '000';
    counter.value = String(MINE_TOTAL).padStart(3, '0');
    resetButton.textContent = ':)';
    status.textContent = 'Open every safe square. Right-click to place a flag.';
    status.className = 'mine-status';
    boardElement.replaceChildren();
    cells = Array.from({ length: SIZE * SIZE }, (_, index) => {
      const element = document.createElement('button');
      const cell = { element, row: Math.floor(index / SIZE), column: index % SIZE, mine: false, nearby: 0, open: false, flagged: false };
      element.type = 'button';
      element.className = 'mine-cell';
      element.setAttribute('role', 'gridcell');
      element.addEventListener('click', () => reveal(index));
      element.addEventListener('contextmenu', (event) => { event.preventDefault(); toggleFlag(index); });
      boardElement.append(element);
      renderCell(cell);
      return cell;
    });
  };

  resetButton.addEventListener('click', reset);
  reset();
}

export function initializeGameLibrary() {
  const library = document.querySelector('[data-game-library]');
  if (!library) return;

  const choices = [...library.querySelectorAll('[data-game-choice]')];
  const views = [...library.querySelectorAll('[data-game-view]')];
  choices.forEach((choice) => choice.addEventListener('click', () => {
    const game = choice.dataset.gameChoice;
    choices.forEach((item) => {
      const selected = item === choice;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    views.forEach((view) => view.classList.toggle('active', view.dataset.gameView === game));
  }));
}
