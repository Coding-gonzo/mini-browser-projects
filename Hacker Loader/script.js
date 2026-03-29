const counterElement = document.getElementById('counter');
const statusElement = document.getElementById('status');
const container = document.getElementById('loaderContainer');

let count = 0;

// Simulation of variable loading speed
// Returns a random number between min and max
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateLoader() {
    if (count < 100) {
        // Increment by random amount (1-3) to simulate real data
        let increment = (Math.random() > 0.8) ? 2 : 1;
        count = Math.min(count + increment, 100);

        counterElement.innerText = count + '%';

        // Change text based on progress for realism
        if (count === 30) statusElement.innerText = "Verifying...";
        if (count === 70) statusElement.innerText = "Optimizing...";
        if (count === 90) statusElement.innerText = "Finalizing...";

        // Variable timeout: Sometimes fast, sometimes slow
        let speed = getRandom(30, 150);

        // Slow down significantly at 99% for dramatic effect
        if (count > 95) speed = 300;

        setTimeout(updateLoader, speed);
    } else {
        finishLoading();
    }
}

function finishLoading() {
    statusElement.innerText = "ACCESS GRANTED";
    container.classList.add('finished');
}

// Start the loader
setTimeout(updateLoader, 500); // Small initial delay
