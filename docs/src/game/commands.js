import mapData from "./mapData";

export function parseCommand(input) {
  input = input.toLowerCase().trim();

  if (input.startsWith("move") || input.startsWith("go")) {
    if (input.includes("north")) return {
      action: "move",
      payload: { direction: "north", newPosition: {/* logic here */}, region: "library" }
    };
    if (input.includes("east")) return {
      action: "move",
      payload: { direction: "east", newPosition: {/* logic here */}, region: "tavern" }
    };
    // More movement logic...
  }
  if (input.startsWith("fast travel")) {
    // e.g., fast travel library
    const place = input.split("fast travel ")[1];
    if (mapData.teleportPoints[place]) {
      return {
        action: "move",
        payload: { direction: "teleport", newPosition: mapData.teleportPoints[place], region: place }
      };
    }
  }
  if (input.startsWith("inspect")) {
    const target = input.split("inspect ")[1];
    return { action: "inspect", payload: { target } };
  }
  if (input.startsWith("talk")) {
    const npc = input.split("talk ")[1];
    return { action: "talk", payload: { npc } };
  }
  if (input.startsWith("open")) {
    const object = input.split("open ")[1];
    return { action: "open", payload: { object } };
  }
  if (input === "dance" || input === "cheat") {
    return { action: "custom", payload: { command: input } };
  }
  return { action: "unknown", payload: {} };
}