function Overlay(ctx) {
  this.ctx = ctx;

  
  }

  Overlay.prototype.draw = function(lives, des) {
  
  this.ctx.font = "20px Spac3 halftone";
  this.ctx.fillStyle = "lime";
  this.ctx.textAlign = "center";
  this.ctx.fillText("Score " + des, this.ctx.canvas.width -200, 50);
  this.ctx.fillText("Lives " + lives , 100, 50);
    
    
    
  };

  

