// let img;
// function preload() {
//     img = loadImage('assets/VanGogh-StarryNight.jpg'); // 2728 x 2160
//     image.loadPixels();
// }

// function setup() {
//     var size = 500;
//     createCanvas(size, size);
//     background(0);
//     noStroke();
//     // imageMode(CORNER);
//     // image(img, 0, 0, size, size);
//     render(0, 0, size);
// };

// function draw() {
// };

// function render(x, y, size, level = 0) {
//     if (level > 5) {
//         circle(x + half, y + half, half);
//         return;
//     }
//     var half = size / 2;
//     var rv = floor(random() * 12);
//     push();
//     switch (rv) {
//         case 0:
//             circle(x + half, y + half, half);
//             break;
//         case 1:
//             if (random() < 0.5) {
//                 triangle(x, y, x + size, y, x, y + size);
//             } else {
//                 triangle(x, y, x, y + size, x + size, y);
//             }
//             break;
//         case 2:
//             rect(x, y, size, size);
//             break;
//         case 3:
//             if (random() < 0.5) {
//                 rect(x, y, half, size);
//             } else {
//                 rect(x, y, size, half);
//             }
//             break;
//         default:
//             render(x, y, half, level + 1);
//             render(x + half, y, half, level + 1);
//             render(x, y + half, half, level + 1);
//             render(x + half, y + half, half, level + 1);
//             break;
//     }
//     pop();
// }