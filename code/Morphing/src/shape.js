class Shape {
    constructor(points) {
        this.points = points;
        this.num = points.length;
    }

    extend(num) {
        console.assert(this.num <= num, "Assertion Error");
        if (this.num == num) { return this; }

        var transPoints = new Array(num);
        var multiple = floor(num / this.num);
        var index = 0;
        for (let i = 0; i < this.num; i++) {
            let p0 = this.points[i];
            let p1 = (i + 1 < this.num) ? this.points[i + 1] : this.points[0];
            let maxJ = multiple + (i < (num % this.num) ? 1 : 0);
            for (let j = 0; j < maxJ; j++) {
                transPoints[index++] = p5.Vector.lerp(p0, p1, j / maxJ);
            }
        }
        console.assert(index == num, "Assertion Error");
        return new Shape(transPoints);
    }

    render() {
        beginShape();
        this.points.forEach(p => { vertex(p.x, p.y); });
        endShape(CLOSE);
    }

    interpolate(shape, t, bias=0) {
        console.assert(this.num == shape.num, "Assertion Error");
        var interPoints = this.points.map((p, i) => p5.Vector.lerp(p, shape.points[(i+bias) % this.num], t));
        return new Shape(interPoints);
    }
}