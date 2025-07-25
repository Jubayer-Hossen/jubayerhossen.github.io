import React from "react";
export default function HUD({ stats }) {
  return (
    <div className="absolute top-2 left-2 flex items-center space-x-4 z-40 font-pixel text-green-200">
      <div>HP: <span className="font-bold">{stats.hp}</span></div>
      <div>XP: <span className="font-bold">{stats.xp}</span></div>
      <div>Level: <span className="font-bold">{stats.level}</span></div>
      <div>Achievements: <span>{stats.achievements.length}</span></div>
    </div>
  );
}