const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

let frames = 0;
const image = new Image();
image.src = "img/allImages.png";

const state = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2,
};

function clickHandler() {
  switch (state.current) {
    case state.getReady:
      state.current = state.game;
      break;
    case state.game:
      // bird.flap()
      break;
    default:
      state.current = state.getReady;
      break;
  }
}

document.addEventListener("click", clickHandler);
class Background {
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
class Forground {
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
class GetReady {
  constructor(sX, sY, w, h, x, y) {
    this.sX = sX;
    this.sY = sY;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
  }
  draw() {
    if (state.current == state.getReady) {
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
    }
  }
}
class GameOver {
  constructor(sX, sY, w, h, x, y) {
    this.sX = sX;
    this.sY = sY;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
  }
  draw() {
    if (state.current == state.over) {
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
    }
  }
}
class Bird {
  constructor(sX, sY, w, h, x, y) {
    this.sX = sX;
    this.sY = sY;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.animation = [
      { sX: 276, sY: 112 },
      { sX: 276, sY: 139 },
      { sX: 276, sY: 164 },
      { sX: 276, sY: 139 },
    ];
    this.animationIndex = 0;
  }

  draw() {
    let bird = this.animation[this.animationIndex];
    ctx.drawImage(
      image,
      bird.sX,
      bird.sY,
      this.w,
      this.h,
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
  }
  update() {
    let period = state.current == state.getReady ? 10 : 5;
    this.animationIndex += frames % period == 0 ? 1 : 0;
    this.animationIndex = this.animationIndex % this.animation.length;
  }
  flap() {}
}

const background = new Background(0, 0, 275, 226, 0, canvas.height - 226);
const foreground = new Forground(276, 0, 224, 112, 0, canvas.height - 112);
const getReady = new GetReady(0, 228, 173, 152, canvas.width / 2 - 173 / 2, 80);
const gameOver = new GameOver(
  175,
  228,
  225,
  202,
  canvas.width / 2 - 225 / 2,
  90
);
const bird = new Bird(this.sX, this.sY, 34, 26, 50, 150);

function draw() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  background.draw();
  foreground.draw();
  bird.draw();
  getReady.draw();
  gameOver.draw();
}
function update() {
  bird.update();
}
function animate() {
  update();
  draw();
  frames++;
  requestAnimationFrame(animate);
}
animate();
