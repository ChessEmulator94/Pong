class game {
  constructor() {
    // Initialise player 1
    this.playerOne = new padel({
      position: {
        x: canvas.width / 10,
        y: (canvas.height / 6) * 1,
      },
      velocity: 0,
      width: 10,
      height: canvas.height / 6,
      windowHeight: canvas.height,
    });

    // Initialise player 2
    this.playerTwo = new padel({
      position: {
        x: (canvas.width / 10) * 9 - 10,
        y: (canvas.height / 6) * 4,
      },
      velocity: 0,
      width: 10,
      height: canvas.height / 6,
      windowHeight: canvas.height,
    });

    // Initialise ball for game
    this.gameBall = new ball();
    // Set starting scores for players to 0
    this.score = {
      p1: 0,
      p2: 0,
    };

    this.BALL_VELOCITY_MAGNITUDE = 8;

    this.ballPastBoundary = false;

    this.startGame();
  }

  // Redraw sprites
  update() {
    this.playerOne.draw();
    this.playerTwo.draw();
    this.gameBall.draw();
    this.checkAllCollisions();
  }

  checkAllCollisions() {
    // Check wall collisions
    this.checkWallCollisions();
    // Check padel collisions
    this.checkPadelCollisions();
    // Check if round is over
    this.checkOutOfBounds();
  }

  wallBounce() {
    this.gameBall.velocity.magnitude *= -1;
    this.gameBall.velocity.direction = 180 - this.gameBall.velocity.direction;
  }

  padelBounce(padel) {
    /* Calculate relative position of padel the ball hit
     * Get the padel y position
     * Get the ball y position
     * Subtract the padel y position from the padel and from the ball
     * You now have the padel at position 0, taking up padel.height vertical space
     * And the ball will be within that vertical space
     * Normalise the data to a -1 to 1 scale
     */
    let ballPos = this.gameBall.position.y - padel.position.y;
    let minY = 0 - this.gameBall.width / 2;
    let maxY = padel.height + this.gameBall.width / 2;
    let normalisedVal = 2 * ((ballPos - minY) / maxY) - 1;

    // if moving towards playerTwo
    if (this.gameBall.velocity.magnitude > 0) {
      let newDirection = normalisedVal * -1 * this.gameBall.MAX_BOUNCE_ANGLE;
      this.gameBall.velocity.direction = newDirection;
    } else {
      // if moving towards playerOne
      let newDirection = normalisedVal * this.gameBall.MAX_BOUNCE_ANGLE;
      this.gameBall.velocity.direction = newDirection;
    }
    this.gameBall.velocity.magnitude *= -1;
  }

  // Checks if ball hit a wall
  checkWallCollisions() {
    // Check if touching top wall
    if (this.gameBall.position.y - this.gameBall.width / 2 <= 0) {
      // Adjust ball velocity
      this.wallBounce();
    }

    if (this.gameBall.position.y + this.gameBall.width / 2 >= canvas.height) {
      // Adjust ball velocity
      this.wallBounce();
    }
  }
  // Checks if ball hits a padel on the inner facing side
  checkPadelCollisions() {
    if (!this.ballPastBoundary) {
      // Check against player 1
      if (
        this.gameBall.position.x - this.gameBall.width / 2 <=
        this.playerOne.position.x + this.playerOne.width
      ) {
        // Collision on x axis true
        if (
          this.gameBall.position.y + this.gameBall.width / 2 >=
            this.playerOne.position.y &&
          this.gameBall.position.y <
            this.playerOne.position.y +
              this.playerOne.height +
              this.gameBall.width / 2
        ) {
          // Collision has occured on y axis too
          this.gameBall.position.x =
            this.playerOne.position.x +
            this.playerOne.width +
            this.gameBall.width / 2;
          // Adjust ball velocity
          this.padelBounce(this.playerOne);
        } else {
          this.ballPastBoundary = true;
        }
      }
      // Check against player 2
      if (
        this.gameBall.position.x + this.gameBall.width / 2 >=
        this.playerTwo.position.x
      ) {
        // Collision on x axis true
        if (
          this.gameBall.position.y + this.gameBall.width / 2 >=
            this.playerTwo.position.y &&
          this.gameBall.position.y <
            this.playerTwo.position.y + this.playerTwo.height
        ) {
          // Collision has occured on y axis too
          this.gameBall.position.x =
            this.playerTwo.position.x - this.gameBall.width / 2;
          // Adjust ball velocity
          this.padelBounce(this.playerTwo);
        } else {
          this.ballPastBoundary = true;
        }
      }
    }
  }

  checkOutOfBounds() {
    if (this.gameBall.position.x < 0) {
      this.score.p2 += 1;
      this.startGame();
    }
    if (this.gameBall.position.x > canvas.width) {
      this.score.p1 += 1;
      this.startGame();
    }
  }

  startGame() {
    this.gameBall = new ball();
    this.ballPastBoundary = false;

    this.gameBall.velocity.magnitude = this.BALL_VELOCITY_MAGNITUDE;
  }
}
