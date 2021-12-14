var drawing;

function setup() {
    var seed = 0;
    var canvasSize = 1000;
    var fps = 30;
    noiseSeed(seed);
    createCanvas(canvasSize, canvasSize);
    frameRate(fps);
    drawing = new DrawingGray(2000, "Walker - Gray");
    // drawing = new DrawingSpring(2000, "Walker - Spring");
    // drawing = new DrawingSummer(2000, "Walker - Summer");
    // drawing = new DrawingFall(2000, "Walker - Fall");
    // drawing = new DrawingWinter(2000, "Walker - Winter");
    drawing.init();
}

function draw() {
    drawing.draw();
}