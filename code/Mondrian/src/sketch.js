var rects = Array(100);

function setup() {
    createCanvas(500, 500);
    background(255);
    var colorList = [
        color(250, 201, 1),
        color(34, 80, 149),
        color(221, 1, 0)
    ];
    for (let i = 0; i < rects.length; i++) {
        rects[i] = new Rect(colorList[floor(random(3))]);
    }
}

function draw() {
    fill(255);
    rect(0, 0, width, height);
    rects.forEach(r => { r.update(); r.render(); });
}

class Rect {
    constructor(c) {
        this.color = c;
        this.x0;
        this.x1;
        this.y0;
        this.y1;
        this.tx0 = random(100000);
        this.ty0 = random(100000);
        this.tx1 = random(100000);
        this.ty1 = random(10000);
        this.update();
        this.noiseSize = 0.1;
    }

    update() {
        this.x0 = map(noise(this.tx0 * this.noiseSize), 0, 1, 0, width);
        this.x1 = map(noise(this.tx1 * this.noiseSize), 0, 1, 0, width);
        this.y0 = map(noise(this.ty0 * this.noiseSize), 0, 1, 0, height);
        this.y1 = map(noise(this.ty1 * this.noiseSize), 0, 1, 0, height);
        this.tx0 += 0.01;
        this.ty0 += 0.01;
        this.tx1 += 0.01;
        this.ty1 += 0.01;
    }
    render() {
        strokeWeight(4);
        stroke(0, 0, 0);
        fill(this.color);
        rect(this.x0, this.y0, this.x1-this.x0,this. y1-this.y0);
        // beginShape();
        // vertex(this.x0, this.y0);
        // vertex(this.x1, this.y0);
        // vertex(this.x1, this.y1);
        // vertex(this.x0, this.y1);
        // endShape(CLOSE);
    }
}