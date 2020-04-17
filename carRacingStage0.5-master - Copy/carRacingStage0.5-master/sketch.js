var car1,car2,car3,car4;
var cars;
var canvas, backgroundImage;

var gameState = 0;
var playerCount;

var database;
var drawing=[];
var isDrawing=false;
var form, player, game;
var allPlayers;

function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-20);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer')
  canvas.mouseReleased(startPath);
  
  var clearButton=select('#clearButton');
  clearButton.mousePressed(clearDrawing);

  var saveButton=select('#saveButton');
  saveButton.mousePressed(saveDrawing);
  
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
console.log(drawing);  
}
function startPath(){
  isDrawing=true;
  currentPath=[];
  drawing.push(currentPath);

}

function endPath(){
  isDrawing=false;
}

function draw(){
  background(220);
if(playerCount===1){
  game.update(1);

}
if(gameState===1){
clear();
game.play();
}


      if(isDrawing){
        var locate={
          x:mouseX,
          y:mouseY
        }
      currentPath.push(locate);
      }
      stroke(0);
      strokeWeight(10);
      //noFill();
      

      for(var i=0; i<drawing.length;i++){
     var path=drawing[i];
      beginShape();

     for(var j=0;j<path.length;j++){
        vertex(path[j].x,path[j].y)
      }
       
      endShape();
      }
}

function saveDrawing(){
var ref=database.ref('drawings');
var data={
  //name:"",
  drawing: drawing
}  
var result=ref.push(data,dataSent);
console.log(result.key)
function dataSent(err, status){
  console.log(status);
}
}

function clearDrawing(){
  drawing=[];
}