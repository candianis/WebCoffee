var size = 0;
var spirals = 0;
var cells = 1;
var limit = 0;
var lastFibo = 1;
var currentFibo = 1;
var pickedFruits = 0;


dropFruit();
MakeSquare();

while(spirals < limit)
    MakeSpiral();
paintTile("cyan");
turnLeft();
alert(size);
UndoSpiral();
UndoSpiral();

function MakeSquare(){
    while(frontIsClear()){
        move();
        ++size;
        ++cells;
        CheckFibonacci();
    }
    limit = size / 2 + 1;
    
    turnLeft();
    paintTile("red");
    moveNAmount(size);
    moveNAmount(size);
    --size;
    moveNAmount(size);
    ++spirals;
}
function moveNAmount(spacesToMove){
    let index = 0;
    while(index < spacesToMove){
        ++index;
        move();
        ++cells;
        CheckFibonacci();
    }
    
    turnLeft();
    paintTile("red")
}
function MakeSpiral(){
    moveNAmount(size);
    --size;
    moveNAmount(size);
    moveNAmount(size);
    --size;
    moveNAmount(size);
    ++spirals;
}
function CheckFibonacci(){
    if(cells == (currentFibo + lastFibo)){
        lastFibo = currentFibo;
        currentFibo = cells;
        dropFruit();
    }
}

//Reverse functions
function moveInReverseN(spacesToMove){
    let index = 0;
    while(index < spacesToMove){
        ++index;
        if(pickedFruits == 4)
            break;
        move();
    }
    turnRight();
}

function UndoSpiral(){
    alert(size);
    moveInReverseN(size);
    ++size;
    moveInReverseN(size);
    moveInReverseN(size);
    ++size;
    moveInReverseN(size);
}

function UndoFibonacci(){
    
}