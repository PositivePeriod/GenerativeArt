var seed = 0;
var blocks = [];
var platform;
var lastColor = [];

// var totalBallNum = 280;
var totalBallNum = 800;

function setup() {
    randomSeed(seed);
    createCanvas(600, 600);
    noStroke();

    matter.init(false);
    Matter.Runner.isFixed = true;
    Matter.Common._seed = 0;

    platform = [
        matter.makeBarrier(width / 2, height, width, 6),
        matter.makeBarrier(0, height / 2, 6, height),
        matter.makeBarrier(width, height / 2, 6, height),
    ];
    // frameRate(10);
}

function mousePressed() {
    makeBall();
}

function draw() {
    matter.manualTick();
    if (blocks.length < totalBallNum) {
        makeBall();
    }

    background(127);

    fill(0);
    noStroke();
    // platform.forEach(p => { p.show(); });

    fill(170);
    stroke(255);

    blocks.forEach(block => { block.show(); });
    // for (var i = blocks.length - 1; i >= 0; i--) {
    //     var b = blocks[i];
    //     b.show();
    //     if (b.isOffCanvas()) {
    //         matter.forget(b);
    //         blocks.splice(i, 1);
    //     }
    // }
    if (blocks.length >= 1) {
        let thisColor = getColor();
        let stableBlock = 0;
        for (let i = 0; i < min(lastColor.length, thisColor.length); i++) {
            if (JSON.stringify(lastColor[i]) === JSON.stringify(thisColor[i])) { stableBlock++; }
        }
        if (stableBlock > totalBallNum * 0.9) {
            console.log(`${frameCount} : Stable / ${blocks.length}`);
            downloadObjectAsJSON(thisColor, `v1_${seed}_${frameCount}`)
            noLoop();
        } else {
            console.log(`${frameCount} : ${stableBlock} / ${blocks.length}`);
        }
        lastColor = thisColor;
    }
}

function makeBall() {
    let diameter = random(10, 20);
    // let diameter = random() < 0.3 ? random(10, 15) : random(30, 60);
    let x = random(diameter / 2, width - diameter / 2);
    let y = -diameter / 2;
    blocks.push(matter.makeBall(x, y, diameter, { mass: 1e-6 }));
}

function getColor() {
    return blocks.map((block, i) => {
        let x = round(block.getPositionX(), 0);
        let y = round(block.getPositionY(), 0);
        return [x, y];
    });
}

function downloadObjectAsJSON(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var node = document.createElement('a');
    node.setAttribute("href", dataStr);
    node.setAttribute("download", `${exportName}.json`);
    document.body.appendChild(node); // required for firefox
    node.click();
    node.remove();
}