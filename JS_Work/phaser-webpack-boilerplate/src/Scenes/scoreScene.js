import Score from "../Features/score";
import FlappyBirdScene from "./FlappyBirdScene";

const HIGH_SCORE_LABEL = "";
const HIGH_SCORE_SAVE_KEY = "high"

export default class ScoreScene extends FlappyBirdScene {
    constructor(config){
        super("ScoreScene", config);
        this.score = null; 
    }

    create() {
        super.create();
        this.score = new Score(this, this.config.width / 2, this.config.height / 2, this.layers.ui);
        const loadedHighScore = parseInt(localStorage.getItem(HIGH_SCORE_SAVE_KEY));
        let highscoreValue = isNan(loadedHighScore) ? 0 : loadedHighScore;
        const highScoreText = scene.add.text(this.config.width / 2, this.config.height / 2, HIGH_SCORE_LABEL + highscoreValue, {fontSize: "32px"}).setOrigin(0.5);
        this.layers.ui.add(highScoreText);

        const back = this.add.text(this.config.width - 16, 16, "Back", {fontSize: "24px"})
        .setOrigin(1, 0)
        .setInteractive();

        back.on("pointerup", ()=> this.scene.start("MenuScene"));
        back.on("pointerover", ()=> back.setFill("0F0"));
        back.on("pointerout", ()=> back.setFill("#FFF"));
    }
}