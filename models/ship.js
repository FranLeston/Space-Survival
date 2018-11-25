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

  this.a = 0;
  this.heading = 0;
  this.isTurning = 0;
  this.isThrusting = 0;

  this.setListeners();
}

Ship.prototype.draw = function() {
  if (this.isTurning == 0) {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
};

Ship.prototype.move = function() {
  if (this.y >= 0) {
    this.y += this.vy;
  } else {
    this.y -= FRICTION * this.vy;
  }

  if (this.isTurning == 1) {
    this.ctx.save();
    this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    this.ctx.rotate((this.a * Math.PI) / 180);
    this.ctx.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
    this.ctx.restore();
  }
};

Ship.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
  document.onkeyup = this.onKeyUp.bind(this);
};

Ship.prototype.onKeyDown = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      this.isTurning = 1;

      break;
    case KEY_LEFT:
      this.isTurning = 1;

      break;

    case KEY_UP:
      this.vy -= SHIP_THRUST;
      break;
  }
};
Ship.prototype.onKeyUp = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      this.isTurning = 0;
      this.a = this.a + 5;
      break;
    case KEY_LEFT:
      this.isTurning = 0;
      this.a = this.a - 5;
      break;
    case KEY_UP:
      this.vy = 0;
  }
};
