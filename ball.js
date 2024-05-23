class ball {
  constructor() {
    this.width = 20;
    this.height = 20;
    this.position = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };
    this.velocity = {
      x: 0,
      y: 0,
      magnitude: 0, // Constant
      direction: 0,
    };
    this.draw();
  }

  draw() {
    canvasContext.fillStyle = "white";
    canvasContext.beginPath();
    canvasContext.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
    canvasContext.fill();
    this.update();
  }

  // Changes position based on current (x,y) and velocity magnitude
  updatePosition() {
    this.position.x +=
      this.velocity.magnitude *
      Math.cos((this.velocity.direction * Math.PI) / 180);

    this.position.y +=
      this.velocity.magnitude *
      Math.sin((this.velocity.direction * Math.PI) / 180);
  }

  update() {
    this.updatePosition();
  }
}
