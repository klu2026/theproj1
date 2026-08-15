(function () {
  // ===== AUDIO =====
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;
  let muted = false;

  function ensureAudio() {
    if (!audioCtx) audioCtx = new AudioCtx();
  }

  function playTone(freq, dur, vol = 0.06) {
    if (muted) return;
    ensureAudio();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.connect(g);
    g.connect(audioCtx.destination);
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, audioCtx.currentTime);
    g.gain.setValueAtTime(vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    o.start();
    o.stop(audioCtx.currentTime + dur);
  }

  function playHashSound() {
    playTone(880, 0.15, 0.08);
    setTimeout(() => playTone(1760, 0.1, 0.04), 50);
  }

  function playBitSound() {
    playTone(180 + Math.random() * 80, 0.04, 0.02);
  }

  function playCompare() { playTone(600, 0.06); }
  function playSwap() { playTone(900, 0.1, 0.08); }
  function playDone() { playTone(1200, 0.15); setTimeout(() => playTone(1600, 0.2), 120); }

  function toggleMute() {
    muted = !muted;
    const btn = document.getElementById('muteBtn');
    if (btn) btn.textContent = muted ? '🔇 Muted' : '🔊 Sound';
  }

  // ===== XP =====
  let totalXP = 0;

  function addXP(amount) {
    totalXP += amount;
    const el = document.getElementById('xpBadge');
    if (el) {
      el.textContent = '+' + totalXP + ' XP';
      el.style.color = '#fbbf24';
      setTimeout(() => { el.style.color = ''; }, 1500);
    }
  }

  function updateProgress(pct) {
    const el = document.getElementById('mainProgress');
    if (el) el.style.width = pct + '%';
  }

  // ===== CANVAS RESIZE =====
  function resizeCanvas(c) {
    const rect = c.getBoundingClientRect();
    c.width = rect.width * devicePixelRatio;
    c.height = rect.height * devicePixelRatio;
    c.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
  }

  // ===== BAR DRAWING =====
  const COLORS = {
    default: '#06b6d4',
    comparing: '#f59e0b',
    swapping: '#ef4444',
    sorted: '#10b981',
    pivot: '#a855f7',
    found: '#10b981'
  };

  function drawBars(ctx, c, arr, colors) {
    const w = c.width / devicePixelRatio;
    const h = c.height / devicePixelRatio;
    const n = arr.length;
    const gap = Math.max(1, Math.floor(w / n * 0.08));
    const barW = (w - gap * (n + 1)) / n;
    const maxVal = Math.max(...arr);

    ctx.clearRect(0, 0, w, h);
    ctx.shadowBlur = 0;

    arr.forEach((val, i) => {
      const barH = (val / maxVal) * (h - 30);
      const x = gap + i * (barW + gap);
      const y = h - barH - 4;
      const col = COLORS[colors[i]] || COLORS.default;

      ctx.shadowColor = col;
      ctx.shadowBlur = (colors[i] === 'comparing' || colors[i] === 'swapping') ? 12 : 6;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [3, 3, 0, 0]);
      ctx.fill();

      if (barW > 10) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f9fafb';
        ctx.font = Math.min(11, barW - 1) + 'px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText(val, x + barW / 2, y - 4);
      }
    });
    ctx.shadowBlur = 0;
  }

  // ===== FLOATING PARTICLES (simple for index page) =====
  function createFloatingParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      if (Math.random() > 0.5) particle.style.background = '#ff00ff';
      container.appendChild(particle);
    }
  }

  // ===== INTERSECTION OBSERVER =====
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.quest-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ' + (index * 0.1) + 's';
      observer.observe(card);
    });
  }

  function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(start + (end - start) * easeOut);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ===== PUBLIC API =====
  window.QuestHub = {
    playTone, playHashSound, playBitSound, playCompare, playSwap, playDone,
    toggleMute, addXP, updateProgress, resizeCanvas, drawBars, COLORS,
    createFloatingParticles, initScrollAnimations, animateValue
  };

  // Auto-init floating particles on index page
  if (document.getElementById('particles')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createFloatingParticles);
    } else {
      createFloatingParticles();
    }
  }
})();
