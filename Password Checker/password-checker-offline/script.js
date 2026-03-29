const passwordInput = document.getElementById("passwordInput");
const toggleButton = document.getElementById("toggleButton");
const meterFill = document.getElementById("meterFill");
const scoreLabel = document.getElementById("scoreLabel");
const lengthInfo = document.getElementById("lengthInfo");
const summary = document.getElementById("summary");
const notes = document.getElementById("notes");

const checklist = {
    length: document.getElementById("check-length"),
    longLength: document.getElementById("check-long-length"),
    variety: document.getElementById("check-variety"),
    unique: document.getElementById("check-unique"),
    patterns: document.getElementById("check-patterns"),
    common: document.getElementById("check-common")
};

const commonPasswords = [
    "123456",
    "123456789",
    "12345678",
    "password",
    "passwort",
    "password1",
    "admin",
    "admin123",
    "qwerty",
    "qwertz",
    "letmein",
    "welcome",
    "secret",
    "dragon",
    "monkey",
    "football",
    "iloveyou",
    "login",
    "master",
    "hallo",
    "sommer",
    "winter",
    "frankfurt",
    "berlin",
    "schalke",
    "fcbayern"
];

const keyboardRuns = [
    "qwertyuiop",
    "asdfghjkl",
    "zxcvbnm",
    "qwertzuiop",
    "1234567890"
];

toggleButton.addEventListener("click", () => {
    const reveal = passwordInput.type === "password";
    passwordInput.type = reveal ? "text" : "password";
    toggleButton.textContent = reveal ? "Verbergen" : "Anzeigen";
    toggleButton.setAttribute("aria-label", reveal ? "Passwort verbergen" : "Passwort einblenden");
});

passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;

    if (!value) {
        resetView();
        return;
    }

    const analysis = analyzePassword(value);
    renderAnalysis(analysis);
});

function analyzePassword(password) {
    const normalized = password.toLowerCase();
    const uniqueChars = new Set(password).size;
    const uniqueRatio = uniqueChars / password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9\s]/.test(password);
    const hasSpace = /\s/.test(password);
    const words = password.trim().split(/\s+/).filter(Boolean);
    const isPassphrase = words.length >= 3 && password.length >= 16;

    let score = 0;
    const messages = [];

    if (password.length >= 12) score += 24;
    else if (password.length >= 10) score += 14;
    else if (password.length >= 8) score += 8;

    if (password.length >= 16) score += 18;
    if (password.length >= 20) score += 10;
    if (password.length >= 24) score += 6;

    const charTypeCount = [hasLower, hasUpper, hasDigit, hasSymbol, hasSpace].filter(Boolean).length;
    score += Math.min(charTypeCount * 7, 28);

    if (isPassphrase) score += 10;
    if (uniqueRatio >= 0.75) score += 10;
    else if (uniqueRatio >= 0.55) score += 4;

    const findings = {
        common: hasCommonPattern(normalized),
        sequence: hasSequence(normalized),
        keyboard: hasKeyboardPattern(normalized),
        repeat: hasRepeatedRuns(password),
        repeatedChunk: hasRepeatedChunk(normalized),
        year: hasYearPattern(password)
    };

    if (findings.common.exactMatch) {
        score -= 55;
        messages.push("Das Passwort steht sehr nah an bekannten Standardpasswörtern.");
    } else if (findings.common.partialMatch) {
        score -= 24;
        messages.push("Es enthält typische Begriffe oder sehr häufige Passwortteile.");
    }

    if (findings.sequence) {
        score -= 18;
        messages.push("Einfach erkennbare Sequenzen machen das Passwort vorhersagbar.");
    }

    if (findings.keyboard) {
        score -= 18;
        messages.push("Tastaturmuster wie qwerty oder 123456 sind leicht zu erraten.");
    }

    if (findings.repeat) {
        score -= 14;
        messages.push("Mehrfach wiederholte Zeichenfolgen senken die Stärke.");
    }

    if (findings.repeatedChunk) {
        score -= 12;
        messages.push("Wiederholte Blöcke wie abcabc oder wortwort sind ein Schwächesignal.");
    }

    if (findings.year) {
        score -= 8;
        messages.push("Jahreszahlen oder Datumsfragmente sind oft leicht zu erraten.");
    }

    if (password.length < 12) {
        messages.push("Unter 12 Zeichen ist heute meist zu kurz.");
    }

    if (!isPassphrase && charTypeCount < 3) {
        messages.push("Mehr Vielfalt oder eine längere Passphrase wäre besser.");
    }

    score = clamp(score, 0, 100);

    const label = getStrengthLabel(score);
    const suggestions = buildSuggestions(password, {
        charTypeCount,
        isPassphrase,
        uniqueRatio,
        findings
    });

    return {
        score,
        label,
        length: password.length,
        messages,
        suggestions,
        checks: {
            length: password.length >= 12,
            longLength: password.length >= 16,
            variety: charTypeCount >= 3 || isPassphrase,
            unique: uniqueRatio >= 0.55,
            patterns: !(findings.sequence || findings.keyboard || findings.repeat || findings.repeatedChunk),
            common: !findings.common.exactMatch && !findings.common.partialMatch
        }
    };
}

