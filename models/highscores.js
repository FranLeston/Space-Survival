function HighScores(ctx, array) {
  this.ctx = ctx
  this.array = array;
  this.j = 0;

  this.startGame = false;
  this.stars = [];
  this.red = 0;
  this.green = 155;
  this.blue = 255;
  this.drawCount = 0;
  
  
  
  for (var i = 0; i < 500; i++) {
    this.stars[i] = {
      x: Math.random() * this.ctx.canvas.width,
      y: Math.random() * this.ctx.canvas.height,
      radius: Math.sqrt(Math.random() * 3),
      alpha: 1.0,
      decreasing: true,
      dRatio: Math.random() * 0.05
    };
  }

  HighScores.prototype.draw = function() {
    
    this.drawCount++;

    if (this.drawCount % 200 === 0) {
      this.red = Math.random() * 255 + 1;
      this.green = Math.random() * 255 + 1;
      this.blue = Math.random() * 255 + 1;
    }

    this.ctx.save();
    this.ctx.fillStyle = "#111";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (var i = 0; i < this.stars.length; i++) {
      var star = this.stars[i];

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fillStyle =
        "rgba(" +
        this.red +
        "," +
        this.green +
        "," +
        this.blue +
        "," +
        star.alpha +
        ")";

      if (star.decreasing == true) {
        star.alpha -= star.dRatio;
        if (star.alpha < 0.1) {
          star.decreasing = false;
        }
      } else {
        star.alpha += star.dRatio;
        if (star.alpha > 0.95) {
          star.decreasing = true;
        }
      }

      this.ctx.fill();
    }
    this.ctx.font = "30px Audiowide-Regular";
    this.ctx.fillStyle =
        "rgba(" +
        this.red +
        "," +
        this.green +
        "," +
        this.blue +
        "," +
        star.alpha +
        ")";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Press Spacebar to start", this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
  
    this.ctx.font = "100px Audiowide-Regular";
    this.ctx.fillStyle =
        "lime"
    this.ctx.textAlign = "center";
    this.ctx.fillText("High Scores", this.ctx.canvas.width / 2, this.ctx.canvas.height / 4);
  
    
  
    this.ctx.font = "25px Audiowide-Regular";
    this.ctx.fillStyle = "white"
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.array[0], this.ctx.canvas.width / 2, 540);
    this.ctx.fillText(this.array[1], this.ctx.canvas.width / 2, 570);
    this.ctx.fillText(this.array[2], this.ctx.canvas.width / 2, 600);
    this.ctx.fillText(this.array[3], this.ctx.canvas.width / 2, 630);
    this.ctx.fillText(this.array[4], this.ctx.canvas.width / 2, 660);
  };


 

}
