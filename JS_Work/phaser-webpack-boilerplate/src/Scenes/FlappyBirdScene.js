export default class FlappyBirdScene extends Phaser.Scene {
    constructor(sceneName, config){
        super(sceneName);
        this.config = config;
        this.layers = { 
            background: null,
            game: null,
            ui: null
        }
    }

    create(){
        this.layers.background = this.add.layer(),
        this.layers.game = this.add.layer(),
        this.layers.ui = this.add.layer()

        var sky = this.add.image(0, 0, "sky").setOrigin(0);
        this.layers.background.add(sky);
    }

    showMenu(menu){
        let yPos = menu.firstItemPosition.y;
        
        menu.items.forEach(item => {
            const textObject = this.add.text(menu.firstItemPosition.x, yPos, item.label, item.style)
            .setOrigin(menu.origin.x, menu.origin.y)
            .setInteractive();
            yPos += menu.spacing;
            textObject.on("pointerup", item.onClick, this);
            textObject.on("pointerover", ()=> {item.onMouseEnter(textObject)}, this);
            textObject.on("pointerout", ()=> {item.onMouseExit(textObject)}, this);
        })
    }
}