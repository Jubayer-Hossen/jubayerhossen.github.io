import React, { useState } from "react";
import RPGMap from "./components/RPGMap";
import Terminal from "./components/Terminal";
import DialogBox from "./components/DialogBox";
import HUD from "./components/HUD";
import { initialMapState } from "./game/mapData";
import { parseCommand } from "./game/commands";
import { events } from "./game/events";

export default function App() {
  const [mapState, setMapState] = useState(initialMapState);
  const [dialog, setDialog] = useState(null);
  const [hudStats, setHudStats] = useState({ hp: 100, xp: 0, level: 1, achievements: [] });

  const handleCommand = (input) => {
    const { action, payload } = parseCommand(input);
    if (action === "move") {
      setMapState((prev) => ({
        ...prev,
        position: payload.newPosition,
        currentRegion: payload.region
      }));
      setDialog({ ...events.onMove(payload.region) });
    } else if (action === "inspect") {
      setDialog({ ...events.onInspect(payload.target) });
    } else if (action === "talk") {
      setDialog({ ...events.onTalk(payload.npc) });
    } else if (action === "open") {
      setDialog({ ...events.onOpen(payload.object) });
    } else if (action === "achievement") {
      setHudStats((prev) => ({
        ...prev,
        achievements: [...prev.achievements, payload.achievement]
      }));
      setDialog({ ...events.onAchievement(payload.achievement) });
    } else if (action === "custom") {
      setDialog({ ...events.onCustom(payload) });
    } else {
      setDialog({ title: "Unknown Command", text: "Try something else!" });
    }
  };

  const closeDialog = () => setDialog(null);

  return (
    <div className="flex h-screen w-screen bg-gray-900 overflow-hidden">
      {/* RPG Map */}
      <div className="w-[70%] relative flex flex-col justify-between items-stretch h-full bg-black border-r-4 border-green-900">
        <RPGMap mapState={mapState} onAnimateEvent={setDialog} />
        <HUD stats={hudStats} />
        {dialog && <DialogBox {...dialog} onClose={closeDialog} />}
      </div>
      {/* Terminal */}
      <div className="w-[30%] h-full bg-black flex flex-col">
        <Terminal onCommand={handleCommand} />
      </div>
    </div>
  );
}