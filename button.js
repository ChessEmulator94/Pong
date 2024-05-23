class button {
  constructor(text, position, size) {
    this.text = text;
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.size = {
      w: size.w,
      h: size.h,
    };
  }
}
