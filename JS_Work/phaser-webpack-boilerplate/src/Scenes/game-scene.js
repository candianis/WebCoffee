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
        this.pipeSystem = null;
        this.score = null;
        this.pauseButton = null;
        this.paused = false;
        this.isGameOver = false;
        this.birdCollider = null;
    }

    //Awake
    preload(){
        this.load.image("pipe", "assets/pipe.png");
        this.load.image("pause_button", "assets/pause.png");
        this.load.spritesheet("bird", "assets/birdSprite.png", {frameWidth: 16, frameHeight: 16});
    }

    create(){
        super.create();

        this.bird = new Bird(this, 100, this.config.height / 2, "bird");
        this.layers.game.add(this.bird);
        this.pipeSystem = new PipeSystem(this, this.layers.game);
        this.score = new Score(this, 16, 16, this.layers.ui);

        this.pauseButton = this.add.image(this.config.width - 10, 10, "pause-button").
        setOrigin(1,0)
        .setInteractive()
        .setScale(3)
        .on("pointerup", this.pause, this);

        this.birdCollider = this.physics.add.collider(this.bird, this.pipeSystem.getGroup(), this.gameOver, null, this);

        this.pipeSystem.onPipeExited = ()=>{
            this.score.addScore(1);
        }

        this.pipeSystem.start();
    }

    update() {
        if(this.paused || this.isGameOver) return;
        this.bird.checkOffBounds(()=>{
            this.gameOver();
        })
        this.pipeSystem.update();
    }



    gameOver() {
        this.isGameOver = true;
        this.birdCollider.collideCallback = null;
        this.pipeSystem.stop();
        this.pauseButton.setVisible(false);
        this.layers.game.bringToTop(this.bird);
        this.bird.triggerLoseAnimation(()=>{
            this.score.checkHighScore();
            //this.scene.restart();
            this.showGameOverMenu();
        })
    }

    pause(){
        this.physics.pause();
        this.paused = true;
        this.pipeSystem.pause();
        this.pauseButton.setVisible(false);
        this.showGameOverMenuMenu();
    }

    resume() {
        this.physics.resume();
        this.paused = false;
        this.pipeSystem.resume();
        this.hideMenu();
        this.pauseButton.setVisible(true);
    }

    showGameOverMenu(){
        const retryButtonCallbacks = {
            onClick: ()=> function() {
                this.hideMenu();
                this.scene.restart();
            },
            onMouseEnter: function(text){text.setFill("#0F0")},
            onMouseExit: function(text) {text.setFill("#FFF")}
        }
  
        const quitButtonCallbacks = {
            onClick: function() {
                this.scene.hideMenu();
                this.scene.start("MainScene");
            },
            onMouseEnter: function(text) {text.setFill("#F00")},
            onMouseExit: function(text) {text.setFill("#FFF")}
        }
        const gameOverMenu = {
            items: [
                {label: "Retry", style: {fontsize: "32px", fill: "#FFF"}, ...retryButtonCallbacks},
                {label: "Quit", style: {fontsize: "32px", fill: "#FFF"}, ...quitButtonCallbacks}
            ],
            firstItemPosition: {x: this.config.width / 2, y: this.config.height / 2},
            origin: {x: 0.5, y: 0.5},
            spacing: 45
        }
        this.showMenu(gameOverMenu);
    }
}