import Bird from "../Features/bird";
import PipeSystem from "../Features/pipes";
import Score from "../Features/score";
import FlappyBirdScene from "./FlappyBirdScene";

const PIPE_SPAWN_TIME = 3000;
const PIPE_VELOCITY = 150;

export default class GameScene extends FlappyBirdScene {
    constructor(config) {
        super("GameScene", config);
        this.bird = null;
        this.pipes = null;
        this.score = null;
        this.pauseButton = null;
        this.paused = false;
    }

    //Awake
    preload(){
        this.load.image("sky", "assets/sky.png");
        this.load.image("bird", "assets/bird.png");
        this.load.image("pipe", "assets/pipe.png");
        this.load.image("pause_button", "assets/pause.png");
    }

    create(){
        super.create();

        this.bird = new Bird(this, 100, this.config.height / 2, "bird");
        this.layers.game.add(this.bird);
        this.pipes = new PipeSystem(this, this.layers.game);
        this.layers.game = new PipeSystem(this.pipes);
        this.score = new Score(this, 16, 16).setOrigin(0);
        this.layers.ui.add(this.score);

        this.pauseButton = this.add.image(this.config.width - 10, 10, "pause-button").
        setOrigin(1,0)
        .setInteractive()
        .setScale(3)
        .on("pointerup", this.pause, this);

        this.physics.add.collider(this.bird, this.pipes.getGroup(), this.gameOver, null, this);

        this.pipes.onPipeExited = ()=>{
            this.score.addScore(1);
        }

        this.pipes.start();
    }

    update() {
        this.paused = true;
        this.bird.checkOffBounds(()=>{
            this.gameOver();
        })
        this.pipes.update();
    }



    gameOver() {
        this.pipeSystem.stop();
        this.pauseButton.setVisible(false);
        this.layers.game.bringToTop(this.bird);
        this.bird.triggerLoseAnimation(()=>{
            this.score.checkHighScore();
            this.scene.restart();
        })
    }

    pause(){
        this.physics.pause();
        this.paused = true;

        const continueButtonCallbacks = {
            onClick: ()=> function() {this.resume()},
            onMouseEnter: function(text){text.setFill("#0F0")},
            onMouseExit: function(text) {text.setFill("#FFF")}
        }
  
        const quitButtonCallbacks = {
            onClick: function() {this.scene.start("MainScene")},
            onMouseEnter: function(text) {text.setFill("#F00")},
            onMouseExit: function(text) {text.setFill("#FFF")}
        }

        const mainMenu = {
            items: [
                {label: "Continue", style: {fontsize: "32px", fill: "#FFF"}, ...continueButtonCallbacks},
                {label: "Quit", style: {fontsize: "32px", fill: "#FFF"}, ...quitButtonCallbacks}
            ],
            firstItemPosition: {x: this.config.width / 2, y: this.config.height / 2},
            origin: {x: 0.5, y: 0.5},
            spacing: 45
        }
        this.showMenu(mainMenu);
    }

    resume() {
        this.physics.resume();
        this.paused = false;
    }
}