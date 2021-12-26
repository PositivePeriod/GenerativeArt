var t = 0;
var points = Array(10);

function setup() {
    createCanvas(500, 500);
    var colorList = [
        color(250, 201, 1),
        color(34, 80, 149),
        color(221, 1, 0)
    ];
    for (let i = 0; i < points.length; i++) {
        let angleT = random(10000);
        let radT = random(10000);
        points[i] = [angleT, radT];
    }
}

function draw() {
    fill(200);
    rect(0, 0, width, height);

    translate(width / 2, height / 2);

    var pointsInfo = [];
    for (let i = 0; i < points.length; i++) {
        var angle = i / points.length * TWO_PI + i / points.length * TWO_PI * map(noise(points[i][0]), 0, 1, -0.1, 0.1);
        var rad = map(noise(points[i][1]), 0, 1, 100, 200);
        points[i][0] += 0.01;
        points[i][1] += 0.02;
        pointsInfo.push([angle, rad]);
    }
    pointsInfo.sort((a, b) => a[0] - b[0]);

    fill(237, 34, 93);
    noStroke();
    beginShape();
    pointsInfo.forEach(([angle, rad]) => {
        console.log(angle, rad);
        vertex(cos(angle) * rad, sin(angle) * rad);
        ellipse(cos(angle) * rad, sin(angle) * rad, 10, 10);
    });
    endShape();
    fill(0);
    ellipse(0, 0, 10, 10);
}