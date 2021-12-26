class Morph {
    constructor(shapes, bias) {
        console.assert(shapes.length == bias.length, "Assertion Error");
        this.num = shapes.length;
        this.startShapes = new Array(this.num);
        this.endShapes = new Array(this.num);
        this.bias = bias;
        for (let i = 0; i < this.num; i++) {
            let s0 = shapes[i];
            let s1 = shapes[(i + 1) % this.num];
            this.startShapes[i] = s0.extend(max(s0.num, s1.num));
            this.endShapes[i] = s1.extend(max(s0.num, s1.num));
        }
    }
    render(time) {
        var t = time % this.num;
        var index = floor(t);
        var stepT = t - floor(t);
        // const bias = this.bias.slice(0, index).reduce((acc, v)=>acc+v, 0);
        var shape = this.startShapes[index].interpolate(this.endShapes[index], stepT, this.bias[index]);
        shape.render();
    }
}