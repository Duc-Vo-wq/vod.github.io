// *** Fade transition on tab switch
//Start
const buttons = document.querySelectorAll('.tab-buttons button');
 const contents = document.querySelectorAll('.tab-content');

// helper: show only one pane with fade
function showTab(id) {
  contents.forEach(c => {
    if (c.id === id) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });
}

// click handler
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // buttons
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // content
    showTab(btn.dataset.tab);

    // persist choice
    localStorage.setItem('lastTab', btn.dataset.tab);
  });
});

// initialize on load
const last = localStorage.getItem('lastTab') || buttons[0].dataset.tab;
document.querySelector(`.tab-buttons button[data-tab="${last}"]`).click();
//End 

// Dark/Light Mode
//Start
const toggle = document.getElementById('theme-toggle');
const setTheme = theme => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

// on click, swap light/dark
toggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
});

// initialize theme
const saved = localStorage.getItem('theme') || 'light';
setTheme(saved);
//End
