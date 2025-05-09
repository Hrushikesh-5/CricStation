// Toggle between light and dark mode
// const toggle = document.querySelector('.theme-toggle');
// toggle.addEventListener('click', () => {
//   document.body.classList.toggle('light-mode');
// });
// 
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
  }
window.addEventListener('DOMContentLoaded', async () => {
  const loginButton = document.getElementById('loginButton');
  const logoutButton = document.getElementById('logoutButton');

//   const startMatch = document.querySelectorAll('.cta-button');
//   // Add an event listener to only the first button (index 0)
// startMatch[1].addEventListener('click', () => {
//     window.location.href = '/matchDetails';
//   });
const startMatchBtn = document.getElementById('startMatchBtn');
if (startMatchBtn) {
  startMatchBtn.addEventListener('click', () => {
    window.location.href = '/matchDetails';
  });
}
  try {
    const response = await fetch('/api/check-auth');
    const data = await response.json();

    if (data.authenticated) {
      if (loginButton) loginButton.style.display = 'none';
      if (logoutButton) logoutButton.style.display = 'inline-block';
    } else {
      if (loginButton) loginButton.style.display = 'inline-block';
      if (logoutButton) logoutButton.style.display = 'none';
    }
  } catch (err) {
    console.error("Auth check failed", err);
  }
});

// function toggleMenu() {
//     const navMenu = document.getElementById('nav-menu');
//     navMenu.classList.toggle('active');
//   }
//   const startMatch = document.querySelectorAll('.cta-button');
//   // Add an event listener to only the first button (index 0)
// startMatch[1].addEventListener('click', () => {
//     window.location.href = '/matchDetails';
//   });