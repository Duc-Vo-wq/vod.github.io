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

