const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

let frame = 0;
const image = new Image();
image.src = "img/allImages.png";

class StaticObj {
  //for Objects that are stable (don't move)
  constructor(sX, sY, w, h, x, y) {
    this.sX = sX;
    this.sY = sY;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
  }
  draw() {
    ctx.drawImage(
      image,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    ctx.drawImage(
      image,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  }
}

let background = new StaticObj(0, 0, 275, 226, 0, canvas.height - 226);

class MovingObj {
  //for Objects that aren't stable (move)
  constructor(sX, sY, w, h, x, y) {
    this.sX = sX;
    this.sY = sY;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
  }
  draw() {
    ctx.drawImage(
      image,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
    ctx.drawImage(
      image,
      this.sX,
      this.sY,
      this.w,
      this.h,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    );
  }
  update() {}
}
let foreground = new StaticObj(276, 0, 224, 112, 0, canvas.height - 112);

function update() {}
function draw() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  background.draw();
  foreground.draw();
}
function animate() {
  update();
  draw();
  frame++;
  requestAnimationFrame(animate);
}

animate();
