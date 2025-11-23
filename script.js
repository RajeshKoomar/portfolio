/* Toggle Icon Navbar */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.querySelector('i').classList.toggle('fa-bars');
    menuIcon.querySelector('i').classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

/* Close menu when clicking outside */
document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !navbar.contains(e.target)) {
        navbar.classList.remove('active');
        menuIcon.querySelector('i').classList.remove('fa-times');
        menuIcon.querySelector('i').classList.add('fa-bars');
    }
});

/* Theme Toggle */
let themeIcon = document.querySelector('#theme-icon');

themeIcon.onclick = () => {
    themeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('light-mode');
};

/* Navbar Hide/Show on Scroll */
let lastScrollTop = 0;
const header = document.querySelector('.header');
const scrollThreshold = 100; // Start hiding after scrolling 100px

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Only apply hide/show after scrolling past threshold
    if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
            // Scrolling DOWN - hide navbar
            header.classList.add('nav-hidden');
            header.classList.remove('nav-visible');
        } else {
            // Scrolling UP - show navbar
            header.classList.remove('nav-hidden');
            header.classList.add('nav-visible');
        }
    } else {
        // At top of page - always show
        header.classList.remove('nav-hidden');
        header.classList.add('nav-visible');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

/* Scroll Sections Active Link */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /* Sticky Navbar */
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* Remove toggle icon and navbar when click navbar link (scroll) */
    menuIcon.classList.remove('fa-times');
    navbar.classList.remove('active');
};

/* Scroll Reveal */
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .projects-container, .contact form, .experience-row', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* Typed JS */
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Backend Developer', '.NET Expert', 'Angular Specialist'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* Enhanced Custom Cursor */
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
};

if (!isTouchDevice()) {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let dotX = 0, dotY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor movement with lerp (linear interpolation)
    function animateCursor() {
        // Dot follows immediately
        dotX = mouseX;
        dotY = mouseY;

        // Outline follows with smooth delay
        const speed = 0.15;
        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;

        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover effect for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, .skill-box, .project-box, #theme-icon, #menu-icon');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });

        element.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
} else {
    // Hide custom cursor on touch devices
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    document.body.style.cursor = 'auto';
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorOutline) cursorOutline.style.display = 'none';
}

/* Dynamic Resume Year */
const currentYear = new Date().getFullYear();
const downloadLink = document.getElementById('download-cv');
if (downloadLink) {
    downloadLink.setAttribute('download', `RajeshResume${currentYear}.pdf`);
}
