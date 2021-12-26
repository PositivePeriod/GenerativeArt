var t = 0;
var morph;

function setup() {
    createCanvas(500, 500);
    background(0);
    var slice = 0;
    var bias = [
        0, 9, 0, 5, 11,
        14, 1, 0, 0, 0
    ];
    // bias[1] = 1;
    var shapes = shapeNumber(createVector(0, 0), 50);
    morph = new Morph(shapes.slice(slice), bias.slice(slice));
}

function draw() {
    fill(0, 5);
    rect(0, 0, width, height);
    stroke(255);
    strokeWeight(4);
    noFill();
    translate(width / 2, height / 2);
    morph.render(t);
    t += 0.01;
}

function shapeNumber(pos, size) {
    var points = Array(24);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 6; j++) {
            var index = i + j * 4;
            points[index] = createVector(i, j);
        }
    }
    for (const p of points) {
        // console.log(p);
        p.sub(1.5, 3);
        p.mult(size);
        p.add(pos);
    }
    var p = [
        [0, 3, 23, 20],
        [1, 2, 22, 21],
        [0, 3, 15, 13, 17, 19, 23, 20, 8, 10, 6, 4],
        [0, 3, 23, 20, 16, 18, 14, 12, 8, 10, 6, 4],
        [0, 1, 9, 10, 2, 3, 23, 22, 14, 12],
        [0, 3, 7, 5, 9, 11, 23, 20, 16, 18, 14, 12],
        [0, 3, 7, 5, 9, 11, 23, 20],
        [0, 3, 23, 22, 6, 5, 9, 8],
        [0, 3, 23, 20],
        [0, 3, 23, 20, 16, 18, 14, 12]
    ];
    var shapes = Array(p.length);
    for (let i = 0; i < shapes.length; i++) {
        shapes[i] = new Shape(p[i].map(j => points[j]));
    }
    return shapes;
    //  0  1  2  3
    //  4  5  6  7
    //  8  9 10 11
    // 12 13 14 15
    // 16 17 18 19
    // 20 21 22 23
}