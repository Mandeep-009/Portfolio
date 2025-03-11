// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle Navigation
    navLinks.classList.toggle('nav-active');
    
    // Animate Links
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Hamburger Animation
    hamburger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
            links.forEach(link => link.style.animation = '');
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .nav-active {
        transform: translateX(0%) !important;
    }

    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            right: 0;
            height: 100vh;
            top: 0;
            background: var(--background);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transform: translateX(100%);
            transition: transform 0.5s ease-in;
            width: 60%;
            box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        }

        .nav-links li {
            opacity: 0;
        }
    }

    .toggle span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .toggle span:nth-child(2) {
        opacity: 0;
    }

    .toggle span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    .header.scroll-down {
        transform: translateY(-100%);
    }

    .header.scroll-up {
        transform: translateY(0);
    }

    .header {
        transition: transform 0.3s ease;
    }
`;

document.head.appendChild(style); 