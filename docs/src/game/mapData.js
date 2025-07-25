export const initialMapState = {
  position: { x: 5, y: 5 }, // grid coords
  currentRegion: "overworld",
  visited: [],
};

export default {
  regions: [
    { name: "Castle", coords: [2, 2], type: "about" },
    { name: "Tavern", coords: [8, 2], type: "contact" },
    { name: "Guild Hall", coords: [5, 8], type: "projects" },
    { name: "Library", coords: [2, 8], type: "resume" },
    { name: "Hidden Dungeon", coords: [9, 9], type: "easterEgg" }
  ],
  teleportPoints: {
    library: [2, 8],
    castle: [2, 2],
    tavern: [8, 2],
    "guild hall": [5, 8],
    dungeon: [9, 9],
  }
};