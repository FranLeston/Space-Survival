window.onload = function() {
  var canvasElement = document.getElementById("game-board");
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  var game = new Game(canvasElement);
  game.start();
  
}
