// Set up game window
const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

// Initialise a new game
gameState = new game();

// Objecrt to track which keys are in use and what their functions are
const keycontroller = {
  w: {
    pressed: false,
    func: () => {
      gameState.playerOne.movePadel(-0.2);
    },
  },
  z: {
    pressed: false,
    func: () => {
      gameState.playerOne.movePadel(0.2);
    },
  },
  i: {
    pressed: false,
    func: () => {
      gameState.playerTwo.movePadel(-0.2);
    },
  },
  m: {
    pressed: false,
    func: () => {
      gameState.playerTwo.movePadel(0.2);
    },
  },
};

// Keyboard handlers
window.addEventListener("keydown", (event) => {
  keycontroller[event.key].pressed = true;
});
window.addEventListener("keyup", (event) => {
  keycontroller[event.key].pressed = false;
});

/*
 * Iterates over keycontroller to see which buttons
 * are still pressed and which aren't.
 * Calls functions of those pressed
 */
function updatePositions() {
  Object.keys(keycontroller).forEach((element) => {
    if (keycontroller[element].pressed) {
      keycontroller[element].func();
    }
  });
}

// Infinite loop that constantly updates graphics
function animate() {
  window.requestAnimationFrame(animate);
  // Redraw the canvas
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  // Check if for changes in movement
  updatePositions();
  // Redraw the game
  gameState.update();
}
animate();
