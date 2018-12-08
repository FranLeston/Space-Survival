function Overlay(ctx) {
  this.ctx = ctx;

  
  }

  Overlay.prototype.draw = function(lives, hits, shots) {
  
  this.ctx.font = "40px FREEDOM";
  this.ctx.fillStyle = "lime";
  this.ctx.textAlign = "center";
  this.ctx.fillText("Score: " + hits, this.ctx.canvas.width -200, 50);
  this.ctx.fillText("Kill Ratio: " + (hits / shots * 100).toFixed(2) +" %", this.ctx.canvas.width -200, 100);
  
  this.ctx.fillText("Lives: " + lives , 100, 50);
    
    
    
  };

  