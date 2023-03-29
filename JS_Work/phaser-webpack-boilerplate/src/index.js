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
    spawnPipes(this, bird);
    pipeTimeCount = 0;
  }

  this.physics.add.collider(bird, lowerPipe, function(){
    alert("You lose");
  });
  this.physics.add.collider(bird, upperPipe, function(){
    alert("You lose");
  });
  
}

function flap(){
  bird.body.velocity.y = -FlapVelocity;
}


function spawnPipes(game, player){  

  let spaceLeft = Phaser.Math.Between(player.height, player.height * 2);

  let randomDistance = Phaser.Math.Between(0, 50);
  lowerPipe = game.add.sprite(config.width + 50, randomDistance - spaceLeft, "pipe");
  game.physics.add.existing(lowerPipe);
  lowerPipe.body.allowGravity = false;
  lowerPipe.body.immovable = true;
  lowerPipe.body.velocity.x = -100;

  randomDistance = Phaser.Math.Between(550, 600);
  upperPipe = game.add.sprite(config.width + 50, randomDistance + spaceLeft, "pipe");
  game.physics.add.existing(upperPipe);
  upperPipe.body.allowGravity = false;
  upperPipe.body.immovable = true;
  upperPipe.body.velocity.x = -100;
}

var game = new Phaser.Game(config);

