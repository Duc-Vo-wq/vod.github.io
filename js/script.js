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

// Particle Systems
// Setup canvas
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

// Listen for resize
window.addEventListener('resize', () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Particle class
class Particle {
  constructor(x, y) {
    this.x      = x;
    this.y      = y;
    this.vx     = (Math.random() - 0.5) * 4;
    this.vy     = (Math.random() - 0.5) * 4;
    this.size   = Math.random() * 5 + 2;
    this.life   = 60; // frames
    this.color  = `hsl(${Math.random() * 360}, 80%, 60%)`;
  }

  update() {
    this.x    += this.vx;
    this.y    += this.vy;
    this.life -= 1;
    this.size *= 0.96;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Particle system manager
const particles = [];

// Emit particles at (x, y)
function emit(x, y) {
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(x, y));
  }
}

// Animation loop
function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update and draw each particle
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    if (p.life <= 0 || p.size < 0.5) {
      particles.splice(i, 1);
    } else {
      p.draw();
    }
  }

  requestAnimationFrame(animate);
}

// Start animation
animate();

// Emit on mouse move
canvas.addEventListener('mousemove', e => {
  emit(e.clientX, e.clientY);
});




