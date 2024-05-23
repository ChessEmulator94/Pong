class padel {
  constructor({ position, velocity, width, height, windowHeight }) {
    this.position = position;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.windowHeight = windowHeight;
    this.draw();
  }

  draw() {
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.position.y += this.velocity;
    // Moved beyond the top border
    if (this.position.y < 0) {
      this.position.y = 0;
    }
    // Moved beyond the bottom border
    if (this.position.y > this.windowHeight - this.height) {
      this.position.y = this.windowHeight - this.height;
    }
  }

  movePadel(velocity) {
    // If intended movement is up
    if (velocity < 0) {
      // If currently moving down
      if (this.velocity > 0) {
        // Set velocity to lowest amount & up
        this.velocity = -0.2;
      } else {
        this.velocity += velocity;
      }
      // If intended movement is down
    } else {
      // If currently moving up
      if (this.velocity < 0) {
        // Set velocity to lowest amount & down
        this.velocity = 0.2;
      } else {
        this.velocity += velocity;
      }
    }

    // Update sprite
    this.update();
  }
}
