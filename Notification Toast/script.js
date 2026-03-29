const icons = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
};

const container = document.getElementById('toast-container');

function createToast(type, title, message, duration = 5000) {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);

    toast.innerHTML = `
                <div class="toast-icon">${icons[type]}</div>
                <div class="toast-content">
                    <div class="toast-title">${title}</div>
                    <div class="toast-message">${message}</div>
                </div>
                <button class="toast-close" onclick="removeToast(this.parentElement)">&times;</button>
                <div class="progress-track">
                    <div class="progress-bar" style="animation: timer ${duration}ms linear forwards;"></div>
                </div>
            `;

    container.appendChild(toast);

    // Auto remove logic
    const autoRemove = setTimeout(() => {
        removeToast(toast);
    }, duration);

    // Pause removal on hover
    toast.addEventListener('mouseenter', () => {
        clearTimeout(autoRemove);
        toast.querySelector('.progress-bar').style.animationPlayState = 'paused';
    });

    toast.addEventListener('mouseleave', () => {
        setTimeout(() => removeToast(toast), duration);
        toast.querySelector('.progress-bar').style.animationPlayState = 'running';
    });
}

function removeToast(toast) {
    // Use fadeOut animation which looks good on both desktop/mobile
    toast.style.animation = 'fadeOut 0.4s ease forwards';

    toast.addEventListener('animationend', () => {
        toast.remove();
    });
}
