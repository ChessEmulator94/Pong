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
  }

  // Checks if ball hit a wall
  checkWallCollisions() {}
  // Checks if ball hits a padel
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
            this.playerOne.position.y + this.playerOne.height
        ) {
          // Collision has occured on y axis too
          this.gameBall.velocity.magnitude *= -1;
          this.gameBall.position.x =
            this.playerOne.position.x +
            this.playerOne.width +
            this.gameBall.width / 2;
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
          this.gameBall.velocity.magnitude *= -1;
          this.gameBall.position.x =
            this.playerTwo.position.x - this.gameBall.width / 2;
        } else {
          this.ballPastBoundary = true;
        }
      }
    }
  }

  startGame() {
    this.gameBall.velocity.magnitude = -3;
  }
}
