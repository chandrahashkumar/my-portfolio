function toggleMenu() {
  const menuLinks = document.querySelector('.menu-links');
  if (menuLinks) {
    menuLinks.classList.toggle('active');
  } else {
    console.error('Element with class "menu-links" not found.');
  }
}
