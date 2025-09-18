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

// Animated Gradients
const gradient = document.getElementById('gradient');
let hue = 0;

function animateGradient() {
  // Compute two hues 60° apart
  const color1 = `hsl(${hue}, 100%, 50%)`;
  const color2 = `hsl(${(hue + 60) % 360}, 100%, 50%)`;
  
  // Apply as a 45° linear gradient
  gradient.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
  
  // Increment hue, wrap at 360
  hue = (hue + 1) % 360;
  
  // Loop on next animation frame for smooth 60fps
  requestAnimationFrame(animateGradient);
}

// Kick off the animation
animateGradient();



