import React, { useEffect, useRef } from "react";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const Terminal = ({ onCommand }) => {
  const termRef = useRef(null);
  const xtermRef = useRef(null);

  useEffect(() => {
    const xterm = new XTerm({
      theme: {
        background: "#000",
        foreground: "#00ff00",
        fontFamily: "'Press Start 2P', monospace",
        cursor: "block",
      },
      fontSize: 14,
      cursorBlink: true,
      rows: 24,
      cols: 60,
    });
    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);

    xtermRef.current = xterm;
    xterm.open(termRef.current);
    fitAddon.fit();

    xterm.write("Welcome to the Quest for Your Portfolio!\r\nType a command (e.g., move north, inspect castle):\r\n> ");

    let input = "";
    xterm.onKey(({ key, domEvent }) => {
      if (domEvent.key === "Enter") {
        xterm.write("\r\n");
        onCommand(input);
        xterm.write("> ");
        input = "";
      } else if (domEvent.key === "Backspace") {
        if (input.length > 0) {
          xterm.write("\b \b");
          input = input.slice(0, -1);
        }
      } else if (domEvent.key.length === 1) {
        xterm.write(key);
        input += key;
      }
    });

    return () => {
      xterm.dispose();
    };
  }, [onCommand]);

  return (
    <div ref={termRef} className="h-full w-full bg-black" />
  );
};

export default Terminal;