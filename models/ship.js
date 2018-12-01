function Ship(ctx) {
  this.ctx = ctx;

  this.x = ctx.canvas.width / 2;
  this.y = ctx.canvas.height / 2;

  this.vx = 0;
  this.vy = 0;

  this.img = new Image();
  this.img.src = "https://i.stack.imgur.com/rsH6n.png";

  this.w = 65;
  this.h = 70;
  this.heading = (3 * Math.PI) / 2;
  this.a = (3 * Math.PI) / 2;

  this.isThrusting = false;
  this.isTurningLeft = false;
  this.isTurningRight = false;
  this.setListeners();

  this.bullets = [];
}

Ship.prototype.draw = function() {
  this.bullets.forEach(function(bullet) {
    bullet.draw();
  });

  this.ctx.save();
  this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
  this.ctx.rotate(this.a - (3 * Math.PI) / 2);
  this.ctx.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
  this.ctx.restore();
};

Ship.prototype.move = function() {
  if (this.isThrusting) {
    this.vx += SHIP_THRUST;
    this.vy += SHIP_THRUST;

    this.x += (this.vx * Math.cos(this.a)) / FPS;
    this.y += (this.vy * Math.sin(this.a)) / FPS;
  } else if (this.isTurningLeft) {
    this.a -= Math.PI / 48;
    this.vx -= (this.vx * FRICTION) / FPS;
    this.vy -= (this.vy * FRICTION) / FPS;

    this.x += (this.vx * Math.cos(this.a)) / FPS;
    this.y += (this.vy * Math.sin(this.a)) / FPS;
  } else if (this.isTurningRight) {
    this.a += Math.PI / 48;
    this.vx -= (this.vx * FRICTION) / FPS;
    this.vy -= (this.vy * FRICTION) / FPS;

    this.x += (this.vx * Math.cos(this.a)) / FPS;
    this.y += (this.vy * Math.sin(this.a)) / FPS;
  }
  this.vx -= (this.vx * FRICTION) / FPS;
  this.vy -= (this.vy * FRICTION) / FPS;

  this.x += (this.vx * Math.cos(this.a)) / FPS;
  this.y += (this.vy * Math.sin(this.a)) / FPS;

  //handle the ships edge of screen
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

  this.bullets.forEach(function(bullet) {
    bullet.move();
  });
};

Ship.prototype.addbullets = function() {
  var bullet = new Bullet(
    this.ctx,
    this.x + this.w / 2,
    this.y + this.h / 2 - 15,
    this.a
  );
  this.bullets.push(bullet);
  console.log(this.bullets.length);
  // Filter bullets

  this.bullets = this.bullets.filter(
    function(bullet) {
      return (
        bullet.x <= this.ctx.canvas.width &&
        bullet.x > 0 &&
        bullet.y > 0 &&
        bullet.y <= this.ctx.canvas.height
      );
    }.bind(this)
  );
};

Ship.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
  document.onkeyup = this.onKeyUp.bind(this);
};

Ship.prototype.onKeyDown = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      this.isTurningRight = true;

      break;
    case KEY_LEFT:
      this.isTurningLeft = true;

      break;

    case KEY_UP:
      this.isThrusting = true;

      break;

    case KEY_SPACE:
      if (!e.repeat) {
        this.addbullets();
        return false;
      }
      return true;
      break;
  }
};
Ship.prototype.onKeyUp = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      this.isTurningRight = false;
      break;
    case KEY_LEFT:
      this.isTurningLeft = false;
      break;
    case KEY_UP:
      this.isThrusting = false;

      break;
    case KEY_SPACE:
      break;
  }
};
