// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Active link highlighting
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing Animation (without cursor)
const dynamicText = document.querySelector('.dynamic-text');
const roles = [
    'AI/ML Engineer',
    'Data Scientist',
    'Deep Learning Expert',
    'Computer Vision Specialist',
    'NLP Developer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeEffect() {
    if (!dynamicText) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        dynamicText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        isWaiting = true;
        setTimeout(() => {
            isWaiting = false;
            setTimeout(typeEffect, 100);
        }, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    
    if (!isWaiting) {
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
}

// Start typing animation
setTimeout(typeEffect, 1000);

// Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
    if (animated) return;
    
    const statsSection = document.querySelector('.about');
    if (!statsSection) return;
    
    const sectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const isDecimal = target % 1 !== 0;
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = isDecimal ? target.toFixed(1) : target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                }
            }, 30);
        });
        animated = true;
    }
}

window.addEventListener('scroll', animateStats);

// Skill Progress Bars
const progressBars = document.querySelectorAll('.progress');
let barsAnimated = false;

function animateProgressBars() {
    if (barsAnimated) return;
    
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;
    
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
        barsAnimated = true;
    }
}

window.addEventListener('scroll', animateProgressBars);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
    });
});

// Particle effect for home section
function createParticles() {
    const homeSection = document.querySelector('.home');
    if (!homeSection) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        homeSection.appendChild(particle);
    }
}

// Add particle styles
const style = document.createElement('style');
style.textContent = `
    .home {
        position: relative;
        overflow: hidden;
    }
    
    .particle {
        position: absolute;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.3;
        animation: floatParticle 8s infinite linear;
        z-index: 0;
    }
    
    @keyframes floatParticle {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) translateX(100px) rotate(360deg);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);
createParticles();

// Text scramble effect for section titles
const sectionTitles = document.querySelectorAll('.section-title span');
sectionTitles.forEach(title => {
    const originalText = title.textContent;
    
    title.addEventListener('mouseenter', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            title.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                })
                .join('');
            
            if (iterations >= originalText.length) {
                clearInterval(interval);
                title.textContent = originalText;
            }
            
            iterations += 1/3;
        }, 30);
    });
});

// Preloader animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
