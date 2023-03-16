var size = 0;
var totalSize = 0;
var spirals = 0;
var cells = 1;
var limit = 0;
var lastFibo = 1;
var currentFibo = 1;
var pickedFruits = 0;
var canMove = true;
var timesMoved = 0;

dropFruit();
MakeSquare();

while(spirals < limit)
    MakeSpiral();
paintTile("cyan");
turnLeft();
alert(size);
size = 1;
alert(size);
turnLeft();

while(canMove){
    moveInReverseN();
    if(size > totalSize){
        let lastIndex = 0;
        while(lastIndex < totalSize){
            move();
            ++lastIndex;
        }
        turnRight();
        turnRight();
        canMove = false;
    }
}


function MakeSquare(){
    while(frontIsClear()){
        move();
        ++size;
        ++cells;
        CheckFibonacci();
    }
    limit = size / 2 + 1;
    totalSize = size;
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
        alert("Fibonacci: " + currentFibo + " : " + lastFibo);
    }
}

//Reverse functions
function moveInReverseN(){
    let index = 0;
    while(index < size){
        UndoFibonacci();
        if(!canMove)
            return;
        ++index;
        move();
        --cells;
    }
    turnRight();
    paintTile("green");
    ++timesMoved;
    
    if(timesMoved == 2){
        timesMoved = 0;
        ++size;
    }
       
}

function UndoFibonacci(){
    if(cells == currentFibo + 1){
        alert("Fibonacci: " + currentFibo + " : " + lastFibo);
        pickFruit();
        let temp = lastFibo;
        lastFibo = currentFibo - lastFibo;
        currentFibo = temp;
    }
    
    if(fruitsInPocket() == 4)
        canMove = false;
}