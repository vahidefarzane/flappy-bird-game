const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

const degree = Math.PI / 180;
let frames = 0;

const image = new Image();
image.src = "img/all.png";

class GameAudio {
  constructor(audioSrc) {
    this.audio = new Audio(audioSrc);
  }
}
const START = new GameAudio("audio/start.wav");
const FLAP = new GameAudio("audio/flap.wav");
const SCORE = new GameAudio("audio/score.wav");
const HIT = new GameAudio("audio/hit.wav");
const DIE = new GameAudio("audio/die.wav");

const state = {
  current: 0,
  getReady: 0,
  game: 1,
  over: 2,
};

function clickHandler() {
  switch (state.current) {
    case state.getReady:
      START.audio.play();
      state.current = state.game;
      break;
    case state.game:
      FLAP.audio.play();
      bird.flap();
      break;
    default:
      bird.speed = 0;
      bird.rotation = 0;
      pipes.position = [];
      score.value = 0;
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

class GameObject {
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
  }
}

class Background extends GameObject {
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

class Forground extends GameObject {
  constructor(sX, sY, w, h, x, y) {
    super(sX, sY, w, h, x, y);
    this.dx = 2;
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
class GameOver extends GameObject {
  constructor(sX, sY, w, h, x, y) {
    super(sX, sY, w, h, x, y);
    this.medals = [
      { x: 312, y: 113 },
      { x: 361, y: 113 },
      { x: 312, y: 159 },
      { x: 361, y: 159 },
    ];
    this.medalIndex = 0;
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
      if (score.value === 0) {
        this.medalIndex = 0;
      } else if (score.value <= 5 && score.value >= 1) {
        this.medalIndex = 1;
      } else if (score.value > 5 && score.value <= 10) {
        this.medalIndex = 2;
      } else {
        this.medalIndex = 3;
      }
      ctx.drawImage(
        image,
        this.medals[this.medalIndex].x,
        this.medals[this.medalIndex].y,
        45,
        45,
        74,
        178,
        45,
        45
      );
    }
  }
}
class GetReady extends GameObject {
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
class Bird {
  constructor(w, h, x, y) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;

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
    this.radius = 12;
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
        DIE.audio.play();
        state.current = state.over;
      }
    }
  }
  flap() {
    this.speed = -this.jump;
  }
}
class Score {
  constructor() {
    this.best = parseInt(localStorage.getItem("best")) || 0;
    this.value = 0;
  }
  draw() {
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";

    if (state.current == state.game) {
      ctx.lineWidth = 2;
      ctx.font = "35px IMPACT";

      ctx.fillText(this.value, canvas.width / 2, 50);
      ctx.strokeText(this.value, canvas.width / 2, 50);
    } else if (state.current == state.over) {
      ctx.font = "25px IMPACT";

      ctx.fillText(this.value, 225, 186);
      ctx.strokeText(this.value, 225, 186);

      ctx.fillText(this.best, 225, 228);
      ctx.strokeText(this.best, 225, 228);
    }
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
  draw() {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];
      let topYPos = p.y;
      let bottomYPos = p.y + this.h + this.gap;
      ctx.drawImage(
        image,
        this.top.sX,
        this.top.sY,
        this.w,
        this.h,
        p.x,
        topYPos,
        this.w,
        this.h
      );
      ctx.drawImage(
        image,
        this.bottom.sX,
        this.bottom.sY,
        this.w,
        this.h,
        p.x,
        bottomYPos,
        this.w,
        this.h
      );
    }
  }
  update() {
    if (state.current != state.game) return;
    if (frames % 100 == 0) {
      this.position.push({
        x: canvas.width,
        y: this.maxYPos * (Math.random() + 1),
      });
    }
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];
      p.x -= this.dx;

      let bottomPipesPos = p.y + this.h + this.gap;

      if (
        bird.x + bird.radius > p.x &&
        bird.x - bird.radius < p.x + this.w &&
        bird.y + bird.radius > p.y &&
        bird.y - bird.radius < p.y + this.h
      ) {
        HIT.audio.play();
        state.current = state.over;
      }

      if (
        bird.x + bird.radius > p.x &&
        bird.x - bird.radius < p.x + this.w &&
        bird.y + bird.radius > bottomPipesPos &&
        bird.y - bird.radius < bottomPipesPos + this.h
      ) {
        HIT.audio.play();
        state.current = state.over;
      }

      if (p.x + this.w <= 0) {
        this.position.shift();
        score.value += 1;
        SCORE.audio.play();
        score.best = Math.max(score.value, score.best);
        localStorage.setItem("best", score.best);
      }
    }
  }
}

let score = new Score();
const bird = new Bird(34, 26, 50, 150);
const pipes = new Pipes(553, 0, 502, 0, 53, 400, 2, 130);
const gameOver = new GameOver(
  175,
  228,
  225,
  202,
  canvas.width / 2 - 225 / 2,
  90
);
const foreground = new Forground(276, 0, 224, 112, 0, canvas.height - 112);
const background = new Background(0, 0, 275, 226, 0, canvas.clientHeight - 226);
const getReady = new GetReady(0, 228, 173, 152, canvas.width / 2 - 173 / 2, 80);

function draw() {
  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  background.draw();
  getReady.draw();
  pipes.draw();
  foreground.draw();
  bird.draw();
  gameOver.draw();
  score.draw();
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
