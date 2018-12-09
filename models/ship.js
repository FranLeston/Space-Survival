function Ship(ctx,gamestart) {
  // this.bullet = new Bullet();
  this.ctx = ctx;
this.gameStart = gamestart;
  this.x = ctx.canvas.width / 2;
  this.y = ctx.canvas.height / 2;

  this.vx = 0;
  this.vy = 0;

  this.img = new Image();
  this.img.src = "./images/ship.png";
  this.imgOn = new Image();
  this.imgOn = "./images/thrust.png";
  this.isExpImg = new Image();
  this.isExpImg.src = "./images/explode.png";


  this.w = 65;
  this.h = 70;
  this.heading = (3 * Math.PI) / 2;
  this.a = (3 * Math.PI) / 2;
  this.r = 35
  this.explodeTime = 0 

  this.isThrusting = false;
  this.isTurningLeft = false;
  this.isTurningRight = false;
  this.setListeners();

  this.bullets = [];
  this.isAlive = true
  
  this.shotsFired = 0;
  this.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS)
  this.blinkNum = SHIP_INV_DUR / SHIP_BLINK_DUR;

  this.fxLaser = new Sound("./sounds/laser-shoot.wav", 5, 0.5);
  this.fxThrust = new Sound("./sounds/rocketthrust.wav", 5, 0.5);
}

Ship.prototype.draw = function() {
  
  
  
  
  this.bullets = this.bullets.filter(function(bullet) {
    return !bullet.isCollision();
  });
  this.bullets.forEach(function(bullet) {
    bullet.draw();
  });

  


  this.ctx.save();
  this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
  this.ctx.rotate(this.a - (3 * Math.PI) / 2);
  this.ctx.drawImage(
    this.img, 
    -this.w / 2,
    -this.h / 2,
    this.w,
    this.h);
  this.ctx.restore();
  


  if (SHOW_BOUNDING) {
    this.ctx.strokeStyle = "lime";
    this.ctx.beginPath();
    this.ctx.arc(this.x + this.w / 2, this.y + this.h / 2, this.r, 0, Math.PI * 2, false);
    this.ctx.stroke();
}



};

Ship.prototype.move = function() {
  if (this.isThrusting) {
    this.vx += SHIP_THRUST;
    this.vy += SHIP_THRUST;

    this.x += (this.vx * Math.cos(this.a)) / FPS;
    this.y += (this.vy * Math.sin(this.a)) / FPS;
  } else if (this.isTurningLeft) {
    this.a -= Math.PI / 64;
    this.vx -= (this.vx * FRICTION) / FPS;
    this.vy -= (this.vy * FRICTION) / FPS;

    this.x += (this.vx * Math.cos(this.a)) / FPS;
    this.y += (this.vy * Math.sin(this.a)) / FPS;
  } else if (this.isTurningRight) {
    this.a += Math.PI / 64;
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

Ship.prototype.collideWith = function(obj) {
  return (this.x < obj.x + obj.w  &&
    this.x + this.w > obj.x &&
    this.y < obj.y + obj.h  &&
    this.h + this.y > obj.y)

  };

// TODO: Rename to shoot
Ship.prototype.addbullets = function() {
  this.bullets.push(
    new Bullet(this.ctx, this.x + this.w / 2, this.y + this.h / 2 - 15, this.a)
    
  );
  console.log(this.bullets.length)
  // Filter bullets

  // TODO: refsctor at game clean function
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

Ship.prototype.dropBullet = function(bullet) {
  this.bullets = this.bullets.filter(function(b) {
    return b !== bullet;
  });
}

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
    if (!e.repeat) {  
    this.isThrusting = true;
      this.fxThrust.play();
    }
      break;

    case KEY_SPACE:
      if (!e.repeat) {
        this.fxLaser.play();
        this.addbullets();
        this.shotsFired++;
        
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

Ship.prototype.boom = function() {
  this.isAlive = false;
  this.img = this.isExpImg;
}

