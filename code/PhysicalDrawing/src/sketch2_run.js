var seed = 0;
var blocks = [];
var platform;
var lastColor = [];
var colors = [[505, 593], [402, 579], [313, 578], [447, 574], [29, 536], [216, 577], [360, 576], [132, 578], [592, 592], [23, 579], [257, 584], [411, 534], [571, 582], [19, 459], [70, 573], [288, 592], [42, 563], [279, 578], [277, 591], [335, 549], [109, 591], [172, 577], [97, 591], [531, 16512], [367, 537], [84, 525], [530, 573], [294, 546], [102, 581], [377, 504], [250, 546], [43, 492], [339, 520], [490, 551], [486, 583], [572, 538], [592, 579], [199, 537], [274, 505], [87, 482], [61, 448], [458, 534], [230, 506], [113, 561], [525, 527], [105, 569], [345, 485], [100, 557], [129, 541], [252, 470], [321, 535], [449, 499], [162, 545], [292, 523], [489, 512], [152, 526], [317, 523], [264, 428], [411, 491], [170, 529], [566, 485], [486, 472], [438, 456], [117, 519], [302, 461], [175, 503], [304, 522], [312, 501], [312, 531], [527, 459], [131, 497], [548, 513], [228, 441], [384, 459], [112, 447], [207, 473], [23, 424], [162, 458], [302, 419], [470, 446], [110, 479], [66, 401], [591, 464], [350, 461], [521, 492], [464, 434], [236, 420], [280, 385], [496, 427], [49, 355], [112, 402], [577, 440], [196, 415], [7, 406], [148, 416], [233, 385], [101, 357], [411, 426], [204, 445], [620, -23], [571, 394], [22, 385], [379, 415], [342, 440], [320, 431], [409, 391], [448, 410], [71, 370], [72, 315], [339, 397], [522, 387], [539, 427], [193, 447], [476, 405], [479, 378], [168, 402], [241, 411], [146, 341], [307, 400], [-56, 4130], [142, 379], [344, 351], [308, 355], [24, 323], [440, 370], [189, 362], [324, 367], [383, 394], [176, 310], [162, 393], [173, 393], [378, 368], [221, 323], [118, 311], [223, 359], [269, 336], [404, 366], [171, 279], [412, 335], [320, 313], [516, 340], [50, 279], [144, 279], [211, 278], [378, 335], [345, 264], [464, 336], [289, 299], [286, 308], [251, 293], [371, 307], [7, 304], [369, 344], [95, 269], [175, 248], [491, 323], [276, 301], [291, 268], [569, 339], [18, 287], [572, 286], [36, 298], [162, 221], [214, 237], [442, 288], [247, 254], [487, 302], [128, 261], [190, 198], [22, 253], [400, 304], [395, 267], [322, 218], [569, 231], [28, 172], [128, 226], [476, 285], [508, 311], [60, 232], [172, 153], [275, 224], [494, 258], [72, 189], [375, 218], [144, 182], [21, 217], [237, 230], [431, 234], [528, 297], [538, 263], [91, 235], [9, 198], [462, 259], [90, 222], [109, 187], [203, 127], [452, 254], [240, 199], [592, 314], [535, 240], [78, 139], [58, 166], [196, 164], [322, 166], [519, 211], [288, 190], [222, 162], [210, 83], [95, 211], [265, 165], [130, 142], [121, 170], [471, 215], [403, 238], [67, 85], [23, 128], [372, 168], [109, 166], [161, 103], [216, 34], [421, 184], [352, 124], [290, 169], [404, 133], [21, 90], [346, 197], [465, 180], [188, -50], [290, 158], [497, 154], [550, 170], [84, 54], [113, 102], [168, 50], [385, 95], [577, 134], [30, 45], [536, 125], [246, 127], [480, 107], [455, 150], [401, 53], [314, 84], [441, 81], [292, 135], [442, 119], [112, 59], [569, 87], [479, 63], [-17, -18], [357, 61], [519, 88], [261, 80], [371, 7], [573, 0], [239, -32], [18, 4], [320, 28], [234, 63], [514, 52], [222, 6], [287, 62], [275, 51], [266, 18], [488, 18], [180, 0], [132, 27], [0, -63], [71, 52], [133, -22], [303, -22], [495, 81], [581, 44], [48, -29], [431, 55], [53, 21], [541, 27], [403, 22], [38, 13], [88, 14]];

var totalBallNum = 280;

var img;
function preload() {
    img = loadImage('./assets/VanGogh-StarryNight.jpg');
}

function setup() {
    randomSeed(seed);
    createCanvas(600, 600);
    img.resize(width, height);
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

    stroke(255);

    blocks.forEach((block, i) => {
        var c = img.get(colors[i][0], colors[i][1]);
        fill(c);
        block.show();
    });
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
            // downloadObjectAsJSON(thisColor, `v1_${seed}_${frameCount}`)
            noLoop();
        } else {
            console.log(`${frameCount} : ${stableBlock} / ${blocks.length}`);
        }
        lastColor = thisColor;
    }
}

function makeBall() {
    let diameter = random() < 0.3 ? random(10, 15) : random(30, 60);
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