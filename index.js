window.onload = function() {
  var canvasElement = document.getElementById("game-board");
  
  var game = new Game(canvasElement);
  game.start();
  
}
