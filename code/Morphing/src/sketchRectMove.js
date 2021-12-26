var fps = 60;
var totalFrame = 60 * 22;

const capturer = new CCapture({
    format: "webm",
    framerate: fps,
    verbose: true
});

var morphs;
var t = 0;

function setup() {
    randomSeed(0);
    var canvasSize = 500;
    createCanvas(canvasSize, canvasSize);
    background(0);
    morphs = [new RectMorph(createVector(0, 0), width * 0.9, height * 0.9, 0)];
}

function draw() {
    if (frameCount === 1) {
        capturer.start();
    }
    fill(0, 20);
    rect(0, 0, width, height);
    stroke(255);
    strokeWeight(1);
    noFill();
    translate(width / 2, height / 2);
    var newMorphs = [];
    morphs.forEach(morph => {
        morph.render();
        var childMorph = morph.update();
        if (childMorph) { newMorphs.push(childMorph); }
        if (morph.phase !== -1) { newMorphs.push(morph); }
    });
    morphs = newMorphs;
    // delete newMorphs;
    // console.log(morphs.length);

    if (frameCount < totalFrame) {
        capturer.capture(canvas);
    } else if (frameCount === totalFrame) {
        capturer.save();
        capturer.stop();
        noLoop();
    }
}

class RectMorph {
    constructor(pos, w, h, level) {
        this.pos = pos;
        this.w = w;
        this.h = h;
        this.level = level;

        var shapes = [
            shapeRect(4, pos, w, h),
            shapeRect(4, p5.Vector.add(pos, createVector(-w / 4, -h / 4)), w / 2, h / 2),
            shapeRect(4, p5.Vector.add(pos, createVector(w / 4, -h / 4)), w / 2, h / 2),
            shapeRect(4, p5.Vector.add(pos, createVector(w / 4, h / 4)), w / 2, h / 2),
            shapeRect(4, p5.Vector.add(pos, createVector(-w / 4, h / 4)), w / 2, h / 2),
        ];
        var bias = Array(shapes.length).fill(0);
        this.morph = new Morph(shapes, bias);
        this.t = 0;
        this.dt = 1 / fps;
        this.phase = 0;
    }

    render() {
        this.morph.render(this.t);
        this.t += this.dt;
    }

    update() {
        if (this.level < 4) {
            if (this.phase == 0 && this.t >= 1) {
                this.phase++;
                let pos = p5.Vector.add(this.pos, createVector(-this.w / 4, -this.h / 4));
                return new RectMorph(pos, this.w / 2, this.h / 2, this.level + 1);
            } else if (this.phase == 1 && this.t >= 2) {
                this.phase++;
                let pos = p5.Vector.add(this.pos, createVector(this.w / 4, -this.h / 4));
                return new RectMorph(pos, this.w / 2, this.h / 2, this.level + 1);
            } else if (this.phase == 2 && this.t >= 3) {
                this.phase++;
                let pos = p5.Vector.add(this.pos, createVector(this.w / 4, this.h / 4));
                return new RectMorph(pos, this.w / 2, this.h / 2, this.level + 1);
            } else if (this.phase == 3 && this.t >= 4) {
                this.phase++;
                let pos = p5.Vector.add(this.pos, createVector(-this.w / 4, this.h / 4));
                return new RectMorph(pos, this.w / 2, this.h / 2, this.level + 1);
            }
        }
        if (this.t >= 5) {
            this.phase = -1;
        }
        if (this.level === 0) {
            console.log(this.t);
        }
    }
}