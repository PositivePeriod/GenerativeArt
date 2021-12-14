class Ant {
    constructor() {
        this.size = random(7, 21);
        this.pos = createVector(random(0, width), random(0, height));
        var speed = this.size * random(0.01, 0.05);
        this.v = createVector(speed, 0);
        this.v.rotate(random(0, TWO_PI));
    }

    draw() {
        var dir = this.v.copy();
        dir.normalize();
        var bodyDpos = dir.copy().mult(this.size / 2);
        var headPos = p5.Vector.add(this.pos, bodyDpos);
        var tailPos = p5.Vector.sub(this.pos, bodyDpos);
        var cEyePos = p5.Vector.add(headPos, dir.copy().mult(this.size / 2));
        dir.rotate(HALF_PI);
        var eyeDpos = dir.copy().mult(this.size / 4);
        var lEyePos = p5.Vector.add(cEyePos, eyeDpos);
        var rEyePos = p5.Vector.sub(cEyePos, eyeDpos);
        push();
        stroke(0, 0, 0, 0);
        // fill(255, 255, 255);
        // ellipse(this.pos.x,this.pos.y, 2*this.size, 2*this.size);
        fill(255, 0, 0);
        ellipse(headPos.x, headPos.y, this.size, this.size);
        ellipse(tailPos.x, tailPos.y, this.size, this.size);
        ellipse(lEyePos.x, lEyePos.y, this.size / 2, this.size / 2);
        ellipse(rEyePos.x, rEyePos.y, this.size / 2, this.size / 2);
        pop();
    }

    update() {
        this.move();
        this.reflectWall();
    }

    move() {
        var rotateRV = random(0, 1);
        if (rotateRV < 0.1) {
            this.v.rotate(random(-0.03, 0.03) * PI);
        } else if (0.1 <= rotateRV && rotateRV < 0.12) {
            this.v.rotate(random(-0.15, 0.15) * PI);
        }
        this.pos = this.pos.add(this.v);
    }

    reflectWall() {
        if (!(this.size <= this.pos.x && this.pos.x <= width - this.size)) {
            this.v.x *= -1;
            if (this.pos.x > width - this.size) {
                this.pos.x = width - this.size;
            } else if (this.pos.x < this.size) {
                this.pos.x = this.size;
            }
        } else if (!(this.size <= this.pos.y && this.pos.y <= height - this.size)) {
            this.v.y *= -1;
            if (this.pos.y > height - this.size) {
                this.pos.y = height - this.size;
            } else if (this.pos.y < this.size) {
                this.pos.y = this.size;
            }
        }
    }
}