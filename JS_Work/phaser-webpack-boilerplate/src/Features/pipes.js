const PIPE_SPAWN_TIME = 3000;
const PIPE_VELOCITY = 150;
const DEFAULT_PIPE_SPAWN_POSITION_RANGE = [50, 250];
const DEFAULT_GAP_SIZE_RANGE = [100, 300];


export default class PipeSystem {
    constructor(scene){
        this.scene = scene;
        this.group = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.pipes = [];
        this.pool = [];
    }

    start() {
        this.spawnPipes();
        this.scene.time.addEvent({
          delay: PIPE_SPAWN_TIME,
          callback: () => {
            this.spawnPipes(this);
          },
          loop: true
        });
    }

    update(){
        for(let i = 0; i < this.pipes.length; i++) {
            const pipe = this.pipes[i];
            if(pipe.hasExitedScreen()){
                this.moveToPool(pipe, i);
                break;
            }
        }
    }

    spawnPipes(){ 
        let pipe = null;
        
        if(this.pool.length > 0){
            pipe = this.pool[0];
        }
        else {
            pipe = new Pipe(this.group, this.scene.config.width);
        }
        pipe.setVelocity(PIPE_VELOCITY);
        pipe.setVisible(true);
        this.pipes.push(pipe);

    }

    moveToPool(pipe, index){
        this.pipes.splice(index, 1);
        this.pool.push(pipe);
        pipe.visible = false;
        pipe.velocity.x = 0;
    }

    getGroup(){
        return this.pipes;
    }
}

class Pipe {
    constructor(group, spawnX){
        this.group = group;
        this.pipeSpawnPositionRange = DEFAULT_PIPE_SPAWN_POSITION_RANGE;
        this.pipeGapSizeRange = DEFAULT_GAP_SIZE_RANGE;
        var spawnPosition = Phaser.Math.Between(...this.pipeSpawnPositionRange);
        var gapSize = Phaser.Math.Between(...this.pipeGapSizeRange);
        this.upper = this.group.create(spawnX, spawnPosition, "pipe").setOrigin(0,1);
        this.lower = this.group.create(spawnX, spawnPosition + gapSize, "pipe").setOrigin(0);
    }

    resetVelocity(){
        this.upper.x = this.spawnX;
    }

    setVelocity(velocity){
        this.lower.body.velocity.x = -velocity;
        this.upper.body.velocity.x = -velocity;
    }

    setVisible(state){
        this.upper.visible = state;
        this.lower.visible = state;
    }

    hasExitedScreen(){
        return this.upper.body.getBound().right < 0;
    }
}