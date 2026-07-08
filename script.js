// ===========================================================
// NULLBREACH — interactivity
// ===========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mode tabs (Email / Breaches / Password) ---------- */
  const modeTabs = document.querySelectorAll('.mode-tab');
  const fieldLabel = document.getElementById('fieldLabel');
  const scanInput = document.getElementById('scanInput');

  const modeConfig = {
    email: { label: 'Email address', placeholder: 'arthur@example.com' },
    breaches: { label: 'Breach / domain name', placeholder: 'e.g. linkedin.com' },
    password: { label: 'Password (checked as hash)', placeholder: 'Enter a password to check' }
  };

  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.dataset.mode;
      const cfg = modeConfig[mode];
      fieldLabel.textContent = cfg.label;
      scanInput.placeholder = cfg.placeholder;
      scanInput.type = mode === 'password' ? 'password' : 'text';
      scanInput.value = '';
      // reset result box when switching modes
      document.getElementById('resultBox').classList.remove('show');
    });
  });

  /* ---------- Scan button ---------- */
  const scanBtn = document.getElementById('scanBtn');
  const resultBox = document.getElementById('resultBox');
  const resultEmail = document.getElementById('resultEmail');
  const btnLabel = scanBtn.querySelector('.btn-label');

  scanBtn.addEventListener('click', () => {
    if (scanBtn.classList.contains('loading')) return;

    const query = scanInput.value.trim();
    scanBtn.classList.add('loading');
    btnLabel.textContent = 'Scanning...';
    resultBox.classList.remove('show');

    setTimeout(() => {
      scanBtn.classList.remove('loading');
      btnLabel.textContent = 'Run leak scan';

      // build masked display value
      let display = 'arthur@●●●●●.com';
      if (query) {
        const activeMode = document.querySelector('.mode-tab.active').dataset.mode;
        if (activeMode === 'email' && query.includes('@')) {
          const [user, domain] = query.split('@');
          const maskedUser = user.length > 3 ? user.slice(0, 3) + '●●●' : user + '●●●';
          const domainParts = domain.split('.');
          const maskedDomain = '●●●●●.' + (domainParts[1] || 'com');
          display = `${maskedUser}@${maskedDomain}`;
        } else if (activeMode === 'breaches') {
          display = query.length > 2 ? query.slice(0,2) + '●●●●●●' : '●●●●●●';
        } else {
          display = '●●●●●●●●●●';
        }
      }
      resultEmail.textContent = display;
      resultBox.classList.add('show');
    }, 1400);
  });

  scanInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') scanBtn.click();
  });

  /* ---------- Reveal switch (blur toggle) ---------- */
  const revealSwitch = document.getElementById('revealSwitch');
  const credPanel = document.getElementById('credPanel');

  revealSwitch.addEventListener('click', () => {
    revealSwitch.classList.toggle('on');
    credPanel.classList.toggle('revealed');
  });

  const revealLink = document.getElementById('revealLink');
  if (revealLink) {
    revealLink.addEventListener('click', () => {
      revealSwitch.classList.add('on');
      credPanel.classList.add('revealed');
      credPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- Smooth scroll for nav links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
