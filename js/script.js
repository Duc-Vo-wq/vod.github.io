document.addEventListener('DOMContentLoaded', () => {
  const buttons  = document.querySelectorAll('.tab-buttons button');
  const contents = document.querySelectorAll('.tab-content');

  // 1) Hide all panels immediately
  contents.forEach(panel => {
    panel.style.display = 'none';
    panel.style.opacity = 0;
  });

  // 2) Determine which tab to show first
  const lastTab = localStorage.getItem('lastTab') || buttons[0].dataset.tab;
  const firstButton = document.querySelector(`.tab-buttons button[data-tab="${lastTab}"]`);

  // 3) Show that panel instantly (no transition)
  const firstPanel = document.getElementById(lastTab);
  firstPanel.style.display = 'block';
  firstPanel.style.opacity = 1;
  firstButton.classList.add('active');

  // 4) Now wire up future clicks with fade logic
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // deactivate old
      buttons.forEach(b => b.classList.remove('active'));

      // fade out old panel(s)
      contents.forEach(panel => {
        if (panel.style.display === 'block' && panel !== document.getElementById(btn.dataset.tab)) {
          panel.style.opacity = 0;
          panel.addEventListener(
            'transitionend',
            () => { panel.style.display = 'none'; },
            { once: true }
          );
        }
      });

      // activate clicked button
      btn.classList.add('active');
      localStorage.setItem('lastTab', btn.dataset.tab);

      // fade in new panel
      const toShow = document.getElementById(btn.dataset.tab);
      toShow.style.display = 'block';
      // use requestAnimationFrame so the browser picks up display:block first
      requestAnimationFrame(() => {
        toShow.style.opacity = 1;
      });
    });
  });
});


// Dark/Light Mode
//Start
const toggle = document.getElementById('theme-toggle');
if(toggle){
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
}
//End
