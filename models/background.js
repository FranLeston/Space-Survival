function Background(ctx) {
  this.ctx = ctx;
 
  this.stars = [];

for (var i = 0; i < 500; i++) {
    this.stars[i] = {
      x: Math.random() * this.ctx.canvas.width,
      y: Math.random() * this.ctx.canvas.height,
      radius: Math.sqrt(Math.random() * 2),
      alpha: 1.0,
      decreasing: true,
      dRatio: Math.random() * 0.05
    };
    
    
}

Background.prototype.draw = function() {
  

    this.ctx.save();
    this.ctx.fillStyle = "#111";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (var i = 0; i < this.stars.length; i++) {
      var star = this.stars[i];

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fillStyle = "rgba(0, 155, 255, " + star.alpha + ")";
      
      if (star.decreasing == true)
    {
      star.alpha -= star.dRatio;
      if (star.alpha < 0.1)
      { star.decreasing = false; }
    }
    else
    {
      star.alpha += star.dRatio;
      if (star.alpha > 0.95)
      { star.decreasing = true; }
    }
      
      
      
      this.ctx.fill();
      }
      this.ctx.restore();
    }

  }


/*
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  );

  */
