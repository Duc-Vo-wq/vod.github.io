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

// Typewriter effect
const element   = document.getElementById("typewriter");
const button    = document.getElementById("startBtn");
const fullText  = "Am I the only one who likes bugfixing?";
let index, timer;

function typeWriter() {
  if (index < fullText.length) {
    element.textContent += fullText.charAt(index);
    index++;
    timer = setTimeout(typeWriter, 100);
  } else {
    clearTimeout(timer);
  }
}

function startTyping() {
  clearTimeout(timer);             // stop any in-progress typing
  element.textContent = "";        // reset text container
  index = 0;                       // reset character index
  typeWriter();                    // kick off the effect
}

// wire up the button
button.addEventListener("click", startTyping);




