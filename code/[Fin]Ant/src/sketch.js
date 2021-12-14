var ants;

function setup() {
    createCanvas(500, 500);
    background(0, 0, 0);
    ants = new Array(10);
    for (var i = 0; i < ants.length; i++) {
        ants[i] = new Ant();
    }
}

function draw() {
    background(0, 0, 0);
    for (var i = 0; i < ants.length; i++) {
        ants[i].update();
        ants[i].draw();
    }
}