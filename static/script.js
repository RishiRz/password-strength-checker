
const input = document.getElementById("password");
const form = document.getElementById("passwordForm");
const toggle = document.getElementById("toggle");
const meterFill = document.getElementById("meterFill");
const strength = document.getElementById("strength");
const score = document.getElementById("score");
const checks = document.getElementById("checks");
const suggestions = document.getElementById("suggestions");
const error = document.getElementById("error");

const commonPasswords = new Set([
    "password", "password123", "123456",
    "12345678", "qwerty", "admin",
    "letmein", "welcome"
]);

function evaluate(password) {
    const checksData = [
        ["At least 8 characters", password.length >= 8],
        ["At least 12 characters", password.length >= 12],
        ["Lowercase letters", /[a-z]/.test(password)],
        ["Uppercase letters", /[A-Z]/.test(password)],
        ["Numbers", /\d/.test(password)],
        ["Special characters", /[^a-zA-Z0-9]/.test(password)]
    ];

    let points = checksData.filter(item => item[1]).length;
    let level;

    if (commonPasswords.has(password.toLowerCase())) {
        points = 0;
        level = "Very Weak";
    } else if (password.length < 8 || points <= 2) {
        level = "Weak";
    } else if (points <= 3) {
        level = "Medium";
    } else if (points <= 4) {
        level = "Strong";
    } else {
        level = "Very Strong";
    }

    return { checksData, points, level };
}

function renderList(element, items) {
    element.replaceChildren();

    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        element.appendChild(li);
    });
}

function updateMeter() {
    const password = input.value;

    if (!password) {
        meterFill.style.width = "0%";
        strength.textContent = "Not checked";
        score.textContent = "0 / 6";
        renderList(checks, ["Enter a password to begin."]);
        renderList(suggestions, ["Use a long, unique password."]);
        return;
    }

    const result = evaluate(password);
    const colors = {
        "Very Weak": "#ef4444",
        "Weak": "#f97316",
        "Medium": "#eab308",
        "Strong": "#22c55e",
        "Very Strong": "#62e6bd"
    };

    meterFill.style.width = `${result.points / 6 * 100}%`;
    meterFill.style.background = colors[result.level];
    strength.textContent = result.level;
    score.textContent = `${result.points} / 6`;

    renderList(checks, result.checksData.map(
        ([label, passed]) => `${passed ? "✓" : "✗"} ${label}`
    ));

    checks.querySelectorAll("li").forEach((li, index) => {
        li.className = result.checksData[index][1] ? "pass" : "fail";
    });

    const tips = [];

    if (password.length < 8) tips.push("Use at least 8 characters.");
    if (password.length < 12) tips.push("Aim for 12 or more characters.");
    if (!/[a-z]/.test(password)) tips.push("Include lowercase letters.");
    if (!/[A-Z]/.test(password)) tips.push("Include uppercase letters.");
    if (!/\d/.test(password)) tips.push("Include numbers.");
    if (!/[^a-zA-Z0-9]/.test(password)) {
        tips.push("Include special characters.");
    }
    if (commonPasswords.has(password.toLowerCase())) {
        tips.unshift("Avoid common and easily guessed passwords.");
    }

    renderList(suggestions, tips.length ? tips : [
        "All basic character checks passed. Make sure your password is unique and unpredictable."
    ]);
}

input.addEventListener("input", () => {
    error.textContent = "";
    updateMeter();
});

toggle.addEventListener("click", () => {
    const hidden = input.type === "password";
    input.type = hidden ? "text" : "password";
    toggle.textContent = hidden ? "Hide" : "Show";
});

form.addEventListener("submit", async event => {
    event.preventDefault();
    error.textContent = "";

    try {
        const response = await fetch("/check-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: input.value })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Analysis failed.");
        }

        // Display the authoritative Python result.
        strength.textContent = result.strength;
        score.textContent = `${result.score} / 6`;

        const colors = {
            "Very Weak": "#ef4444",
            "Weak": "#f97316",
            "Medium": "#eab308",
            "Strong": "#22c55e",
            "Very Strong": "#62e6bd"
        };

        meterFill.style.width = `${result.score / 6 * 100}%`;
        meterFill.style.background = colors[result.strength]
            || "#64748b";

        renderList(suggestions, result.suggestions.length
            ? result.suggestions
            : ["All basic character checks passed."]);
    } catch (err) {
        error.textContent = err.message || "Unable to analyze password.";
    }
});

updateMeter();
