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
