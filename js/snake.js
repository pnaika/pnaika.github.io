(function () {
  'use strict';

  // ─── Konami code detector ──────────────────────────────────────────────────
  var KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  var konamiIdx = 0;

  // ─── DOM refs ──────────────────────────────────────────────────────────────
  var overlay, canvas, ctx, scoreEl, hiEl, msgEl, msgScore;

  // ─── Game state ────────────────────────────────────────────────────────────
  var CELL = 20;
  var COLS, ROWS;
  var snake, dir, nextDir, food, score, hiScore, ticker, alive;

  // Touch tracking
  var touchX0, touchY0;

  // ─── Init ──────────────────────────────────────────────────────────────────
  function init() {
    overlay  = document.getElementById('snake-overlay');
    canvas   = document.getElementById('snake-canvas');
    ctx      = canvas.getContext('2d');
    scoreEl  = document.getElementById('snake-score');
    hiEl     = document.getElementById('snake-hi');
    msgEl    = document.getElementById('snake-msg');
    msgScore = document.getElementById('snake-msg-score');
    if (!overlay || !canvas) return;

    hiScore = parseInt(localStorage.getItem('pn_snake_hi') || '0', 10);
    hiEl.textContent = hiScore;

    document.getElementById('snake-close').addEventListener('click', closeSnake);
    document.getElementById('snake-restart').addEventListener('click', startGame);

    // Swipe support
    canvas.addEventListener('touchstart', function (e) {
      touchX0 = e.touches[0].clientX;
      touchY0 = e.touches[0].clientY;
    }, { passive: true });

    canvas.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchX0;
      var dy = e.changedTouches[0].clientY - touchY0;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        setDir(dx > 0 ? {x:1,y:0} : {x:-1,y:0});
      } else {
        setDir(dy > 0 ? {x:0,y:1} : {x:0,y:-1});
      }
    }, { passive: true });
  }

  // ─── Open / close ──────────────────────────────────────────────────────────
  function openSnake() {
    if (!overlay) return;
    resizeCanvas();
    overlay.classList.add('is-open');
    startGame();
    if (window.Achievement) window.Achievement.unlock('snake');
  }

  function closeSnake() {
    if (ticker) clearInterval(ticker);
    overlay.classList.remove('is-open');
  }

  function resizeCanvas() {
    var maxW = Math.min(window.innerWidth  - 48, 500);
    var maxH = Math.min(window.innerHeight - 180, 500);
    COLS = Math.floor(maxW / CELL);
    ROWS = Math.floor(maxH / CELL);
    canvas.width  = COLS * CELL;
    canvas.height = ROWS * CELL;
  }

  // ─── Game lifecycle ────────────────────────────────────────────────────────
  function startGame() {
    if (ticker) clearInterval(ticker);
    msgEl.classList.remove('visible');

    var cx = Math.floor(COLS / 2);
    var cy = Math.floor(ROWS / 2);
    snake   = [{x:cx,y:cy},{x:cx-1,y:cy},{x:cx-2,y:cy}];
    dir     = {x:1, y:0};
    nextDir = {x:1, y:0};
    score   = 0;
    alive   = true;

    scoreEl.textContent = score;
    placeFood();
    ticker = setInterval(tick, 140);
  }

  function tick() {
    if (!alive) return;
    dir = nextDir;

    var head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};

    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      return gameOver();
    }
    for (var i = 0; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) return gameOver();
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreEl.textContent = score;
      if (score > hiScore) {
        hiScore = score;
        hiEl.textContent = hiScore;
        localStorage.setItem('pn_snake_hi', hiScore);
      }
      if (window.Achievement && score >= 10) window.Achievement.unlock('snake10');
      placeFood();
      if (score % 5 === 0) {
        clearInterval(ticker);
        ticker = setInterval(tick, Math.max(55, 140 - score * 4));
      }
    } else {
      snake.pop();
    }

    draw();
  }

  function gameOver() {
    alive = false;
    clearInterval(ticker);
    msgScore.textContent = 'Score: ' + score + (score === hiScore && score > 0 ? '  ★ new best!' : '');
    msgEl.classList.add('visible');
  }

  function placeFood() {
    var pos;
    do {
      pos = {x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS)};
    } while (snake.some(function (s) { return s.x === pos.x && s.y === pos.y; }));
    food = pos;
    draw();
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  function draw() {
    // Background
    ctx.fillStyle = '#050a05';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid
    ctx.strokeStyle = 'rgba(0,229,51,0.04)';
    ctx.lineWidth = 0.5;
    for (var gx = 0; gx <= COLS; gx++) {
      ctx.beginPath(); ctx.moveTo(gx*CELL,0); ctx.lineTo(gx*CELL,canvas.height); ctx.stroke();
    }
    for (var gy = 0; gy <= ROWS; gy++) {
      ctx.beginPath(); ctx.moveTo(0,gy*CELL); ctx.lineTo(canvas.width,gy*CELL); ctx.stroke();
    }

    // Snake body
    for (var i = snake.length - 1; i >= 0; i--) {
      var seg = snake[i];
      var isHead = i === 0;
      var fade = isHead ? 1 : Math.max(0.25, 1 - i / snake.length * 0.65);
      ctx.shadowBlur = 0;
      ctx.fillStyle = isHead
        ? '#00ff41'
        : 'rgba(0,' + Math.round(180 + 49 * fade) + ',' + Math.round(51 * fade) + ',' + fade + ')';
      if (isHead) {
        ctx.shadowColor = '#00ff41';
        ctx.shadowBlur  = 12;
      }
      ctx.fillRect(seg.x*CELL+1, seg.y*CELL+1, CELL-2, CELL-2);
    }
    ctx.shadowBlur = 0;

    // Food (pulsing red dot)
    ctx.fillStyle = '#ff3333';
    ctx.shadowColor = '#ff6666';
    ctx.shadowBlur  = 10;
    var pad = 3;
    ctx.fillRect(food.x*CELL+pad, food.y*CELL+pad, CELL-pad*2, CELL-pad*2);
    ctx.shadowBlur = 0;
  }

  // ─── Input handling ────────────────────────────────────────────────────────
  function setDir(d) {
    if (d.x !== -dir.x || d.y !== -dir.y) nextDir = d;
  }

  var DIR_MAP = {
    ArrowUp:    {x:0,y:-1}, w:{x:0,y:-1}, W:{x:0,y:-1},
    ArrowDown:  {x:0,y: 1}, s:{x:0,y: 1}, S:{x:0,y: 1},
    ArrowLeft:  {x:-1,y:0}, a:{x:-1,y:0}, A:{x:-1,y:0},
    ArrowRight: {x: 1,y:0}, d:{x: 1,y:0}, D:{x: 1,y:0},
  };

  document.addEventListener('keydown', function (e) {
    var active = document.activeElement;
    var inInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);

    // ── Game is open ──
    if (overlay && overlay.classList.contains('is-open')) {
      if (e.key === 'Escape') { closeSnake(); return; }
      if ((e.key === 'Enter' || e.key === ' ') && !alive) { startGame(); return; }
      var d = DIR_MAP[e.key];
      if (d) { e.preventDefault(); setDir(d); }
      return;
    }

    // ── Konami code tracking (only when not typing) ──
    if (inInput) { konamiIdx = 0; return; }

    if (e.key === KONAMI[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        openSnake();
      }
    } else {
      konamiIdx = (e.key === KONAMI[0]) ? 1 : 0;
    }
  });

  // ─── Wire up ───────────────────────────────────────────────────────────────
  init();
  document.addEventListener('open-snake', openSnake);

})();
