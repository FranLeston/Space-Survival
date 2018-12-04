function Game(canvas) {
  this.ctx = canvas.getContext("2d");

  this.gameIntervalId = undefined;

  this.bg = new Background(this.ctx);
  this.ship = new Ship(this.ctx);
  this.army = []

}

Game.prototype.start = function() {
  if (!this.gameIntervalId) {
    this.firstLevel()
    this.gameIntervalId = setInterval(
      function() {
        this.clear();
        this.draw();
        this.move();
        this.checkAsteroidsCollisions();
        this.checkGameOver();
      }.bind(this),
      FPS
    );
  }
  
};


Game.prototype.stop = function(enemy) {
  clearInterval(this.gameIntervalId);
  this.gameIntervalId = undefined;
}

Game.prototype.addArmy = function(enemy) {
  this.army = this.army.concat(enemy)
}

Game.prototype.firstLevel = function() {
  for(var i = -1; ++i < 10;) {
    this.addArmy(new Enemy(this.ctx))
  }
}

Game.prototype.checkAsteroidsCollisions = function() {
  this.ship.bullets.forEach(function(bullet) {
    this.army.forEach(function(enemy) {
      if (enemy.collideWith(bullet) && enemy.isAlive) {
        enemy.isAlive = false;
        this.ship.dropBullet(bullet);
      }
    }.bind(this))
  }.bind(this));
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

Game.prototype.checkGameOver = function() {
  var collition = this.army.some(function(enemy) {
    return this.ship.collideWith(enemy) && enemy.isAlive;
  }.bind(this));

  if (collition) {
    alert("GAME OVER");
    //this.stop();
  }
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};


