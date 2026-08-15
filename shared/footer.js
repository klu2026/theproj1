(function () {
  const links = {
    index: [
      { href: '#', text: 'Documentation' },
      { href: '#', text: 'Community' },
      { href: '#', text: 'Leaderboard' }
    ],
    default: [
      { href: '#', text: 'Documentation' },
      { href: '#', text: 'Community' },
      { href: '#', text: 'Leaderboard' }
    ]
  };

  function getPageKey() {
    const path = window.location.pathname;
    const file = path.split('/').pop().replace('.html', '') || 'index';
    return file;
  }

  function render() {
    const key = getPageKey();
    const pageLinks = links[key] || links.default;

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="footer-logo">⚔ Quest Hub</div>
      <p>Forged in the fires of computational excellence</p>
      <div class="footer-links">
        ${pageLinks.map(l => `<a href="${l.href}">${l.text}</a>`).join('')}
      </div>`;

    document.body.appendChild(footer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
