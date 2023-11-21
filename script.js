const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

const degree = Math.PI / 180;
let frames = 0;
const image = new Image();
image.src = "img/all.png";

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
      bird.flap();
      break;
    default:
      bird.speed = 0;
      bird.rotation = 0;
      state.current = state.getReady;
      break;
  }
}

document.addEventListener("click", clickHandler);
document.addEventListener("keydown", (e) => {
  if (e.code == "ArrowUp") {
    clickHandler();
  }
});
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
    this.dx = 2;
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
  update() {
    if (state.current == state.game) {
      this.x = (this.x - this.dx) % (this.w / 2);
    }
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
    this.speed = 0;
    this.gravity = 0.25;
    this.jump = 4.6;
    this.rotation = 0;
  }

  draw() {
    let bird = this.animation[this.animationIndex];
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(
      image,
      bird.sX,
      bird.sY,
      this.w,
      this.h,
      -this.w / 2,
      -this.h / 2,
      this.w,
      this.h
    );

    ctx.restore();
  }
  update() {
    let period = state.current == state.getReady ? 10 : 5;
    this.animationIndex += frames % period == 0 ? 1 : 0;
    this.animationIndex = this.animationIndex % this.animation.length;
    if (state.current == state.getReady) {
      this.y = 150;
    } else {
      this.speed += this.gravity;
      this.y += this.speed;
      if (this.speed < this.jump) {
        this.rotation = -25 * degree;
      } else {
        this.rotation = 90 * degree;
      }
    }
    if (this.y + this.h / 2 >= canvas.height - foreground.h) {
      this.y = canvas.height - foreground.h - this.h / 2;
      this.animationIndex = 1;
      if (state.current == state.game) {
        state.current = state.over;
      }
    }
  }
  flap() {
    this.speed = -this.jump;
  }
}
class Pipes {
  constructor(sXTop, sYTop, sXBottom, SYBottom, w, h, dx, gap) {
    this.top = {
      sX: sXTop,
      sY: sYTop,
    };
    this.bottom = {
      sX: sXBottom,
      sY: SYBottom,
    };
    this.w = w;
    this.h = h;
    this.dx = dx;
    this.gap = gap;
    this.position = [];
    this.maxYPos = -150;
  }
  draw() {}
  update() {
    if (state.current != state.game) return;
    
  }
}
const pipes = new Pipes(553, 0, 502, 0, 53, 400, 2, 80);

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
  pipes.draw();
  foreground.draw();
  bird.draw();
  getReady.draw();
  gameOver.draw();
}
function update() {
  bird.update();
  foreground.update();
  pipes.update();
}
function animate() {
  update();
  draw();
  frames++;
  requestAnimationFrame(animate);
}
animate();
