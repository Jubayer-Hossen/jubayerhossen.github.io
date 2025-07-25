import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import mapData from "../game/mapData";

// You would replace this with your own Phaser scene that loads your assets
class RPGScene extends Phaser.Scene {
  constructor(mapState, onAnimateEvent) {
    super({ key: "RPGScene" });
    this.mapState = mapState;
    this.onAnimateEvent = onAnimateEvent;
  }
  preload() {
    this.load.image('tiles', 'D:\\All-programmes\\jubayerhossen.github.io\\docs\\public\\assets\\characters\\player.png');
    // Load player sprite, tilesets, etc.
    this.load.spritesheet('player', 'D:\\All-programmes\\jubayerhossen.github.io\\docs\\public\\assets\\characters\\player.png', { frameWidth: 32, frameHeight: 32 });
  }
  create() {
    // Create tilemap, player, etc.
    // Add parallax background, etc.
    // Animate on region change, etc.
  }
  update() {
    // Move player sprite based on this.mapState.position
  }
  // Add methods for animating events
}

const RPGMap = ({ mapState, onAnimateEvent }) => {
  const phaserRef = useRef(null);

  useEffect(() => {
    let game;
    if (!phaserRef.current) {
      phaserRef.current = document.createElement("div");
      document.getElementById("phaser-container").appendChild(phaserRef.current);
      game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 1024,
        height: 768,
        parent: phaserRef.current,
        scene: [new RPGScene(mapState, onAnimateEvent)],
        transparent: true,
        pixelArt: true,
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      });
    }
    return () => {
      if (game) {
        game.destroy(true);
      }
      if (phaserRef.current) {
        phaserRef.current.remove();
        phaserRef.current = null;
      }
    };
  }, [mapState, onAnimateEvent]);

  return (
    <div id="phaser-container" className="absolute inset-0 z-0" />
  );
};

export default RPGMap;