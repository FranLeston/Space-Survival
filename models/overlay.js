function Overlay(ctx) {
  this.ctx = ctx;

  
  }

  Overlay.prototype.draw = function(lives, hits, shots, level) {
  
  this.ctx.font = "30px Audiowide-Regular";
  this.ctx.fillStyle = "lime";
  this.ctx.textAlign = "left";
  this.ctx.fillText("Units Destroyed: " + hits, this.ctx.canvas.width -400, 50);
  this.ctx.fillText("Kill Ratio: " + (hits / shots * 100).toFixed(2) +" %", this.ctx.canvas.width -400, 100);
  
  this.ctx.fillText("Lives: " + lives , 25, 50);
  this.ctx.fillText("Level: "+ level  , 25, 100);
    
    
    
  };

  