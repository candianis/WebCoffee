const PIPE_SPAWN_TIME = 3000;
const PIPE_VELOCITY = 150;
const DEFAULT_PIPE_SPAWN_POSITION_RANGE = [50, 250];
const DEFAULT_GAP_SIZE_RANGE = [100, 300];


export default class PipeSystem {
    constructor(scene, layer){
        this.scene = scene;
        this.group = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.pipes = [];
        this.pool = [];
        this.layer = layer;
        this.onPipeExited = ()=>{};
        this.stopped = false;
        this.spawnTimer = null;
    }

    start() {
        this.spawnPipes();
        this.spawnTimer = this.scene.time.addEvent({
          delay: PIPE_SPAWN_TIME,
          callback: () => {
            this.spawnPipes();
          },
          loop: true
        });
    }

    update(){
        if(this.stopped || this.scene.paused) return;
        for(let i = 0; i < this.pipes.length; i++) {
            const pipe = this.pipes[i];
            if(pipe.hasExitedScreen()){
                this.moveToPool(pipe, i);
                this.onPipeExited();
                break;
            }
        }
    }

    stop(){
        this.stopped = true;

        if(this.spawnTimer){
            this.spawnTimer.remove();
        }
        this.pipes.forEach(pipe => {
            pipe.setVelocity(0);
        })
    }

    pause(){
        if(this.spawnTimer){
            this.spawnTimer.paused = true;
        }
    }

    resume(){
        if(this.spawnTimer){
            this.spawnTimer.paused = false;
        }
    }

    spawnPipes(){ 
        let pipe = null;
        
        if(this.pool.length > 0){
            pipe = this.pool[0];
            pipe.resetPosition();
            this.pool.splice(0, 1);
        }
        else {
            pipe = new Pipe(this.group, this.scene.config.width, this.layer);
        }
        pipe.setVelocity(PIPE_VELOCITY);
        pipe.setVisible(true);
        this.pipes.push(pipe);

    }

    moveToPool(pipe, index){
        this.pipes.splice(index, 1);
        this.pool.push(pipe);
        pipe.setVisible(false);
        pipe.setVelocity(0);
    }

    getGroup(){
        return this.pipes;
    }
}

class Pipe {
    constructor(group, spawnX, layer){
        this.group = group;
        this.spawnX = spawnX;
        this.pipeSpawnPositionRange = DEFAULT_PIPE_SPAWN_POSITION_RANGE;
        this.pipeGapSizeRange = DEFAULT_GAP_SIZE_RANGE;
        var spawnPosition = Phaser.Math.Between(...this.pipeSpawnPositionRange);
        var gapSize = Phaser.Math.Between(...this.pipeGapSizeRange);
        this.upper = group.create(spawnX, spawnPosition, "pipe").setOrigin(0,1);
        this.lower = group.create(spawnX, spawnPosition + gapSize, "pipe").setOrigin(0);
        layer.add([this.upper, this.lower]);
    }

    resetVelocity(){
        this.upper.x = this.spawnX;
    }

    setVelocity(velocity){
        this.lower.body.velocity.x = -velocity;
        this.upper.body.velocity.x = -velocity;
        var spawnPosition = Phaser.Math.Between(...this.pipeSpawnPositionRange);
        var gapSize = Phaser.Math.Between(...this.pipeGapSizeRange);
        this.upper.y = spawnPosition;
        this.lower.y = spawnPosition + gapSize;
    }

    setVisible(state){
        this.upper.visible = state;
        this.lower.visible = state;
    }

    resetPosition(){
        this.upper.x = this.spawnX;
        this.lower.x = this.spawnY;
    }

    hasExitedScreen(){
        return this.upper.body.getBounds().right < 0;
    }
}