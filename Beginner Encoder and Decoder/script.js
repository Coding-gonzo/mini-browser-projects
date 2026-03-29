const input = document.getElementById('mainInput');
const output = document.getElementById('mainOutput');

function process(mode) {
    const value = input.value.trim();
    if (!value) {
        alert("Please enter some text first!");
        return;
    }

    try {
        if (mode === 'encode') {
            // btoa: Binary to ASCII (Encoding)
            const result = btoa(value);
            output.textContent = result;
        } else {
            // atob: ASCII to Binary (Decoding)
            const result = atob(value);
            output.textContent = result;
        }
    } catch (e) {
        output.textContent = "❌ Error: Could not decode this. Make sure it is valid code!";
        output.style.color = "red";
    }
}

function copyResult() {
    const text = output.textContent;
    if (text && text !== "Your result will appear here...") {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    }
}

function clearAll() {
    input.value = "";
    output.textContent = "Your result will appear here...";
    output.style.color = "#333";
}