import Phaser, { Game, Scene } from "phaser";

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
const PipeSpawnTime = 3000;

let bird = null;
let upperPipe = null;
let lowerPipe = null;
let pipeTimeCount = 0;
var pipes;
var pipeVelocity = 150;

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
  
  pipes = this.physics.add.group({
    allowGravity: false,
    immovable: true
  });

  spawnPipes();
  this.time.addEvent({
    delay: PipeSpawnTime,
    callback: () => {
      spawnPipes(this);
    },
    loop: true
  });
  this.physics.add.collider(bird, pipes, gameOver, null, this);
}

//Update
function update(time, delta){

}

function flap(){
  bird.body.velocity.y = -FlapVelocity;
}


function spawnPipes(){ 
  var spawnPosition = Phaser.Math.Between(50, 300);
  var gapSize = Phaser.Math.Between(100, 300);
  var upper = pipes.create(config.width + 50, spawnPosition, "pipe"). setOrigin(0,1);
  var lower = pipes.create(config.width + 50, spawnPosition + gapSize, "pipe").setOrigin(0);
  lower.body.velocity.x = -pipeVelocity;
  upper.body.velocity.x = -pipeVelocity;

}

function gameOver(){
  alert("You lose");
  this.scene.reset();
}

var game = new Phaser.Game(config);

