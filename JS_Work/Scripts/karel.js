var size = 0;
var spirals = 0;
var cells = 0;
var limit = 0;
var lastFibo = 0;
var currentFibo = 1;
MakeSquare();

while(spirals < limit)
    MakeSpiral();

paintTile("cyan");
function MakeSquare(){
    while(frontIsClear()){
        move();
        ++size;
        ++cells;
        CheckFibonacci();
    }
    alert(size);
    limit = size / 2 + 1;
    alert(limit);
    
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