var size;
var img;
var maxSize
var text;
var t = 0;
function preload() {
    img = loadImage('assets/VanGogh-StarryNight.jpg'); // 2728 x 2160
}

function setup() {
    size = 500;
    createCanvas(size, size);
    background(256, 256, 256);
    // imageMode(CORNER);
    // image(img, 0, 0, size, size);
    // render(0, 0, size);
    img.resize(width, height);
    maxSize = floor(min(width, height) * 0.2);
    noStroke();
    text = createP();
    frameRate(60);
};

function draw() {
    // fill(256, 0.1);
    // rect(0, 0, width, height);

    var x = random(0, width);
    var y = random(0, height);
    var rad = random(maxSize/2, maxSize);
    var color = img.get(x,y);
    color[3] = 128;
    fill(color);
    circle(x, y, rad);
    maxSize = max(size*0.1, maxSize-0.1);
    text.html(`${t++} | ${maxSize}`);
};

// function render(x, y, size, level = 0) {
//     var half = size / 2;
//     let c = img.get(60, 90);
//     if (level > 6) {
//         circle(x + half, y + half, size);
//         return;
//     }
//     if (brightness(c) < 69) {
//         render(x, y, half, level + 1);
//         render(x + half, y, half, level + 1);
//         render(x, y + half, half, level + 1);
//         render(x + half, y + half, half, level + 1);
//     } else {
//         circle(x + half, y + half, size);
//     }
// }
