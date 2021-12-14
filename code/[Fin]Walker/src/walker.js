class Walker {
    constructor(color) {
        this.size = random(1, 3);
        this.pos = createVector(random(0, width), random(0, height));
        this.rgb = color;
        var speed = this.size * random(0.5, 1);
        this.vel = createVector(speed, 0);
        this.vel.rotate(random(0, TWO_PI));
    }

    draw() {
        push();
        noStroke();
        fill(this.rgb);
        ellipse(this.pos.x, this.pos.y, 2 * this.size, 2 * this.size);
        pop();
    }

    move() {
        var rotateRV = random(0, 1);
        if (rotateRV < 0.1) {
            this.vel.rotate(random(-0.03, 0.03) * PI);
        } else if (0.1 <= rotateRV && rotateRV < 0.12) {
            this.vel.rotate(random(-0.15, 0.15) * PI);
        }
        this.pos = this.pos.add(this.vel);
        this.reflectWall();
    }

    reflectWall() {
        if (!(this.size <= this.pos.x && this.pos.x <= width - this.size)) {
            this.vel.x *= -1;
            if (this.pos.x > width - this.size) {
                this.pos.x = width - this.size;
            } else if (this.pos.x < this.size) {
                this.pos.x = this.size;
            }
        } else if (!(this.size <= this.pos.y && this.pos.y <= height - this.size)) {
            this.vel.y *= -1;
            if (this.pos.y > height - this.size) {
                this.pos.y = height - this.size;
            } else if (this.pos.y < this.size) {
                this.pos.y = this.size;
            }
        }
    }
}
