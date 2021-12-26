var t = 0;
var morph;

function setup() {
    createCanvas(500, 500);
    background(0);
    var num = 5;
    var size = min(width, height) * 0.8;
    var shapes = [...Array(num).keys()].map((i) => {
        return shapeCircle(3 + i, createVector(0, 0), size/2);
    });
    // shapes[5] = shapeRect(9, createVector(0,0), size, size);
    var bias = Array(num).fill(1);
    morph = new Morph(shapes, bias);
}

function draw() {
    fill(0, 30);
    rect(0, 0, width, height);
    stroke(255);
    strokeWeight(4);
    noFill();
    translate(width / 2, height / 2);
    morph.render(t);
    t += 0.01;
}