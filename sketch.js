var balls = []
let bg = ["#F2EDEC"];

class ball_class {
  constructor(args) {
    this.p = args.p || { x: width / 2, y: height / 2 };
    this.r = args.r || random(60, 125);
    this.v = args.v || { x: random(-2, 2), y: random(-2, 2) };
    this.b = args.b || random(60, 125);
    this.shape_num = args.shape_num || int(random(4));
    
    this.kiji_color = random(["#d4a276", "#895737"]);
    this.choco_color = random(["#f9bec7", "#522500", "#6a994e"]);
  }

  draw() {
    let d = this.b;

    push();
    translate(this.p.x, this.p.y);

    if (this.shape_num == 0) {
      // モコモコ
      push();
      drawingContext.setLineDash([1, 20]);
      strokeWeight(d / 2.5);
      stroke(this.kiji_color);
      noFill();
      circle(0, 0, d * 0.8);

      strokeWeight(d / 2.8);
      stroke(this.choco_color);
      circle(0, 0, d * 0.7);
      pop();
    } else if (this.shape_num == 1) {
      // ノーマル
      strokeWeight(d / 2.5);
      stroke(this.kiji_color);
      noFill();
      circle(0, 0, d * 0.8);

      strokeWeight(d / 3.5);
      stroke(this.choco_color);
      circle(0, 0, d * 0.7);
    } else if (this.shape_num == 2) {
      // ハーフ
      strokeWeight(d / 2.5);
      stroke(this.kiji_color);
      noFill();
      circle(0, 0, d * 0.8);

      strokeWeight(d / 2.3);
      stroke(this.choco_color);
      strokeCap(SQUARE);
      arc(0, 0, d * 0.8, d * 0.8, 0, 180);
    } else if (this.shape_num == 3) {
      // クルーラー
      push();
      drawingContext.setLineDash([3, 20]);
      strokeWeight(d / 2);
      noFill();
      stroke(this.kiji_color);
      circle(0, 0, d * 0.8);

      strokeWeight(d / 2);
      stroke("#895737");
      strokeCap(SQUARE);
      circle(0, 0, d * 0.8);
      pop();
    }

    pop();
  }

  update() {
    this.p.x += this.v.x;
    this.p.y += this.v.y;

    if (this.p.x < 0 || this.p.x > width) {
      this.v.x = -this.v.x;
    }
    if (this.p.y < 0 || this.p.y > height) {
      this.v.y = -this.v.y;
    }
  }

  isBallInRange() {
    let d = dist(mouseX, mouseY, this.p.x, this.p.y);
    if (d < this.b) {
      return true;
    } else {
      return false;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (i = 0; i < 100; i++) {
    ball = new ball_class({
      v: { x: random(-2, 2), y: random(-2, 2) },
      p: { x: random(0, width), y: random(0, height) },
      a: { x: 0, y: 0 }
    });
    balls.push(ball);
  }
}

var score = 0;

function draw() {
  background("#F2EDEC");
  fill(0);
  textSize(50);
  text("消滅數量:" + score, 40, 50);

  for (let ball of balls) {
    ball.draw();
    ball.update();
    if (ball.isBallInRange()) {
      ball.v.x += 0.8;
      ball.v.y += 0.8;
    }
  }
}

function mousePressed() {
  for (let i = balls.length - 1; i >= 0; i--) {
    if (balls[i].isBallInRange()) {
      balls.splice(i, 1);
      score++;
    }
  }
  fill("#f00");
  textSize(70);
  text(score, 50, 0);
}