(function () {
  const pages = {
    'index':                { label: 'Quest Hub',          icon: '⚔' },
    'arrays-strings':       { label: 'Arrays & Strings',   icon: '📦', prev: null,                    next: 'linked-lists' },
    'linked-lists':         { label: 'Linked Lists',       icon: '🔗', prev: 'arrays-strings',        next: 'trees-graphs' },
    'trees-graphs':         { label: 'Trees & Graphs',     icon: '🌳', prev: 'linked-lists',          next: 'dynamic-programming' },
    'dynamic-programming':  { label: 'Dynamic Programming',icon: '⚡', prev: 'trees-graphs',          next: 'sorting-searching' },
    'sorting-searching':    { label: 'Sorting & Searching',icon: '🔄', prev: 'dynamic-programming',   next: 'hash-tables' },
    'hash-tables':          { label: 'Hash Tables',        icon: '#️⃣', prev: 'sorting-searching',     next: null },
    'crypto-hashing':       { label: 'Crypto Hashing',     icon: '🔐', prev: null,                    next: 'symmetric-encryption' },
    'symmetric-encryption': { label: 'Symmetric Encryption',icon: '🔑', prev: 'crypto-hashing',       next: 'asymmetric-encryption' },
    'asymmetric-encryption':{ label: 'Asymmetric Encryption',icon: '🔐', prev: 'symmetric-encryption',next: 'digital-signatures' },
    'digital-signatures':   { label: 'Digital Signatures', icon: '✍',  prev: 'asymmetric-encryption', next: 'blockchain' },
    'blockchain':           { label: 'Blockchain',         icon: '⛓',  prev: 'digital-signatures',    next: 'zero-knowledge' },
    'zero-knowledge':       { label: 'Zero-Knowledge',     icon: '👁',  prev: 'blockchain',            next: null }
  };

  function getPageKey() {
    const path = window.location.pathname;
    const file = path.split('/').pop().replace('.html', '') || 'index';
    return file;
  }

  function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) return '../';
    return '';
  }

  function render() {
    const key = getPageKey();
    const base = getBasePath();
    const page = pages[key] || { label: key, icon: '📄' };
    const isIndex = key === 'index';

    let controls = '';
    if (!isIndex) {
      controls = `
        <button class="mute-btn" id="muteBtn" onclick="if(window.toggleMute)toggleMute()">🔊 Sound</button>
        <div class="xp-badge" id="xpBadge">+0 XP</div>
        <div class="progress-track"><div class="progress-fill" id="mainProgress"></div></div>`;
    }

    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
      <div class="nav-brand">
        <a href="${base}index.html">← Quest Hub</a>
        ${!isIndex ? ' / ' + page.icon + ' ' + page.label : ''}
      </div>
      <div class="nav-controls">${controls}</div>`;

    const firstChild = document.body.firstElementChild;
    document.body.insertBefore(nav, firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
