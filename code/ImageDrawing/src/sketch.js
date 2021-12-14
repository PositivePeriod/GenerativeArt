/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/624879

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

var circles = [];
var total = 100;
var img;

function preload() {
    img = loadImage('./assets/VanGogh-StarryNight.jpg');
}

function setup() {
    img.resize(500, 500);
    createCanvas(img.width, img.height);
    background(0);

    for (var i = 0; i < total; i++) {
        circles[i] = {
            prevPos: createVector(width / 2, height / 2),
            pos: createVector(width / 2, height / 2),
            dir: random() > 0.5 ? 1 : -1,
            radius: random(3, 10),
            angle: 0
        };
    }
}

function draw() {
    for (var i = 0; i < total; i++) {
        var circle = circles[i];
        circle.angle += circle.dir / circle.radius;
        circle.pos.add(p5.Vector.mult(p5.Vector.fromAngle(circle.angle), circle.radius));
        var notBounded = circle.pos.x < 0 || circle.pos.x > width || circle.pos.y < 0 || circle.pos.y > height;
        var color = img.get(circle.pos.x, circle.pos.y);
        if (brightness(color) > 70 || notBounded) {
            circle.dir *= -1;
            circle.radius = random(3, 10);
            circle.angle += PI;
        }
        stroke(color);
        line(circle.prevPos.x, circle.prevPos.y, circle.pos.x, circle.pos.y);
        circle.prevPos = circle.pos.copy();
    }
}