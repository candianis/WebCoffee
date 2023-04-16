import Bird from "../Features/bird";
import PipeSystem from "../Features/pipes";
import Score from "../Features/score";

const PIPE_SPAWN_TIME = 3000;
const PIPE_VELOCITY = 150;

export default class GameScene extends Phaser.Scene {
    constructor(config) {
        super();
        this.config = config;
        this.bird = null;
        this.pipes = null;
        this.score = null;
        this.layers = {
            background: null,
            game: null,
            ui: null
        }
    }

    //Awake
    preload(){
        this.load.image("sky", "assets/sky.png");
        this.load.image("bird", "assets/bird.png");
        this.load.image("pipe", "assets/pipe.png");
    }

    create(){
        this.layers.background = this.add.layer(),
        this.layers.game = this.add.layer(),
        this.layers.ui = this.add.layer()

        var sky = this.add.image(0, 0, "sky").setOrigin(0);
        this.layers.background.add(sky);
        this.bird = new Bird(this, 100, this.config.height / 2, "bird");
        this.layers.game.add(this.bird);
        this.pipes = new PipeSystem(this);
        this.layers.game = new PipeSystem(this.pipes);
        this.score = new Score(this, 16, 16).setOrigin(0);
        this.layers.ui.add(this.score);

        this.physics.add.collider(this.bird, this.pipes.getGroup(), this.gameOver, null, this);

        this.pipes.start();
    }

    update(){
        this.pipes.update();
    }

    gameOver(){
        alert("You lose");
        this.scene.restart();
      }
}