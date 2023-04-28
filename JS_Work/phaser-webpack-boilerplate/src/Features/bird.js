const FLAP_VELOCITY = 250;
const OFFBOUNDS_THRESHOLD = 15;

export default class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.immovable = true;
        scene.input.keyboard.on("keydown-SPACE", this.flap, this);

        this.blocked = false;
        this.createAnimations();
        this.play("fly");
        this.setScale(3);
        this.flipX = true;
        
    }

    createAnimations(){
        this.scene.anims.create({
            key: "fly",
            frames: this.scene.anims.generateFrameNumbers("bird", {start: 8, end: 15}),
            frameRate: 8,
            repeat: -1
        });

        this.scene.anims.create({
            key: "die",
            frames: this.scene.anims.generateFrameNumbers("bird", {start: 16, end: 18}),
            frameRate: 8,
            repeat: 0
        });
    }

    checkOffBounds(callback){
        if(this.getBounds().top >= 0 - OFFBOUNDS_THRESHOLD && this.getBounds().bottom <= this.scene.config.height + OFFBOUNDS_THRESHOLD){
            return;
        }
        callback();
    }

    flap(){
        if(this.blocked) return;
        this.body.velocity.y = -FLAP_VELOCITY;
    }

    triggerLoseAnimation(endCallback){
        this.setTint(0xFF0000);
        this.body.setVelocity(0);
        this.flap();
        this.play("die");
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