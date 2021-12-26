function shapePoly(num, pos, vertices) {
    console.assert(vertices.length <= num, "Assertion Error");
    var points = Array(num);
    var multiple = num / vertices.length;
    var rest = num % vertices.length;

    var indexLengthNum = [];
    for (let i = 0; i < vertices.length; ++i) {
        let p0 = vertices[i];
        let p1 = i + 1 < vertices.length ? vertices[i + 1] : vertices[0];
        indexLengthNum.push([i, p5.Vector.dist(p0, p1)]);
    }
    indexLengthNum.sort((a, b) => -a[1] + b[1]);
    for (let i = 0; i < rest; ++i) { indexLengthNum[i][2] = multiple + 1; }
    for (let i = rest; i < vertices.length; ++i) { indexLengthNum[i][2] = multiple; }
    indexLengthNum.sort((a, b) => a[0] - b[0]);

    var index = 0;
    for (let i = 0; i < vertices.length; ++i) {
        let p0 = vertices[i];
        let p1 = i + 1 < vertices.length ? vertices[i + 1] : vertices[0];
        for (let j = 0; j < indexLengthNum[i][2]; ++j) {
            points[index++] = p5.Vector.lerp(p0, p1, j / indexLengthNum[i][2]);
        }
    }
    points.forEach(p => { p.add(pos); });
    console.assert(index == num, "Assertion Error");
    return new Shape(points);
}

function shapeRect(num, pos, w, h) {
    var vertices = [
        createVector(-w / 2, -h / 2),
        createVector(w / 2, -h / 2),
        createVector(w / 2, h / 2),
        createVector(-w / 2, h / 2)
    ];
    return shapePoly(num, pos, vertices);
}

function shapeCircle(num, pos, rad) {
    var points = [...Array(num).keys()].map((i) => {
        var angle = i / num * TWO_PI;
        var circleV = p5.Vector.fromAngle(angle).setMag(rad);
        return p5.Vector.add(pos, circleV);
    });
    return new Shape(points);
}