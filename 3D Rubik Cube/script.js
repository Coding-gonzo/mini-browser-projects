// --- 3D CUBE LOGIC ---
const cubeContainer = document.getElementById('cube');
function createModel() {
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                const cubie = document.createElement('div');
                cubie.className = 'cubie';
                const offset = 61;
                cubie.style.transform = `translate3d(${x * offset}px, ${y * offset}px, ${z * offset}px)`;
                ['front', 'back', 'right', 'left', 'top', 'bottom'].forEach(f => {
                    const face = document.createElement('div');
                    face.className = `face f-${f}`;
                    cubie.appendChild(face);
                });
                cubeContainer.appendChild(cubie);
            }
        }
    }
}

let isDragging = false, rotX = -25, rotY = 45, lastX, lastY;
let autoRotateActive = true;

const start = (x, y) => { isDragging = true; autoRotateActive = false; lastX = x; lastY = y; };
const move = (x, y) => {
    if (!isDragging) return;
    rotY += (x - lastX) * 0.5;
    rotX -= (y - lastY) * 0.5;
    cubeContainer.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    lastX = x; lastY = y;
};
const end = () => {
    isDragging = false;
    setTimeout(() => { if (!isDragging) autoRotateActive = true; }, 1000);
};

window.addEventListener('mousedown', e => start(e.clientX, e.clientY));
window.addEventListener('mousemove', e => move(e.clientX, e.clientY));
window.addEventListener('mouseup', end);
window.addEventListener('touchstart', e => start(e.touches[0].clientX, e.touches[0].clientY));
window.addEventListener('touchmove', e => {
    move(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault();
}, { passive: false });
window.addEventListener('touchend', end);

// --- PARTICLE LOGIC ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.init();
    }
    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.5 ? '#00d2ff' : '#ff2e63';
        this.opacity = Math.random();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
    }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

// --- GLOBAL ANIMATION LOOP ---
function mainLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update Particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Update Cube
    if (autoRotateActive && !isDragging) {
        rotY += 0.3;
        rotX += 0.1;
        cubeContainer.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
    requestAnimationFrame(mainLoop);
}

createModel();
mainLoop();