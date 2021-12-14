class Drawing {
    constructor(numWalker, saveName) {
        this.t = 0;
        this.maxT = 500;
        this.num = numWalker;
        this.name = saveName;
        this.walkers = new Array(this.num);
        this.text = createP();
    }

    init() {
        for (let i = 0; i < this.walkers.length; i++) {
            this.walkers[i] = new Walker(this.colorFunc(i));
        }
    }

    colorFunc(i) {
        return color(256, 256, 256);
    }

    draw() {
        // background(0,0,0);
        for (let i = 0; i < this.walkers.length; i++) {
            this.walkers[i].move();
            this.walkers[i].draw();
        }
        this.setTitle(`${this.name}.png | ${this.t}/${this.maxT}`);
        if (this.t++ == this.maxT) {
            save(`${this.name}.png`);
            noLoop();
        }
    }

    setTitle(text) {
        this.text.html(text);
    }
}

class DrawingGray extends Drawing {
    constructor(numWalker, saveName) {
        super(numWalker, saveName);
        colorMode(RGB, this.num);
        background(this.num / 2, this.num / 2, this.num / 2);
    }

    colorFunc(i) {
        return color(i);
    }
}

class DrawingSpring extends Drawing {
    constructor(numWalker, saveName) {
        super(numWalker, saveName);
        this.sqrtNum = ceil(pow(this.num, 0.5));
        colorMode(RGB, 2 * this.sqrtNum);
        background(this.sqrtNum, 0, this.sqrtNum / 2);
    }
    colorFunc(i) {
        return color(this.sqrtNum + floor(i / this.sqrtNum), floor(i % this.sqrtNum), this.sqrtNum / 2 + floor(i / this.sqrtNum));
    }
}

class DrawingSummer extends Drawing {
    constructor(numWalker, saveName) {
        super(numWalker, saveName);
        this.sqrtNum = ceil(pow(this.num, 0.5));
        colorMode(RGB, 2 * this.sqrtNum);
        background(0, this.sqrtNum, this.sqrtNum);
    }
    colorFunc(i) {
        return color(0, this.sqrtNum + floor(i / this.sqrtNum), this.sqrtNum + floor(i % this.sqrtNum));
    }
}

class DrawingFall extends Drawing {
    constructor(numWalker, saveName) {
        super(numWalker, saveName);
        this.sqrtNum = this.sqrtNum;
        this.sqrtNum = ceil(pow(this.num, 0.5));
        colorMode(RGB, 2 * this.sqrtNum);
        background(this.sqrtNum, this.sqrtNum, 0);
    }

    colorFunc(i) {
        return color(this.sqrtNum + floor(i / this.sqrtNum), this.sqrtNum + floor(i % this.sqrtNum), 0);
    }
}

class DrawingWinter extends Drawing {
    constructor(numWalker, saveName) {
        super(numWalker, saveName);
        this.sqrtNum = ceil(pow(this.num, 0.5));
        colorMode(RGB, 2 * this.sqrtNum);
        background(this.sqrtNum, this.sqrtNum, 2 * this.sqrtNum);
    }
    colorFunc(i) {
        return color(this.sqrtNum * 0.5 + floor(i / this.sqrtNum), this.sqrtNum * 0.5 + floor(i / this.sqrtNum), this.sqrtNum + floor(i % this.sqrtNum));
    }
}