class scoreboard {
  constructor() {
    this.p1 = 0;
    this.p2 = 0;

    this.draw();
  }

  draw() {
    // Draw p1's score
    canvasContext.fillStyle = "red";
    canvasContext.font = "100px Pixelify Sans ";
    canvasContext.fillText(this.p1, canvas.width / 4, canvas.height / 4);
    canvasContext.fillText(this.p2, (canvas.width / 4) * 3, canvas.height / 4);
  }
}
