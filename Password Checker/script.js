// DOM Elements
const passwordInput = document.getElementById('passwordInput');
const toggleIcon = document.getElementById('toggleIcon');
const strengthBar = document.getElementById('strengthBar');
const feedback = document.getElementById('feedback');

// Requirement List Items
const requirements = {
    length: document.getElementById('length'),
    number: document.getElementById('number'),
    lowercase: document.getElementById('lowercase'),
    uppercase: document.getElementById('uppercase'),
    symbol: document.getElementById('symbol')
};

// Regular Expressions
const patterns = {
    number: /\d/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    symbol: /[^A-Za-z0-9]/
};

// 1. Toggle Password Visibility
toggleIcon.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Toggle Icon class
    toggleIcon.classList.toggle('fa-eye');
    toggleIcon.classList.toggle('fa-eye-slash');
});

// 2. Real-time Password Validation
passwordInput.addEventListener('input', function () {
    const val = passwordInput.value;
    let score = 0;

    // --- Check Individual Requirements ---

    // Length Check
    if (val.length >= 8) {
        setValid('length', true);
        score++;
    } else {
        setValid('length', false);
    }

    // Number Check
    if (patterns.number.test(val)) {
        setValid('number', true);
        score++;
    } else {
        setValid('number', false);
    }

    // Lowercase Check
    if (patterns.lowercase.test(val)) {
        setValid('lowercase', true);
        score++;
    } else {
        setValid('lowercase', false);
    }

    // Uppercase Check
    if (patterns.uppercase.test(val)) {
        setValid('uppercase', true);
        score++;
    } else {
        setValid('uppercase', false);
    }

    // Symbol Check
    if (patterns.symbol.test(val)) {
        setValid('symbol', true);
        score++;
    } else {
        setValid('symbol', false);
    }

    // --- Update UI based on Score ---
    updateMeter(score, val.length);
});

// Helper: Update Class for Requirements
function setValid(id, isValid) {
    const el = requirements[id];
    const icon = el.querySelector('i');

    if (isValid) {
        el.classList.add('valid');
        icon.classList.remove('fa-circle-xmark');
        icon.classList.add('fa-circle-check');
    } else {
        el.classList.remove('valid');
        icon.classList.remove('fa-circle-check');
        icon.classList.add('fa-circle-xmark');
    }
}

// Helper: Update Strength Meter & Text
function updateMeter(score, length) {
    // Reset classes
    strengthBar.className = 'strength-meter';
    feedback.style.color = '#888';

    if (length === 0) {
        feedback.textContent = '';
        return;
    }

    // Logic to determine strength label
    if (score <= 2) {
        strengthBar.classList.add('weak');
        feedback.textContent = 'Weak';
        feedback.style.color = '#e74c3c';
    } else if (score <= 4) {
        strengthBar.classList.add('medium');
        feedback.textContent = 'Medium';
        feedback.style.color = '#f1c40f';
    } else {
        strengthBar.classList.add('strong');
        feedback.textContent = 'Strong';
        feedback.style.color = '#2ecc71';
    }
}