function EnemyShip(ctx) {
  this.ctx = ctx;
  this.x = Math.floor(Math.random() * ctx.canvas.width) + ctx.canvas.width;
  this.y = Math.floor(Math.random() * ctx.canvas.height) + ctx.canvas.height;
  this.img = new Image();
  this.img.src = "./images/enemyship.png";
  this.isExploding = false;
  this.isExpImg = new Image();
  this.isExpImg.src = "./images/explode.png";
  this.vy = getNonZeroRandomNumber();
  this.vx = getNonZeroRandomNumber();

  this.w = 100;
  this.h = 100;

  this.a = Math.floor((Math.random() * (3 * Math.PI)) / 2) - 20;
  this.r = this.w * 0.4;

  this.isAlive = true;

  this.ebullets = [];
  this.drawcount = 0;
}

EnemyShip.prototype.collideWith = function(obj) {
  return (
    this.x < obj.x + obj.w &&
    this.x + this.w > obj.x &&
    this.y < obj.y + obj.h &&
    this.h + this.y > obj.y
  );
};

function getNonZeroRandomNumber() {
  var random = Math.floor(Math.random() * 101);
  if (random == 0) return getNonZeroRandomNumber();
  return random;
}

/*
function distanceBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));

}
*/

EnemyShip.prototype.draw = function() {
  this.drawcount++;
  this.ebullets = this.ebullets.filter(function(bullet) {
    return !bullet.isCollision();
  });
  this.ebullets.forEach(function(ebullet) {
    ebullet.draw();
  });
  this.ctx.save();
  this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
  this.ctx.rotate(this.a);

  this.ctx.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
  this.ctx.restore();

  if (SHOW_BOUNDING) {
    this.ctx.strokeStyle = "red";
    this.ctx.beginPath();
    this.ctx.arc(
      this.x + this.w / 2,
      this.y + this.h / 2,
      this.r,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.stroke();
  }
};

EnemyShip.prototype.move = function() {
  
  this.a += Math.PI / 180;
  this.x += this.vx / FPS;
  this.y += this.vy / FPS;

  if (this.x < 0 - this.w) {
    this.x = this.ctx.canvas.width;
  } else if (this.x > this.ctx.canvas.width) {
    this.x = 0 - this.w;
  }

  if (this.y < 0 - this.h) {
    this.y = this.ctx.canvas.height;
  } else if (this.y > this.ctx.canvas.height) {
    this.y = 0 - this.h;
  }
  this.ebullets.forEach(function(ebullet) {
    ebullet.move();
  });

  if (this.drawcount % 30 === 0) {
    this.addbullets();
    
  }
};

EnemyShip.prototype.addbullets = function() {
  this.ebullets.push(
    new EnemyBullet(this.ctx, this.x + this.w / 2, this.y + this.h / 2 - 15, this.a)
  );
  console.log(this.ebullets.length);
  // Filter bullets

  // TODO: refsctor at game clean function
  this.ebullets = this.ebullets.filter(
    function(ebullet) {
      return (
        ebullet.x <= this.ctx.canvas.width &&
        ebullet.x > 0 &&
        ebullet.y > 0 &&
        ebullet.y <= this.ctx.canvas.height
      );
    }.bind(this)
  );
};

EnemyShip.prototype.dropBullet = function(ebullet) {
  this.ebullets = this.ebullets.filter(function(b) {
    return b !== ebullet;
  });
}

EnemyShip.prototype.boom = function() {
  this.isAlive = false;
  this.img = this.isExpImg;
};
