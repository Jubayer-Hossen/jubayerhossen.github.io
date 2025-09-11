// Terminal Portfolio in Vanilla JS

const welcomeEl = document.getElementById("welcome-message");
const terminalEl = document.getElementById('terminal');

// We'll create these elements dynamically so index.html stays minimal
let outputEl = null;
let inputEl = null;
let inputLineEl = null;
let contentEl = null;
const promptHTML = '<span class="prompt">Visitor@JubayerHossen.github.io&gt;</span> ';

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
            return `Hi, I'm Jubayer Hossen.
A student of Computer Science and Engineering at Independent University, Bangladesh.`;
        }
    },
    projects: {
        description: "Showcase of my projects",
        action: function() {
            return `Some of my projects:
- Job Recruiting Agency: https://github.com/Jubayer-Hossen/JobRecruitingAgency
- Chess: https://github.com/Jubayer-Hossen/Chess
- More on my GitHub!`;
        }
    },
    contact: {
        description: "My contact info",
        action: function() {
            return `You can reach me at:
Email: jubayerhossen.edu@gmail.com
GitHub: https://github.com/jubayer-hossen
LinkedIn: https://linkedin.com/in/jubayer-hossen`;
        }
    },
    clear: {
        description: "Clear the terminal",
        action: function() {
            clearOutput();
            return "";
        }
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function printOutput(text) {
    if (!contentEl || !inputLineEl) return;
    if (text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
        // insert before the input-line so the input is pushed down
        contentEl.insertBefore(line, inputLineEl);
    }
    // keep scroll at bottom so latest lines are visible
    contentEl.scrollTop = contentEl.scrollHeight;
}

function clearOutput() {
    if (!contentEl || !inputLineEl) return;
    // remove all children except the inputLineEl and preserve ascii-art & welcome-message
    const nodes = Array.from(contentEl.childNodes);
    for (const n of nodes) {
        if (n === inputLineEl) continue;
        if (n.id === 'ascii-art' || n.id === 'welcome-message') continue;
        contentEl.removeChild(n);
    }
    // keep scroll at top
    contentEl.scrollTop = 0;
}

function showInputLine(show = true) {
    if (!inputLineEl || !inputEl) return;
    if (show) {
        inputLineEl.style.display = '';
        inputEl.disabled = false;
        inputEl.focus();
    } else {
        inputLineEl.style.display = 'none';
        inputEl.disabled = true;
    }
}

function handleCommand(cmd) {
    const command = cmd.trim().toLowerCase();
    if (command === "") return;
    // Temporarily hide/disable the input while processing, like a real terminal
    showInputLine(false);

    // Echo the entered command into output (with prompt HTML) as history
    if (contentEl && inputLineEl) {
        const echoLine = document.createElement('div');
        echoLine.className = 'terminal-line';
        echoLine.innerHTML = promptHTML + escapeHtml(cmd);
        contentEl.insertBefore(echoLine, inputLineEl);
    }

    if (COMMANDS[command]) {
        const result = COMMANDS[command].action();
        if (result) printOutput(result);
    } else {
        printOutput(`Command not found: ${command}\nType 'help' to see available commands.`);
    }

    // Small delay to mimic processing, then show the prompt again
    // Clear the typed value and re-enable input
    sleep(150).then(() => {
    inputEl.value = '';
    showInputLine(true);
    });
}

// We create the output and input-line at runtime so index.html can be minimal.
function buildTerminalElements() {
    // If index.html already includes #terminal-content (we moved ascii & welcome into it), reuse it.
    contentEl = document.getElementById('terminal-content');
    if (!contentEl) {
        // content container that will hold output lines and input-line at the end
        contentEl = document.createElement('div');
        contentEl.id = 'terminal-content';
        contentEl.setAttribute('aria-live', 'polite');
        terminalEl.appendChild(contentEl);
    }

    // input-line (will be appended into content so new lines can be inserted before it)
    inputLineEl = document.createElement('div');
    inputLineEl.id = 'input-line';
    inputLineEl.style.display = 'none';

    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.innerHTML = 'Visitor@JubayerHossen.github.io&gt;';
    inputLineEl.appendChild(promptSpan);

    inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.id = 'command-input';
    inputEl.autocomplete = 'off';
    inputEl.autofocus = true;
    inputLineEl.appendChild(inputEl);

    // append input-line as the last child of content
    contentEl.appendChild(inputLineEl);

    // wire key handler
    inputEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const value = inputEl.value;
            handleCommand(value);
        }
    });
}

// Show welcome message and prompt
document.addEventListener('DOMContentLoaded', () => {
    buildTerminalElements();
    showInputLine(false);
});

window.onload = async function() {
    welcomeEl.innerHTML = "Welcome to my Terminal Portfolio!<br>Type '<span style='color:#7dd3fc'>help</span>' or press '<span style='color:#7dd3fc'>h</span>' to get started.";
    await sleep(600);
    await sleep(300);
    showInputLine(true);
    addBlinkingCursor();
};

// Small helper to avoid injecting raw user input as HTML
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/\"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// Blinking cursor for a more realistic terminal
function addBlinkingCursor() {
    if (!inputLineEl || !inputEl) return;
    let cursor = inputLineEl.querySelector('.blinking-cursor');
    if (!cursor) {
        cursor = document.createElement('span');
        cursor.className = 'blinking-cursor';
        cursor.textContent = '|';
        inputLineEl.appendChild(cursor);
    }
    inputEl.addEventListener('focus', () => cursor.style.display = 'inline-block');
    inputEl.addEventListener('blur', () => cursor.style.display = 'none');
}