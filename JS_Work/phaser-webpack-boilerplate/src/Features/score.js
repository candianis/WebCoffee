const CURRENT_SCORE_LABEL = "Score: ";
const HIGH_SCORE_LABEL = "High Score: ";
const HIGH_SCORE_SAVE_KEY = "high_score";

export default class Score {
    constructor(scene, x, y, layer){
        this.scene = scene;
        this.currentScoreValue = 0;

        this.layer = layer;

        var loadedHighScore = parseInt(localStorage.getItem(HIGH_SCORE_SAVE_KEY));
        if(loadedHighScore == NaN){
            this.highscoreValue = 0;
        }
        else{
            this.highscoreValue = loadedHighScore;
        }
        this.highscoreValue = isNaN(loadedHighScore)? 0 : loadedHighScore;
        this.currentScoreText = scene.add.text(x, y, "Score: " + this.currentScoreValue);
        this.highscoreText = scene.add.text(x, y +10, "High Score: " + this.highscoreValue).setOrigin(0);

        layer.add([this.currentScoreText, this.highscoreText]);
    }

    addScore(){
        this.currentScoreValue ++;
        this.currentScoreText.setText("Score: ")
    }

    checkHighScore(){
        localStorage.setItem(HIGH_SCORE_SAVE_KEY, this.currentScoreValue);
        
    }

    resetScore(){
        this.currentScoreValue = 0;
        this.currentScoreText.setText
    }
}