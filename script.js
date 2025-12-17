// Typing Animation
const roles = [
    "AI and ML Engineer",
    "Full Stack Developer",
    "Digital Marketer"
];
const roleElement = document.getElementById("role-text");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;
let deleteSpeed = 40;
let pauseBetween = 2500;

window.typingEffectTimer = null;

function typeRoles() {
    clearTimeout(window.typingEffectTimer);

    const currentRole = roles[roleIndex];
    let nextSpeed = typeSpeed;

    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        nextSpeed = deleteSpeed;
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        nextSpeed = typeSpeed;
    }

    if (!isDeleting && charIndex >= currentRole.length) {
        isDeleting = true;
        nextSpeed = pauseBetween;
    } else if (isDeleting && charIndex <= 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        nextSpeed = 500;
    }

    window.typingEffectTimer = setTimeout(typeRoles, nextSpeed);
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // GSAP Registration
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animation Timeline
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2
    })
        .from(".roles-wrapper", {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.4")
        .from(".description", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".cta-container", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".social-links", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".scroll-indicator", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.4");

    // Scroll Animations for Sections
    // Animate Section Titles
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Staggered Animations for Grid Items
    // Using a loop to handle each grid section individually
    const grids = [
        { selector: ".services-grid", card: ".service-card" },
        { selector: ".projects-grid", card: ".project-card" },
        { selector: ".skills-grid", card: ".skill-category" }, // Animate the whole category card
        { selector: ".blog-grid", card: ".blog-card" }
    ];

    grids.forEach(grid => {
        const container = document.querySelector(grid.selector);
        if (container) {
            const cards = container.querySelectorAll(grid.card);
            if (cards.length > 0) {
                gsap.from(cards, {
                    scrollTrigger: {
                        trigger: container,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    clearProps: "all"
                });
            }
        }
    });

    // Experience & Education Timeline items
    gsap.utils.toArray(".timeline-item").forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all"
        });
    });


    // Typing Init
    if (window.typingEffectTimer) clearTimeout(window.typingEffectTimer);
    roleIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typeRoles();

    // Canvas Init
    initCanvas();

    // Navbar Scroll Listener
    window.addEventListener('scroll', handleNavbarScroll);
});

// Canvas Particle Animation
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initCanvas() {
    resizeCanvas();
    createParticles();
    animateParticles();
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Slightly smaller particles
        this.speedX = (Math.random() * 0.5 - 0.25); // Slower speed
        this.speedY = (Math.random() * 0.5 - 0.25);
        this.color = 'rgba(255, 255, 255, 0.15)'; // More subtle
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    particles = [];
    // Adjust density based on screen size
    const densityDivisor = window.innerWidth < 768 ? 20000 : 12000;
    const numberOfParticles = (canvas.width * canvas.height) / densityDivisor;

    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 - distance / 2400})`; // Very subtle lines
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}



// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Visual feedback
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        const statusMsg = document.getElementById('formStatus');

        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';

        // Simulate network delay
        setTimeout(() => {
            btn.textContent = 'Msg Sent!';
            btn.style.background = '#10b981'; // Green color for success
            statusMsg.textContent = "Thanks for reaching out! This is a demo form.";
            statusMsg.style.color = '#10b981';

            // Reset after delay
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.style.background = ''; // Revert to CSS
                btn.style.opacity = '1';
                statusMsg.textContent = '';
            }, 3000);
        }, 1500);
    });
}
