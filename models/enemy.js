function Enemy(ctx) {
  this.ctx = ctx;
  this.x = Math.floor(Math.random() * ctx.canvas.width);
  this.y = Math.floor(Math.random() * ctx.canvas.height);
  this.img = new Image();
  this.img.src = "./images/asteroid.png";
  this.isExploding = false;
  this.isExpImg = new Image();
  this.isExpImg.src = "./images/explode.png";
  this.vy = getNonZeroRandomNumber();
  this.vx = getNonZeroRandomNumber();

  this.w = Math.floor(Math.random() * 80) + 35;
  this.h = this.w;

  this.a = Math.floor((Math.random() * (3 * Math.PI)) / 2) - 20;
  this.r = this.w * 0.4;

  this.isAlive = true;
}

Enemy.prototype.collideWith = function(obj) {
  return (
    this.x < obj.x + obj.w &&
    this.x + this.w > obj.x &&
    this.y < obj.y + obj.h &&
    this.h + this.y > obj.y
  );
};

function getNonZeroRandomNumber() {
  var random = Math.floor(Math.random() * 101) - 50;
  if (random == 0) return getNonZeroRandomNumber();
  return random;
}

/*
function distanceBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));

}
*/

Enemy.prototype.draw = function() {
  this.ctx.save();
  this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
  this.ctx.rotate(this.a);
  this.ctx.drawImage(
    this.img, 
    -this.w / 2, 
    -this.h / 2, 
    this.w, 
    this.h);
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

Enemy.prototype.move = function() {
  this.a += Math.PI / 64;
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
};

Enemy.prototype.boom = function() {
  this.isAlive = false;
  this.img = this.isExpImg;
}
