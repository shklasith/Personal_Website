// Typing Animation
const roles = [
    "AI/ML Enthusiast",
    "Backend Developer",
    "Digital Marketer"
];
const roleElement = document.getElementById("role-text");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;
let deleteSpeed = 150;
let pauseBetween = 4000;

function typeRoles() {
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

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        nextSpeed = pauseBetween;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        nextSpeed = 500;
    }

    setTimeout(typeRoles, nextSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    typeRoles();
    initCanvas();
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
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = 'rgba(255, 255, 255, 0.3)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
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
    const numberOfParticles = (canvas.width * canvas.height) / 15000; // Density
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

            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1500})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}
