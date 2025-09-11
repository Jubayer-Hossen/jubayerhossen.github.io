const welcomeEl = document.getElementById("welcome-message");
const terminalEl = document.getElementById('terminal');

let outputEl = null;
let inputEl = null;
let inputLineEl = null;
let contentEl = null;
const promptHTML = '<span class="prompt">Visitor@JubayerHossen.github.io&gt;</span> ';

const COMMANDS = {
    "--help": {
        description: "List available commands",
        action: function() {
            return `Available commands:
  --help         Show this help message
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

// Backwards-compat: map 'help' to '--help' if present so both work
if (typeof COMMANDS !== 'undefined' && COMMANDS['--help'] && !COMMANDS['help']) {
    COMMANDS['help'] = COMMANDS['--help'];
}

function printOutput(text) {
    if (!contentEl || !inputLineEl) return;
    if (text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = formatTerminalText(text).replace(/\n/g, '<br>');
        contentEl.insertBefore(line, inputLineEl);
    }
    contentEl.scrollTop = contentEl.scrollHeight;
}

function formatTerminalText(text) {
    if (!text) return '';
    let out = escapeHtml(text);
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    out = out.replace(urlRegex, function(match) {
        return `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    out = out.replace(emailRegex, function(match) {
        return `<a href="mailto:${match}">${match}</a>`;
    });
    return out;
}

function clearOutput() {
    if (!contentEl || !inputLineEl) return;
    const nodes = Array.from(contentEl.childNodes);
    for (const n of nodes) {
        if (n === inputLineEl) continue;
        if (n.id === 'ascii-art' || n.id === 'welcome-message') continue;
        contentEl.removeChild(n);
    }
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
    showInputLine(false);

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
        printOutput(`Command not found: ${command}\nType '--help' or press 'h' to see available commands.`);
    }

    sleep(150).then(() => {
    inputEl.value = '';
    showInputLine(true);
    });
}

function buildTerminalElements() {
    contentEl = document.getElementById('terminal-content');
    if (!contentEl) {
        contentEl = document.createElement('div');
        contentEl.id = 'terminal-content';
        contentEl.setAttribute('aria-live', 'polite');
        terminalEl.appendChild(contentEl);
    }

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

    contentEl.appendChild(inputLineEl);

    inputEl.addEventListener('keydown', function(e) {
        if ((e.key === 'h' || e.key === 'H') && !e.ctrlKey && !e.metaKey && !e.altKey && inputEl.value.trim() === '') {
            e.preventDefault();
            handleCommand('help');
            return;
        }
        if (e.key === 'Enter') {
            const value = inputEl.value;
            handleCommand(value);
        }
    });

    inputEl.addEventListener('blur', function() {
        setTimeout(() => {
            const active = document.activeElement;
            if (!inputEl || inputEl.disabled) return;
            if (active && (active.tagName === 'A' || active.isContentEditable)) return;
            inputEl.focus();
        }, 0);
    });

    document.addEventListener('click', function(e) {
        if (!inputEl || inputEl.disabled) return;
        if (e.target.closest && e.target.closest('#terminal-content a')) return; 
        inputEl.focus();
    });

    window.addEventListener('focus', function() {
        if (inputEl && !inputEl.disabled) inputEl.focus();
    });

    document.addEventListener('keydown', function(e) {
        if (!inputEl || inputEl.disabled) return;
        const active = document.activeElement;
        const isTypingArea = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);

        if (!isTypingArea && (e.key === 'h' || e.key === 'H') && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            handleCommand('help');
            return;
        }

        if (!isTypingArea && e.key && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            inputEl.focus();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buildTerminalElements();
    showInputLine(false);
});

window.onload = async function() {
    welcomeEl.innerHTML = "Welcome to my Terminal Portfolio!<br>Type '<span style='color:#7dd3fc'>--help</span>' or press '<span style='color:#7dd3fc'>h</span>' to get started.";
    await sleep(600);
    await sleep(300);
    showInputLine(true);
    addBlinkingCursor();
};

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/\"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

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