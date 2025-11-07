// Cursor Glow Effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Animated Number Counter
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';

            // Trigger counter animation for stat numbers
            if (entry.target.classList.contains('stat-number') && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.about-card, .project-card, .tech-category').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Counter for hero stats
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Smooth scroll with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Nav link active state
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for grid background
let scrollPosition = 0;
const gridBackground = document.querySelector('.grid-background');

window.addEventListener('scroll', () => {
    scrollPosition = window.pageYOffset;
    gridBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

// Card hover tilt effect
const cards = document.querySelectorAll('.about-card, .project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Tech stack items stagger animation
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animation = `fadeInUp 0.5s ease forwards`;
    item.style.animationDelay = `${index * 0.1}s`;
});

const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.3 });

techItems.forEach(item => {
    item.style.animationPlayState = 'paused';
    techObserver.observe(item);
});

// Code window typing effect enhancement
const codeLines = document.querySelectorAll('.code-line');
codeLines.forEach((line, index) => {
    const text = line.textContent;
    line.textContent = '';
    line.style.opacity = '1';

    setTimeout(() => {
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < text.length) {
                line.innerHTML += text[charIndex] === '<' ?
                    text.slice(charIndex, text.indexOf('>', charIndex) + 1) :
                    text[charIndex];
                charIndex = text[charIndex] === '<' ?
                    text.indexOf('>', charIndex) + 1 :
                    charIndex + 1;
                setTimeout(typeChar, 30);
            }
        };
        typeChar();
    }, 1000 + (index * 200));
});

// Add glow effect to buttons
const buttons = document.querySelectorAll('.btn-primary');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';

        button.style.position = 'relative';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Project card click handler (customize as needed)
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add your project link logic here
        console.log('Project card clicked');
    });
});

// Navbar hide/show on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            width: 0;
            height: 0;
            opacity: 1;
        }
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Reduce cursor glow updates
let ticking = false;
let lastKnownScrollPosition = 0;

document.addEventListener('mousemove', (e) => {
    lastKnownScrollPosition = { x: e.clientX, y: e.clientY };

    if (!ticking) {
        window.requestAnimationFrame(() => {
            cursorGlow.style.left = lastKnownScrollPosition.x + 'px';
            cursorGlow.style.top = lastKnownScrollPosition.y + 'px';
            ticking = false;
        });
        ticking = true;
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

    if (konamiCode.join('').includes(konamiSequence.join(''))) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
