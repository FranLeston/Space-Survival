window.onload = function() {
  var canvasElement = document.getElementById("game-board");
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  //var game = new Game(canvasElement);
  var gameStart = new GameStart(canvasElement)
  var isPlaying = false;
  
  document.onkeypress = function(key_dtl) {
      key_dtl = key_dtl || window.event; 
      var game = new Game(canvasElement);
      isPlaying = true;
      clearInterval(myInterval);
      game.start();
     
     }
    
  if (!isPlaying) {
   myInterval = setInterval(function(){ 
    gameStart.draw() 
    
  }, FPS
  );
}
  
    



  }
  
  

 

