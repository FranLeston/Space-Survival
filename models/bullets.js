function Bullet(ctx, x, y, a) {
  this.ctx = ctx;


  
  this.x = x;
  this.y = y;
  this.vx = 10;
  this.vy = 10;
  this.img = new Image();
  this.img.src =
    "https://chrismalnu.files.wordpress.com/2016/02/clash2.png?w=680";
  this.w =4;
  this.h = 30;

  this.a = a;
}

Bullet.prototype.draw = function() {

    this.ctx.save();
    this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    this.ctx.rotate(this.a - (3 * Math.PI) / 2);
    this.ctx.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
    this.ctx.restore();
};

Bullet.prototype.move = function() {
   

    this.x += (this.vx * Math.cos(this.a))  ;
    this.y += (this.vy * Math.sin(this.a))  ;
};
