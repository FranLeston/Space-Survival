function Game(canvas) {
  this.ctx = canvas.getContext("2d");

  this.gameIntervalId = undefined;
  this.gameStart = false;
  this.overlay = new Overlay(this.ctx, this.shots);
  this.bg = new Background(this.ctx);
  this.ship = new Ship(this.ctx, this.gameStart);
  this.army = [];
  this.enemyShips = [];

  this.drawCount = 0;
  this.lives = 3;
  this.hits = 0;
  this.shots = 0;
  this.level = 1;
  this.levelComplete = 0;
  this.fxExplosion = new Sound("./sounds/Explosion.wav", 5, 0.5);
  this.fxShipExplosion = new Sound("./sounds/shipexplosion.wav", 5, 1);
  this.fxLevelUp = new Sound("./sounds/levelup.wav", 5, 1);
  this.fxmusic = new Audio("./sounds/spacetrip.mp3");
  this.fxLastKill = new Sound("./sounds/LastKill.mpeg", 5, 1);
  this.fxHighScore = new Audio("./sounds/highscore.mp3");
  this.isGameOver = false;
}

Game.prototype.start = function() {
  if (!this.gameIntervalId) {
    this.firstLevel();
    this.gameIntervalId = setInterval(
      function() {
        this.clear();
        this.highScores();
        this.draw();
        this.move();

        this.checkAsteroidsCollisions();
        this.checkLevel();
        this.checkGameOver();
      }.bind(this),
      FPS
    );
  }
};

Game.prototype.highScores = function() {
  if (this.isGameOver) {
    this.fxmusic.pause();
    this.person = prompt("Please enter your name:", "IronHacker");
    localStorage.setItem(this.person, this.hits);
    this.hs = new HighScores(this.ctx, sortLocalStorage());
    clearInterval(this.gameIntervalId);
    this.hsInterval = setInterval(
      function() {
        
        
        this.fxHighScore.play();
        this.hs.draw();
      }.bind(this),
      FPS
    );
  }
};

function sortLocalStorage() {
  if (localStorage.length > 0) {
    var localStorageArray = new Array();
    for (i = 0; i < localStorage.length; i++) {
      localStorageArray[i] =
        localStorage.key(i) + " " + localStorage.getItem(localStorage.key(i));
    }
  }
  var sortedArray = localStorageArray.sort();
  return sortedArray;
}

Game.prototype.checkLevel = function() {
  if (this.levelComplete === 20) {
    this.fxLevelUp.play();
    this.level++;
    this.levelComplete = 0;
    for (var i = -1; ++i < this.level; ) {
      this.addArmy(new Enemy(this.ctx));
    }
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
  for (var i = -1; ++i < 7 + this.level; ) {
    this.addArmy(new Enemy(this.ctx));
    this.fxmusic.play();
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
            this.levelComplete++;
            this.fxExplosion.play();

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
  if (this.drawCount % 800 === 0) {
    this.addArmy(new EnemyShip(this.ctx));
  }

  this.overlay.draw(this.lives, this.hits, this.ship.shotsFired, this.level);
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
    this.fxShipExplosion.play();
    this.shots = this.ship.shotsFired;
    this.ship = new Ship(this.ctx);
    this.ship.shotsFired = this.shots;
    this.lives--;
  }
  if (this.lives === 0) {
    this.fxLastKill.play();
    this.isGameOver = true;
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
