# The Quest for Your Portfolio

A one-page, interactive RPG-style portfolio where visitors explore your “career world” via a pixel-art map and retro terminal interface.

## Features

- **Pixel-art RPG world**: Explore regions like Castle (About), Tavern (Contact), Guild Hall (Projects).
- **Terminal commands**: Type to move, inspect, talk, open, or trigger fun easter eggs.
- **Animated map**: Character moves, regions animate, and popups describe your work.
- **Achievements & secrets**: Unlock hidden lore and fun facts.
- **Retro styling**: 90s terminal on the right, pixel-art adventure on the left.

## Tech Stack

- React
- Phaser.js (for RPG visuals)
- Xterm.js (for terminal)
- TailwindCSS
- Custom pixel-art assets

## Getting Started

1. `npm install`
2. `npm run start`
3. Add your pixel art to `/public/assets` and update RPGMap logic.
4. Edit `/src/game/events.js` and `/src/game/mapData.js` with your story and projects!

## Customization Tips

- **Inventory/skills**: Add fun “items” to collect as skills.
- **NPC Dialog**: Expand `/src/game/events.js` for more interactions.
- **Easter eggs**: Add custom commands or hidden rooms.
- **Progress save**: Use `localStorage` for saving game state.

---

**Built with love & imagination.**