function renderAnalysis(analysis) {
    meterFill.style.width = `${analysis.score}%`;
    meterFill.style.backgroundColor = getMeterColor(analysis.score);
    scoreLabel.textContent = `${analysis.label} (${analysis.score}/100)`;
    lengthInfo.textContent = `${analysis.length} Zeichen`;
    summary.textContent = buildSummary(analysis);

    Object.entries(analysis.checks).forEach(([key, passed]) => {
        const item = checklist[key];
        item.classList.toggle("pass", passed);
        item.classList.toggle("fail", !passed);
    });

    notes.replaceChildren(...buildNoteItems(analysis));
}

function buildSummary(analysis) {
    if (analysis.score < 35) {
        return "Zu leicht zu erraten. Kurz, häufig oder stark gemustert.";
    }

    if (analysis.score < 60) {
        return "Benutzbar, aber mit klaren Schwächen. Mehr Länge und weniger Muster würden helfen.";
    }

    if (analysis.score < 80) {
        return "Solide Basis. Noch besser wird es mit mehr Länge und klarer Einzigartigkeit.";
    }

    return "Stark für einen lokalen Heuristik-Check. Einzigartig bleiben und nicht mehrfach verwenden.";
}

function buildSuggestions(password, context) {
    const suggestions = [];

    if (password.length < 16) {
        suggestions.push("Auf 16 oder mehr Zeichen gehen.");
    }

    if (!context.isPassphrase && context.charTypeCount < 3) {
        suggestions.push("Mehr Zeichentypen nutzen oder auf eine lange Passphrase wechseln.");
    }

    if (context.uniqueRatio < 0.55) {
        suggestions.push("Weniger Wiederholungen, mehr unterschiedliche Zeichen oder Wörter verwenden.");
    }

    if (context.findings.common.exactMatch || context.findings.common.partialMatch) {
        suggestions.push("Bekannte Wörter, Städte, Vereine oder Standardteile vermeiden.");
    }

    if (context.findings.sequence || context.findings.keyboard) {
        suggestions.push("Keine Folgen wie abc, 1234, qwerty oder qwertz verwenden.");
    }

    if (context.findings.repeat || context.findings.repeatedChunk) {
        suggestions.push("Wiederholte Zeichen und wiederholte Blöcke vermeiden.");
    }

    if (suggestions.length === 0) {
        suggestions.push("Für echte Sicherheit nur einmal verwenden und in einem Passwortmanager speichern.");
    }

    return suggestions;
}

function buildNoteItems(analysis) {
    const entries = [...analysis.messages, ...analysis.suggestions].slice(0, 5);
    return entries.map((text) => {
        const item = document.createElement("li");
        item.textContent = text;
        return item;
    });
}

function getStrengthLabel(score) {
    if (score < 20) return "Sehr schwach";
    if (score < 40) return "Schwach";
    if (score < 60) return "Mittel";
    if (score < 80) return "Gut";
    return "Stark";
}

function getMeterColor(score) {
    if (score < 40) return "var(--weak-color)";
    if (score < 60) return "var(--medium-color)";
    if (score < 80) return "var(--primary-color)";
    return "var(--strong-color)";
}

function hasCommonPattern(normalized) {
    const exactMatch = commonPasswords.includes(normalized);
    const partialMatch = commonPasswords.some((entry) => normalized.includes(entry));

    return { exactMatch, partialMatch };
}

function hasSequence(normalized) {
    return hasStraightRun(normalized, "abcdefghijklmnopqrstuvwxyz", 4) ||
        hasStraightRun(normalized, "0123456789", 4) ||
        hasStraightRun(reverse(normalized), "abcdefghijklmnopqrstuvwxyz", 4) ||
        hasStraightRun(reverse(normalized), "0123456789", 4);
}

function hasKeyboardPattern(normalized) {
    return keyboardRuns.some((row) => containsStraightRun(normalized, row, 4) || containsStraightRun(normalized, reverse(row), 4));
}

function hasRepeatedRuns(password) {
    return /(.)\1{2,}/.test(password);
}

function hasRepeatedChunk(normalized) {
    return /(.{2,6})\1+/.test(normalized);
}

function hasYearPattern(password) {
    return /(19\d{2}|20\d{2})/.test(password);
}

function hasStraightRun(input, alphabet, minLength) {
    return containsStraightRun(input, alphabet, minLength);
}

function containsStraightRun(input, source, minLength) {
    for (let size = source.length; size >= minLength; size -= 1) {
        for (let index = 0; index <= source.length - size; index += 1) {
            const slice = source.slice(index, index + size);
            if (input.includes(slice)) {
                return true;
            }
        }
    }

    return false;
}

function reverse(value) {
    return [...value].reverse().join("");
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function resetView() {
    meterFill.style.width = "0%";
    meterFill.style.backgroundColor = "var(--weak-color)";
    scoreLabel.textContent = "Noch keine Eingabe";
    lengthInfo.textContent = "0 Zeichen";
    summary.textContent = "Lange, einzigartige Passphrasen schneiden deutlich besser ab als kurze Regelpasswörter.";

    Object.values(checklist).forEach((item) => {
        item.classList.remove("pass", "fail");
    });

    notes.replaceChildren(createSingleNote("Prüfung startet nach der Eingabe."));
}

function createSingleNote(text) {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
}

resetView();
