function Enemy(ctx) {
  this.ctx = ctx;
  this.x = Math.floor(Math.random() * ctx.canvas.width);
  this.y = Math.floor(Math.random() * ctx.canvas.height);
  this.img = new Image();
  this.img.src = "./images/asteroid.png";

  this.vy = getNonZeroRandomNumber();
  this.vx = getNonZeroRandomNumber();

  this.w = 80;
  this.h = 80;

  this.a = (3 * Math.PI) / 2;

  this.enemies = [];
}

// Enemy.prototype.addEnemies = function (){
// for (i = 0; i < 5 ; i ++) {
//     var enemy = new Enemy();
//     this.enemies.push(enemy);
//     console.log(this.enemies.length);
// }
// this.enemy.draw();
// }

function getNonZeroRandomNumber() {
  var random = Math.floor(Math.random() * 101) - 50;
  if (random == 0) return getNonZeroRandomNumber();
  return random;
}

Enemy.prototype.draw = function() {
    
  
this.ctx.save();
  this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
  this.ctx.rotate(this.a);
  this.ctx.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
  this.ctx.restore();
};

Enemy.prototype.move = function() {
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


};
