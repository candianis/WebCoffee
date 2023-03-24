import Phaser, { Scene } from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade:{
        gravity: {y: 350},
        debug: true
      }
    },
    scene: {
      preload,
      create,
      update
    }
}

const FlapVelocity = 250;
const PipeSpawnTime = 5000;

let bird = null;
let pipe = null;
let pipeTimeCount = 0;

//Awake
function preload(){
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
}

//Start
function create(){
  this.add.image(0, 0, "sky").setOrigin(0);
  bird = this.add.sprite(100, config.height /2, "bird");
  this.physics.add.existing(bird);
  
  this.input.keyboard.on("keydown-SPACE", flap);
}

//Update
function update(time, delta){
  pipeTimeCount += delta;
  if(pipeTimeCount >= PipeSpawnTime){
    spawnPipes()
  }
}

function flap(){
  bird.body.velocity.y = -FlapVelocity;
}

function spawnPipes(){
  let yPos = (Math.random() * 100) + 300;
  pipe = this.add.sprite(config.width + 50, yPos);
  this.physics.add.existing(pipe);
  pipe.body.allowGravity = false;
  pipe.body.immovable = true;
  pipe.body.velocity.x = -100;
  
}

new Phaser.Game(config);