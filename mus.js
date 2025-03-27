const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

const btn = document.querySelector("#btn");
const darkModeBtn = document.querySelector("#dark-mode");
const historyDiv = document.querySelector("#history");

// Greet user on load
window.onload = () => {
    speak("Hello! How may I assist you today?");
};

// Start listening when button is clicked
btn.addEventListener("click", () => {
    recognition.start();
});

// Capture speech and process commands
recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log("You said:", command);
    addToHistory(command);
    handleCommands(command);
};

// Speak function
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

// Add user commands to history
function addToHistory(command) {
    const p = document.createElement("p");
    p.textContent = "User: " + command;
    historyDiv.appendChild(p);
}

// Handle commands
function handleCommands(command) {
    if (command.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com", "_blank");
    } else if (command.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com", "_blank");
    } else if (command.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com", "_blank");
    } else if (command.includes("what's the time") || command.includes("tell me the time")) {
        const time = new Date().toLocaleTimeString();
        speak("The time is " + time);
    } else if (command.includes("what's today's date") || command.includes("tell me the date")) {
        const date = new Date().toDateString();
        speak("Today's date is " + date);
    } else if (command.includes("search for")) {
        const query = command.replace("search for", "").trim();
        speak("Searching Google for " + query);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
    } else if (command.includes("what is")) {
        calculateMath(command);
    } else {
        speak("I didn't understand. Try saying 'Open YouTube' or 'What's the time?'");
    }
}

// Math calculation feature
function calculateMath(command) {
    try {
        const expression = command.replace("what is", "").trim();
        const result = eval(expression);
        speak(`The answer is ${result}`);
    } catch {
        speak("I couldn't calculate that.");
    }
}

// Toggle dark mode
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});







