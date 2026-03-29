const apiKey = '136f30bef85c22edfa4c5e480a072db4ca0c2c40';

function handleEnter(e) { if (e.key === 'Enter') getAQI(); }

function setLoading(bool) {
    document.getElementById('icon-search').style.display = bool ? 'none' : 'block';
    document.getElementById('icon-spinner').style.display = bool ? 'block' : 'none';
    document.getElementById('stats-grid').style.opacity = bool ? '0.5' : '1';
}

// Geolocation
function geoLocate() {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
        pos => fetchAQI(`geo:${pos.coords.latitude};${pos.coords.longitude}`),
        () => { alert("Location access denied."); setLoading(false); }
    );
}

// Text Search
function getAQI() {
    const city = document.getElementById('city-input').value;
    if (city) {
        setLoading(true);
        fetchAQI(city);
    }
}

async function fetchAQI(query) {
    try {
        const res = await fetch(`https://api.waqi.info/feed/${query}/?token=${apiKey}`);
        const data = await res.json();
        setLoading(false);

        if (data.status === 'ok') updateUI(data.data);
        else {
            document.getElementById('loc-display').innerText = "City not found.";
            resetUI();
        }
    } catch (err) {
        setLoading(false);
        document.getElementById('loc-display').innerText = "Network Error.";
    }
}

function updateUI(data) {
    const aqi = data.aqi === '-' ? 0 : data.aqi;
    const theme = getTheme(aqi);

    // Update Colors
    document.documentElement.style.setProperty('--accent-color', theme.color);

    // Update Text
    animateVal("aqi-num", parseInt(document.getElementById('aqi-num').innerText) || 0, aqi, 1000);
    document.getElementById('aqi-text').innerText = theme.label;
    document.getElementById('loc-display').innerHTML = `<i class="fas fa-map-pin"></i> ${data.city.name}`;

    // Update Stats
    const iaqi = data.iaqi || {};
    document.getElementById('v-pm25').innerText = iaqi.pm25 ? iaqi.pm25.v : '-';
    document.getElementById('v-pm10').innerText = iaqi.pm10 ? iaqi.pm10.v : '-';
    document.getElementById('v-o3').innerText = iaqi.o3 ? iaqi.o3.v : '-';
    document.getElementById('v-wind').innerText = iaqi.w ? iaqi.w.v : '-';

    // Update Gauge
    updateGauge(aqi);
}

function resetUI() {
    updateGauge(0);
    document.getElementById('aqi-num').innerText = "--";
    document.getElementById('aqi-text').innerText = "Unknown";
}

function updateGauge(aqi) {
    const circle = document.getElementById('progress-arc');
    const radius = 75;
    const circumference = 2 * Math.PI * radius; // ~471.2
    const maxAqi = 300;
    const percentage = Math.min(aqi, maxAqi) / maxAqi;

    // Semi-circle math: 471.2 (Full) - (Percentage * Half_Circumference)
    const offset = circumference - (percentage * (circumference / 2));
    circle.style.strokeDashoffset = offset;
}

function animateVal(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (ts) => {
        if (!startTimestamp) startTimestamp = ts;
        const progress = Math.min((ts - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

function getTheme(aqi) {
    if (aqi <= 50) return { label: "Good", color: "#00b894" };
    if (aqi <= 100) return { label: "Moderate", color: "#f1c40f" };
    if (aqi <= 150) return { label: "Sensitive", color: "#e67e22" };
    if (aqi <= 200) return { label: "Unhealthy", color: "#e74c3c" };
    return { label: "Hazardous", color: "#8e44ad" };
}