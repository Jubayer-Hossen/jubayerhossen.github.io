// Terminal Portfolio in Vanilla JS

const outputEl = document.getElementById("output");
const inputEl = document.getElementById("command-input");

const COMMANDS = {
    help: {
        description: "List available commands",
        action: function() {
            return `Available commands:
  help         Show this help message
  about        About me
  projects     List my projects
  contact      Contact information
  clear        Clear the terminal`;
        }
    },
    about: {
        description: "About me",
        action: function() {
            return `Jubayer Hossen
A passionate developer focused on building cool web projects.
Skills: JavaScript, HTML, CSS, React, Python, and more.`;
        }
    },
    projects: {
        description: "Showcase of my projects",
        action: function() {
            return `Some of my projects:
- Job Recruiting Agency: https://github.com/Jubayer-Hossen/JobRecruitingAgency
- Chess: https://github.com/Jubayer-Hossen/Chess
- FlappyBALs: https://github.com/Jubayer-Hossen/FlappyBALs
- More on my GitHub!`;
        }
    },
    contact: {
        description: "My contact info",
        action: function() {
            return `You can reach me at:
Email: your.email@example.com
GitHub: https://github.com/Jubayer-Hossen
LinkedIn: https://linkedin.com/in/your-profile`;
        }
    },
    clear: {
        description: "Clear the terminal",
        action: function() {
            outputEl.innerHTML = "";
            return "";
        }
    }
};

function printOutput(text) {
    if (text) {
        outputEl.innerHTML += text + "\n";
        outputEl.scrollTop = outputEl.scrollHeight;
    }
}

function handleCommand(cmd) {
    const command = cmd.trim().toLowerCase();
    if (command === "") return;

    printOutput(`<span class="prompt">$</span> ${cmd}`);

    if (COMMANDS[command]) {
        const result = COMMANDS[command].action();
        if (result) printOutput(result);
    } else {
        printOutput(`Command not found: ${command}
Type 'help' to see available commands.`);
    }
}

inputEl.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        handleCommand(inputEl.value);
        inputEl.value = "";
    }
});

// Show welcome message and prompt
window.onload = function() {
    printOutput("Welcome to Jubayer's Terminal Portfolio!\nType 'help' to get started.");
    inputEl.focus();
};