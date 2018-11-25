window.onload = function() {
  var canvasElement = document.getElementById("game-board");
  
  new Game(canvasElement).start();
};
