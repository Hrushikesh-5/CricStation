// Toggle between light and dark mode
// const toggle = document.querySelector('.theme-toggle');
// toggle.addEventListener('click', () => {
//   document.body.classList.toggle('light-mode');
// });

function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
  }
  const startMatch = document.querySelectorAll('.cta-button');
  // Add an event listener to only the first button (index 0)
startMatch[1].addEventListener('click', () => {
    window.location.href = '/matchDetails';
  });