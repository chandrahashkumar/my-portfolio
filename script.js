function toggleMenu() {
  const menuLinks = document.querySelector('.menu-links');
  if (menuLinks) {
    menuLinks.classList.toggle('active');
  } else {
    console.error('Element with class "menu-links" not found.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop();
  const galleryLink = document.querySelector('a[href="gallery.html"]');
  if (currentPage === 'gallery.html' && galleryLink) {
    galleryLink.style.display = 'none';
  }
});
