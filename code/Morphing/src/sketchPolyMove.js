var morphNum = 15;
var shapeNum = 4;
var t = Array(morphNum).fill(0);
var dt = Array(morphNum);
var morphs = Array(morphNum);

function setup() {
    randomSeed(0);

    var canvasSize = 500;
    createCanvas(canvasSize, canvasSize);
    background(0);
    for (let i = 0; i < morphNum; i++) {
        let shapes = Array(shapeNum);
        for (let j = 0; j < shapeNum; j++) {
            let pos = createVector(canvasSize * random(0.1, 0.9), canvasSize * random(0.1, 0.9));
            shapes[j] = shapeCircle(3 + j, pos, canvasSize * 0.1, canvasSize * 0.1);
        }
        let bias = Array(morphNum).fill(0);
        dt[i] = random(0.01, 0.05);
        morphs[i] = new Morph(shapes, bias);
    }
}

function draw() {
    fill(0, 20);
    rect(0, 0, width, height);
    stroke(255);
    strokeWeight(4);
    noFill();
    // translate(width / 2, height / 2);
    for (let i = 0; i < morphNum; i++) {
        morphs[i].render(t[i]);
        t[i] += dt[i];
    }
}