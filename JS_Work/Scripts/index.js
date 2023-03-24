
var player ={
    elemt:null,
    x:0,
    y:0,
    speed:600,

    init:function(){
        this.elemt=$("#player");
        this.elemt.css("left", "100px");
        this.elemt.css("top", "0");
    },

    on:function(event, callback){
        this.elemt.on(event, callback);
    },

    move:function(inX, inY){
        this.x += inX;
        this.y += inY;
        this.elemt.css("left", (this.x)+"px");
        this.elemt.css("top", (this.y)+"px");
    },
};

var dir ={ x:0, y:0,}
var oldTimeStamp = 0;

$(document).on("keydown", function(event){
    switch(event.key){
        case "d":
        case "D":
        case "ArrowRight":
            dir.x = 1;
            break;
        case "ArrowLeft":
        case "A":
        case "a":
            dir.x = -1;
            break;
        case "ArrowUp":
        case "W":
        case "w":
            dir.y = -1;
            break;
        case "ArrowDown":
        case "s":
        case "S":
            dir.y = 1;
            break;

    }

})

$(document).on("keyup", function(event){
    switch(event.key){
        case "d":
        case "D":
        case "ArrowRight":
            dir.x = 0;
            break;
        case "ArrowLeft":
        case "A":
        case "a":
            dir.x = 0;
            break;
        case "ArrowUp":
        case "W":
        case "w":
            dir.y = 0;
            break;
        case "ArrowDown":
        case "s":
        case "S":
            dir.y = 0;
            break;

    }

})

function loop(timeStamp){
    var delta = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;


    var normalizedDir = Normalize(dir);
    player.move((normalizedDir.x * player.speed) * delta, (normalizedDir.y * player.speed) * delta);

    //keep looping
    window.requestAnimationFrame(loop);
}

function Normalize(vector){
    var magnitude = Math.sqrt(Math.abs(Math.pow(vector.x, 2)) + Math.abs(Math.pow(vector.y, 2)));
    if(magnitude > 0)
        return {x: vector.x/magnitude, y: vector.y/magnitude};

    else 
        return {x:0, y:0};
}

player.init();
//Call first loop
window.requestAnimationFrame(loop);