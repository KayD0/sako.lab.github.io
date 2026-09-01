const SYMBOLS = ['PC', 'CV', 'DIR', 'DOC', 'DEV', '@', 'WEB', 'SQL'];

export function initializeMemoryGame() {
  const game = document.querySelector('[data-memory-game]');
  if (!game) return;

  const board = game.querySelector('[data-memory-board]');
  const moveOutput = game.querySelector('[data-memory-moves]');
  const timeOutput = game.querySelector('[data-memory-time]');
  const status = game.querySelector('[data-memory-status]');
  const resetButton = game.querySelector('[data-memory-reset]');
  let cards = [];
  let firstCard = null;
  let locked = false;
  let moves = 0;
  let matches = 0;
  let elapsed = 0;
  let intervalId = null;
  let mismatchId = null;

  const stopTimer = () => {
    window.clearInterval(intervalId);
    intervalId = null;
  };

  const startTimer = () => {
    if (intervalId) return;
    intervalId = window.setInterval(() => {
      elapsed = Math.min(999, elapsed + 1);
      timeOutput.value = String(elapsed).padStart(3, '0');
      if (elapsed === 999) stopTimer();
    }, 1000);
  };

  const renderCard = (card) => {
    card.element.classList.toggle('revealed', card.revealed);
    card.element.classList.toggle('matched', card.matched);
    card.element.disabled = card.matched;
    const state = card.matched ? `matched ${card.symbol}` : card.revealed ? card.symbol : 'hidden';
    card.element.setAttribute('aria-label', `Card ${card.index + 1}, ${state}`);
  };

  const chooseCard = (card) => {
    if (locked || card.revealed || card.matched) return;
    startTimer();
    card.revealed = true;
    renderCard(card);
    if (!firstCard) {
      firstCard = card;
      status.textContent = 'Choose one more card.';
      return;
    }

    moves += 1;
    moveOutput.value = moves;
    if (firstCard.symbol === card.symbol) {
      firstCard.matched = true;
      card.matched = true;
      renderCard(firstCard);
      renderCard(card);
      firstCard = null;
      matches += 1;
      if (matches === SYMBOLS.length) {
        stopTimer();
        status.textContent = `Complete! ${moves} moves in ${elapsed} seconds.`;
        status.className = 'memory-status win';
      } else {
        status.textContent = `Match! ${SYMBOLS.length - matches} pairs remaining.`;
      }
      return;
    }

    locked = true;
    status.textContent = 'No match. Try again.';
    const previous = firstCard;
    firstCard = null;
    mismatchId = window.setTimeout(() => {
      previous.revealed = false;
      card.revealed = false;
      renderCard(previous);
      renderCard(card);
      locked = false;
      mismatchId = null;
    }, 750);
  };

  const shuffle = (values) => {
    for (let index = values.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [values[index], values[target]] = [values[target], values[index]];
    }
    return values;
  };

  const reset = () => {
    stopTimer();
    window.clearTimeout(mismatchId);
    mismatchId = null;
    firstCard = null;
    locked = false;
    moves = 0;
    matches = 0;
    elapsed = 0;
    moveOutput.value = '0';
    timeOutput.value = '000';
    status.textContent = 'Turn over two cards and find all matching pairs.';
    status.className = 'memory-status';
    board.replaceChildren();
    cards = shuffle([...SYMBOLS, ...SYMBOLS]).map((symbol, index) => {
      const element = document.createElement('button');
      const card = { element, index, symbol, revealed: false, matched: false };
      element.type = 'button';
      element.className = 'memory-card';
      element.dataset.symbol = symbol;
      element.setAttribute('role', 'gridcell');
      element.addEventListener('click', () => chooseCard(card));
      board.append(element);
      renderCard(card);
      return card;
    });
  };

  resetButton.addEventListener('click', reset);
  reset();
}
