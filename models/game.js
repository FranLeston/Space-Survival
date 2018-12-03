function Game(canvas) {
  this.ctx = canvas.getContext("2d");

  this.intervalId = undefined;

  this.bg = new Background(this.ctx);
  this.ship = new Ship(this.ctx);
  this.army = []

}

Game.prototype.start = function() {
  this.firstLevel()
  this.intervalId = setInterval(
    function() {
      this.clear();
      this.draw();
      this.move();
      this.checkAsteroidsCollisions()
    }.bind(this),
    FPS
  );
};

Game.prototype.addArmy = function(enemy) {
  this.army = this.army.concat(enemy)
}

Game.prototype.firstLevel = function() {
  for(var i = -1; ++i < 6;) {
    this.addArmy(new Enemy(this.ctx))
  }
}

Game.prototype.checkAsteroidsCollisions = function() {
  this.army = this.army.filter(function(asteroid) {
    // return !asteroid.isCollision(bullet)
    return !this.ship.checkBulletCollision(asteroid)
  }.bind(this))
}


Game.prototype.draw = function() {
  this.bg.draw();
  this.ship.draw();
  this.army.forEach(function(enemy) {
    enemy.draw()
  })
  
};

Game.prototype.move = function() {
  this.ship.move();
  this.army.forEach(function(enemy) {
    enemy.move()
  })
  
};

Game.prototype.isGameOver = function() {
  // Comprobar si la nave se choca y acabar el juego. No hace falta quitar el asteroide, pero sí quitar la nave
  // return !asteroid.isCollision(this.ship)
}


Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};


