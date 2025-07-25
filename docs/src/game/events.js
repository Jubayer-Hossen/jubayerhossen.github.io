export const events = {
  onMove(region) {
    const flavor = {
      library: "You arrive at the Library. The air smells of old books.",
      castle: "You approach the Castle. Banners flutter in the wind.",
      tavern: "You enter the Tavern. The chatter is lively.",
      "guild hall": "You step into the Guild Hall. Quests abound.",
      dungeon: "You find a hidden entrance to a secret Dungeon!",
      overworld: "You wander the Overworld, seeking adventure."
    };
    return {
      title: `Entering ${region.charAt(0).toUpperCase() + region.slice(1)}`,
      text: flavor[region] || "You explore the unknown..."
    };
  },
  onInspect(target) {
    // You'd fetch About, Projects, etc, here
    if (target === "castle")
      return { title: "About Me", text: "Your origin story goes here..." };
    if (target === "guild hall")
      return { title: "Projects", text: "Project 1: ...\nProject 2: ..." };
    if (target === "library")
      return { title: "Resume & Skills", text: "Skills: ...\nResume: ..." };
    if (target === "tavern")
      return { title: "Contact", text: "Contact me at: ..." };
    return { title: "Nothing Interesting", text: "You find nothing of note." };
  },
  onTalk(npc) {
    if (npc === "bartender")
      return { title: "Bartender", text: "Thirsty for knowledge? Or something stronger?" };
    if (npc === "guild master")
      return { title: "Guild Master", text: "Welcome, adventurer! Ready for your next quest?" };
    return { title: "Nobody Responds", text: "There's no one here by that name." };
  },
  onOpen(object) {
    if (object === "chest")
      return { title: "Resume", text: "Download your resume: [Resume.pdf]" };
    return { title: "Locked", text: "It won't budge." };
  },
  onAchievement(achievement) {
    return { title: "Achievement Unlocked!", text: achievement };
  },
  onCustom({ command }) {
    if (command === "dance")
      return { title: "You Dance!", text: "Your character does a little jig." };
    if (command === "cheat")
      return { title: "Cheat Code", text: "You discover a secret room!" };
    return { title: "??", text: "Nothing happens..." };
  }
};