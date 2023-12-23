
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => {
    nav.dataset.visible = nav.dataset.visible === 'true' ? 'false' : 'true';
    navToggle.setAttribute('aria-expanded', navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
});