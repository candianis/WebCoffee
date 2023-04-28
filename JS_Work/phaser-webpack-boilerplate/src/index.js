import Phaser, { Game, Scene } from "phaser";
import GameScene from "./Scenes/game-scene";
import MenuScene from "./Scenes/menu-scene";
import ScoreScene from "./Scenes/scoreScene";

const SHARED_CONFIG = {
  width: 800,
  heigth: 600,

}

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: "arcade",
    arcade:{
      gravity: {y: 400},
      debug: true
    }
    },
    scene: [
      new GameScene(SHARED_CONFIG),
      new MenuScene(SHARED_CONFIG),
      new ScoreScene(SHARED_CONFIG)
    ]
  }

var game = new Phaser.Game(config);