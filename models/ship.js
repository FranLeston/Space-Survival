function Ship(ctx) {
  this.ctx = ctx;

  this.x = ctx.canvas.width / 2;
  this.y = ctx.canvas.height - 80;

  this.vx = 0;
  this.vy = 0;

  this.img = new Image();
  this.img.src = "https://i.stack.imgur.com/rsH6n.png";

  this.w = 65;
  this.h = 70;

  this.a = (3 * Math.PI) / 2;
  this.isThrusting = false;

  this.setListeners();
}

Ship.prototype.draw = function() {
  this.ctx.save();
  this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
  this.ctx.rotate(this.a - (3 * Math.PI) / 2);
  this.ctx.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
  this.ctx.restore();
};

Ship.prototype.move = function() {
  if (this.isThrusting) {
    this.vx += SHIP_THRUST
    this.vy += SHIP_THRUST
    
    this.vx -= this.vy * FRICTION / FPS;
    this.vy -= this.vy * FRICTION / FPS;
    
    
    this.x += (this.vx * Math.cos(this.a) / FPS);
    this.y += (this.vy * Math.sin(this.a) / FPS);


  } else {
    this.vx -= this.vy * FRICTION / FPS;
    this.vy -= this.vy * FRICTION / FPS;
    
    
    this.x += (this.vx * Math.cos(this.a) / FPS);
    this.y += (this.vy * Math.sin(this.a) / FPS);
  }

};

Ship.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
  document.onkeyup = this.onKeyUp.bind(this);
};

Ship.prototype.onKeyDown = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      this.a += Math.PI / 32;
      break;
    case KEY_LEFT:
      this.a -= Math.PI / 32;
      break;

    case KEY_UP:
      this.isThrusting = true;

      break;
  }
};
Ship.prototype.onKeyUp = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:

    case KEY_LEFT:

    case KEY_UP:
      this.isThrusting = false;
  }
};
