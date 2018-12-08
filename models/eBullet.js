function EnemyBullet(ctx, x, y, a) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.vx = 10;
  this.vy = 10;
  this.img = new Image();
  this.img.src =
    "./images/mega-laser-1.png";
  this.w =4;
  this.h = 30;

  this.a = a;
  this.r = 4;
}

EnemyBullet.prototype.draw = function() {

    this.ctx.save();
    this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    this.ctx.rotate(this.a - (3 * Math.PI) / 2);
    this.ctx.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
    this.ctx.restore();
};

EnemyBullet.prototype.move = function() {
   

    this.x += (this.vx * Math.cos(this.a))  ;
    this.y += (this.vy * Math.sin(this.a))  ;
};

EnemyBullet.prototype.isCollision = function(obj) {
  if(obj) {
    return (this.x < obj.x + obj.w &&
      this.x + this.w > obj.x &&
      this.y < obj.y + obj.h &&
      this.h + this.y > obj.y)
  }
}