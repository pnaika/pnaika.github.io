(function () {
  'use strict';

  var canvas, ctx, cols, drops, speeds, animId;
  var active = false;

  var CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
              '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&';
  var CELL = 16;

  function init() {
    canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    window.addEventListener('resize', function () { if (active) resize(); });
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols   = Math.floor(canvas.width / CELL);
    drops  = [];
    speeds = [];
    for (var i = 0; i < cols; i++) {
      drops[i]  = Math.random() * -(canvas.height / CELL);
      speeds[i] = 0.3 + Math.random() * 0.7;
    }
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < cols; i++) {
      var y = Math.floor(drops[i]) * CELL;
      var ch = CHARS[Math.floor(Math.random() * CHARS.length)];

      // Head: bright white-green
      ctx.fillStyle = '#c8ffc8';
      ctx.font = 'bold ' + CELL + 'px monospace';
      ctx.fillText(ch, i * CELL, y);

      // One cell behind: full green
      ctx.fillStyle = '#00ff41';
      ctx.font = CELL + 'px monospace';
      var ch2 = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.fillText(ch2, i * CELL, y - CELL);

      drops[i] += speeds[i];

      if (drops[i] * CELL > canvas.height && Math.random() > 0.975) {
        drops[i] = Math.random() * -20;
        speeds[i] = 0.3 + Math.random() * 0.7;
      }
    }
  }

  function start() {
    if (active) return;
    active = true;
    resize();
    (function loop() {
      if (!active) return;
      draw();
      animId = requestAnimationFrame(loop);
    })();
    if (window.Achievement) window.Achievement.unlock('matrix');
  }

  function stop() {
    active = false;
    if (animId) cancelAnimationFrame(animId);
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  init();

  document.addEventListener('matrix-start', start);
  document.addEventListener('matrix-stop',  stop);

  // Resume from persisted theme
  if (document.documentElement.getAttribute('data-theme') === 'matrix') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  }

})();
