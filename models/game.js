function Game(canvas) {
  this.ctx = canvas.getContext("2d");

  this.intervalId = undefined;

  this.bg = new Background(this.ctx);
  this.ship = new Ship(this.ctx);



  this.drawCount = 0;
}

Game.prototype.start = function() {
  this.intervalId = setInterval(
    function() {
      this.clear();
      this.draw();
      this.move();
      
    }.bind(this),
    FPS
  );
};

Game.prototype.draw = function() {
  this.bg.draw();
  this.ship.draw();
};

Game.prototype.move = function() {
  this.ship.move()
};


Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};
