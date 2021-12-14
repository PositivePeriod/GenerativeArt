// new p5((p5) => {
//     var c;
//     p5.setup = function setup() {
//         c = p5.color(255, 0, 0);
//         p5.createCanvas(200, 200);
//         p5.background(0);
//         p5.noStroke();
//     };
//     p5.draw = function draw() {
//         p5.fill(0, 10);
//         p5.rect(0, 0, p5.width, p5.height);
//         p5.fill(c);
//         p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
//     };
// });

var c;
function setup() {
    c = color(255, 0, 0);
    createCanvas(200, 200);
    background(0);
    noStroke();
};

function draw() {
    fill(0, 10);
    rect(0, 0, width, height);
    fill(c);
    ellipse(mouseX, mouseY, 50, 50);
};