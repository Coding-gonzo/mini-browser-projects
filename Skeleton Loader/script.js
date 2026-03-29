function initSkeletonLoader(container, count = 6) {
    const staggerOffset = 0.2; // Seconds to offset each card

    for (let i = 0; i < count; i++) {
        const card = document.createElement('div');
        card.className = 'skeleton-card';

        // Define the structure of the skeleton card
        const elements = ['sk-image', 'sk-title', 'sk-text', 'sk-text-short'];

        elements.forEach(type => {
            const el = document.createElement('div');
            el.classList.add('skeleton-pulse', type);

            // Apply negative delay to create a staggered "wave" effect
            // without waiting for the animation to start.
            el.style.animationDelay = `-${i * staggerOffset}s`;

            card.appendChild(el);
        });

        container.appendChild(card);
    }
}

// Initialize
initSkeletonLoader(document.getElementById('loader-root'));

// Simulate Data Loading and Smooth Transition
async function loadRealContent() {
    const container = document.getElementById('loader-root');

    // 1. Simulate API delay (e.g., 3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 2. Fade out the skeleton loader
    container.style.opacity = '0';

    // 3. Wait for the transition to finish (matches CSS transition time)
    await new Promise(resolve => setTimeout(resolve, 500));

    // 4. Clear skeletons and inject "real" content
    container.innerHTML = '';

    // Generate dummy content cards
    for (let i = 1; i <= 6; i++) {
        const card = document.createElement('div');
        card.className = 'skeleton-card';
        card.innerHTML = `
                    <img src="https://picsum.photos/seed/${i}/400/300" class="sk-image" style="object-fit: cover; background: #ccc;">
                    <h3 style="margin: 0; color: var(--text-color);">Card Title ${i}</h3>
                    <p style="margin: 0; color: var(--text-color); opacity: 0.8;">This is the actual content loaded from the server, replacing the skeleton.</p>
                `;
        container.appendChild(card);
    }

    // 5. Fade the content back in
    container.style.opacity = '1';
}

loadRealContent();

// Theme Toggle Logic
const toggleBtn = document.getElementById('theme-toggle');

// Check system preference on load
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
