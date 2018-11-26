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
  this.isThrusting = false;

  this.setListeners();
}

Ship.prototype.draw = function() {
  this.ctx.save();
  this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
  this.ctx.rotate((this.a * Math.PI) / 180);
  this.ctx.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
  this.ctx.restore();
};

Ship.prototype.move = function() {
  if (this.isThrusting) {
    this.vy += SHIP_THRUST / FPS;
    this.y -= this.vy / FPS ;
    

    
  } else {
    
  
  }
};

Ship.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
  document.onkeyup = this.onKeyUp.bind(this);
};

Ship.prototype.onKeyDown = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      
      this.a = this.a + 5;
      break;
    case KEY_LEFT:
      this.a = this.a - 5;
      break;

    case KEY_UP:
    this.isThrusting = true;
      break;
  }
};
Ship.prototype.onKeyUp = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      break;
    case KEY_LEFT:
      break;
    case KEY_UP:
    this.isThrusting = false;
    
    
   
  
      
  }
};
