const FLAP_VELOCITY = 250;

export default class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.input.keyboard.on("keydown-SPACE", this.flap, this);
    }

    flap(){
        this.body.velocity.y = -FLAP_VELOCITY;
    }
}