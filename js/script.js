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

