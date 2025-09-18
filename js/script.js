const buttons = document.querySelectorAll('.tab-buttons button');
const contents = document.querySelectorAll('.tab-content');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active classes
    buttons.forEach(btn => btn.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

// First tab by default
buttons[0].click();


// Dark/Light Mode
const themeBtn = document.getElementById('theme-toggle');
const root    = document.documentElement;      // refers to <html>

themeBtn.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', nextTheme);
});

// Glitching Text
const el = document.getElementById('js-glitch');
const CHARS = ['#','%','&','@','?','<>'];

function glitchOnce() {
  const orig = el.textContent;
  // random character replacements
  let text = orig
    .split('')
    .map(ch => (Math.random() < 0.2 
                 ? CHARS[Math.floor(Math.random() * CHARS.length)] 
                 : ch))
    .join('');
  
  el.textContent = text;
  // restore after a short pause
  setTimeout(() => el.textContent = orig, 100);
}

// run every 300–800ms for a sporadic effect
setInterval(glitchOnce, 300 + Math.random() * 500);

// trigger on hover
el.addEventListener('mouseenter', glitchOnce);

// Progress Bar
const startBtn = document.getElementById('startBtn');
const progressBar = document.getElementById('progressBar');

function startProgress() {
  let width = 0;
  progressBar.style.width = '0%';
  progressBar.textContent = '0%';

  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      progressBar.textContent = 'Complete';
    } else {
      width++;
      progressBar.style.width = width + '%';
      progressBar.textContent = width + '%';
    }
  }, 100);
}

startBtn.addEventListener('click', startProgress);


const Letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=+<>/[]{}()!?';
const element     = document.getElementById('decoder');
const btn    = document.getElementById('startBtn');

function startDecoding(finalText) {
  const len      = finalText.length;
  const revealTs = Array.from({length: len}, () => 
    Math.random() * 1500 + 500  // each letter reveals between 500ms and 2000ms
  );
  const start    = performance.now();

  function update(now) {
    const t   = now - start;
    const out = finalText.split('').map((ch, i) => {
      return t > revealTs[i]
        ? ch
        : Letters[Math.floor(Math.random() * Letters.length)];
    }).join('');

    element.textContent = out;

    if (t < Math.max(...revealTs)) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

btn.addEventListener('click', () => {
  // reset display and kick off effect
  element.textContent = '';
  startDecoding('ACCESS GRANTED');
});




