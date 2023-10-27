const navSlide = () => {
    const hamburguer = document.querySelector('.hamburger');
    const navbar = document.querySelector('.nav-bar');
    const navLinks = document.querySelectorAll('.nav-bar li');

    hamburguer.addEventListener('click', () => {
        navbar.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 1}s`
            }

            hamburguer.classList.toggle('toggle');
        })
    })
}
window.onload = () => navSlide();