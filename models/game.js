function Game(canvas) {
  this.ctx = canvas.getContext("2d");

  this.gameIntervalId = undefined;

  this.overlay = new Overlay(this.ctx);
  this.bg = new Background(this.ctx);
  this.ship = new Ship(this.ctx);
  this.army = [];
  this.enemyShips = [];

  this.drawCount = 0;
  this.lives = 3
  this.hits = 0;
}

Game.prototype.start = function() {
  if (!this.gameIntervalId) {
    this.firstLevel();
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
};

Game.prototype.addArmy = function(enemy) {
  this.army = this.army.concat(enemy);
  this.enemyShips = this.enemyShips.concat(enemy);
};

Game.prototype.firstLevel = function() {
  for (var i = -1; ++i < 7; ) {
    this.addArmy(new Enemy(this.ctx));
  }
};

Game.prototype.checkAsteroidsCollisions = function() {
  this.ship.bullets.forEach(
    function(bullet) {
      this.army.forEach(
        function(enemy) {
          if (enemy.collideWith(bullet) && enemy.isAlive) {
            enemy.boom();
            this.hits++;
            this.ship.dropBullet(bullet);
          }
        }.bind(this)
      );
    }.bind(this)
  );
};

Game.prototype.draw = function() {
  var blinkOn = this.ship.blinkNum % 2 == 0;
  this.bg.draw();
  if (blinkOn) {
    this.ship.draw();
  }
  this.army.forEach(function(enemy) {
    enemy.draw();
  });

  if (this.ship.blinkNum > 0) {
    this.ship.blinkTime--;
    if (this.ship.blinkTime == 0) {
      this.ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
      this.ship.blinkNum--;
    }
  }

  this.drawCount++;
  if (this.drawCount % 80 === 0) {
    this.addArmy(new Enemy(this.ctx));
  }
  if (this.drawCount % 1000 === 0) {
    this.addArmy(new EnemyShip(this.ctx));
  }

  this.overlay.draw(this.lives, this.hits);
};

Game.prototype.move = function() {
  this.ship.move();
  this.army.forEach(function(enemy) {
    enemy.move();
  });
};

Game.prototype.checkGameOver = function() {
   
  var collition = this.army.some(
    function(enemy) {
      if (this.ship.blinkNum == 0) {
        return this.ship.collideWith(enemy) && enemy.isAlive;
      }
    }.bind(this)
  );

  if (collition) {
    this.ship = new Ship(this.ctx);
    this.lives--;
    
  }
  if (this.lives === 0) {
    alert ("GAME OVER")
    this.stop();
  }
};

Game.prototype.clear = function() {
  if (this.drawCount % 40 === 0) {
    this.army = this.army.filter(function(enemy) {
      return enemy.isAlive;
    });
  }
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};
