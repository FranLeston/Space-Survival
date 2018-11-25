function Ship(ctx) {
  this.ctx = ctx;

  this.x = ctx.canvas.width / 2;
  this.y = 680;

  this.vx = 0;
  this.vy = 0;

  this.img = new Image();
  this.img.src = "https://i.stack.imgur.com/rsH6n.png";

  this.w = 65;
  this.h = 70;

  this.setListeners();
}

Ship.prototype.draw = function() {
  this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
};

Ship.prototype.move = function() {
  this.x += this.vx;
    this.y += this.vy

};

Ship.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
};

Ship.prototype.onKeyDown = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      this.vx += SHIP_THRUST;
      break;
    case KEY_LEFT:
      this.vx -= SHIP_THRUST;
      break;
    case KEY_UP:
      this.vy -= SHIP_THRUST;
      break;
  }
};
