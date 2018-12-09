function Sound(src, maxStreams = 1, vol) {
  this.streamNum = 0;
  this.streams = [];
  for (var i = 0; i < maxStreams; i++) {
      this.streams.push(new Audio(src));
      this.streams[i].volume = vol;
  }

  this.play = function() {
      
          this.streamNum = (this.streamNum + 1) % maxStreams;
          this.streams[this.streamNum].play();
      
  }

  this.stop = function() {
      this.streams[this.streamNum].pause();
      this.streams[this.streamNum].currentTime = 0;
  }
}