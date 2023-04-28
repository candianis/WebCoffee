import FlappyBirdScene from "./FlappyBirdScene";

export default class MenuScene extends FlappyBirdScene {
    constructor(config){
        super("Menu", config);

    }

    preload(){
        this.load.image("sky", "assets/sky.png");
    }

    create(){
        super.create();
        const playButtonCallbacks = {
            onClick: this.playButton_onClick, 
            onMouseEnter: this.anyButton_OnMouseEnter,
            onMouseExit: this.anyButton_OnMouseExit
        }

        const scoreButtonCallbacks = {
            onClick: this.scoreButton_OnClick, 
            onMouseEnter: this.anyButton_OnMouseEnter,
            onMouseExit: this.anyButton_OnMouseExit
        }
        const mainMenu = {
            items: [
                {label: "Play", style: {fontSize: "32px", fill: "FFF"}, ...playButtonCallbacks},
                {label: "Score", style: {fontSize: "32px", fill: "FFF"}, ...scoreButtonCallbacks}
            ],
            firstItemPosition: {x: this.config.width / 2, y: this.config.height / 2},
            origin: {x: 0.5, y: 0.5},
            spacing: 15
        }
        this.showMenu(mainMenu);
    }

    playButton_onClick(){
        this.hideMenu();
        this.scene.start("GameScene");
    }

    scoreButton_OnClick(){
        this.hideMenu();
        this.scene.start("ScoreScene");
    }

    anyButton_OnMouseEnter(text){
        text.setFill("#0F0");
    }

    anyButton_OnMouseExit(text){
        text.setFill("#FFF");
    }


}