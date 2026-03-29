// --- MATRIX RAIN CODE ---
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
let drops = [];

function resetMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.ceil(canvas.width / fontSize);
    drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
}

resetMatrix();

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 30);

window.addEventListener('resize', () => {
    resetMatrix();
});

// --- TYPING CODE ---
const textElement = document.getElementById('typing-text');
const accessBtn = document.querySelector('.btn-access');

const messages = [
    "Initializing connection...",
    "Bypassing firewalls...",
    "Decrypting secure nodes...",
    "Uploading payload...",
    "Access: AUTHORIZED.",
    "Welcome back, Administrator."
];

let msgIndex = 0;
let charIndex = 0;

function typeWriter() {
    if (msgIndex < messages.length) {
        if (charIndex < messages[msgIndex].length) {
            let fullContent = "";
            for (let i = 0; i < msgIndex; i++) {
                fullContent += messages[i] + "<br>";
            }
            fullContent += messages[msgIndex].substring(0, charIndex + 1);
            textElement.innerHTML = fullContent;
            charIndex++;
            setTimeout(typeWriter, 50);
        } else {
            msgIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 500);
        }
    } else {
        accessBtn.style.display = "inline-block";
    }
}
setTimeout(typeWriter, 1000);

function accessGranted() {
    const terminal = document.getElementById('terminal-overlay');
    terminal.style.transition = "opacity 1s ease";
    terminal.style.opacity = "0";
    setTimeout(() => {
        terminal.style.display = "none";
    }, 1000);
}

// --- FULL SCREEN LOGIC (MODIFIED) ---

function enterFullScreen() {
    const btn = document.getElementById('fullscreen-btn');

    // Only request full screen. We do NOT exit here.
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => {
            console.error(e);
        });
        // We don't need to manually hide the button here because 
        // the 'fullscreenchange' event listener below will handle it perfectly.
    }
}

// This listener automatically detects ANY change in full screen state
// (whether via button click, Esc key, or F11)
document.addEventListener('fullscreenchange', () => {
    const btn = document.getElementById('fullscreen-btn');

    if (document.fullscreenElement) {
        // We are now in full screen -> HIDE BUTTON
        btn.style.display = "none";
    } else {
        // We have exited full screen -> SHOW BUTTON
        btn.style.display = "block";
    }
});
