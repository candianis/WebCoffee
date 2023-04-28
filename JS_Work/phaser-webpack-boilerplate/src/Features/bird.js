const FLAP_VELOCITY = 250;

export default class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        this.scene = scene;
        scene.add.existing(this);
        this.body.immovable = true;
        scene.physics.add.existing(this);
        scene.input.keyboard.on("keydown-SPACE", this.flap, this);

        this.blocked = false;
    }

    flap(){
        if(this.blocked) return;
        this.body.velocity.y = -FLAP_VELOCITY;
    }

    triggerLoseAnimation(endCallback){
        this.setTint(0xFF0000);
        this.body.velocity = {x: 0, y: 0};
        this.flap();
        this.blocked = true;
        const loseTimer = this.scene.time.addEvent({
            delay: 2,
            callback: ()=> {
                this.checkLoseAnimation(loseTimer, endCallback);
            },
            loop: true
        })
    }

    checkLoseAnimation(timer, callback) {
        if(this.getBounds().up < this.scene.config.height){
            timer.remove();
            endCallback();
        } 
    }
}