// Matter.use('matter-wrap');

var canvasWidth = 800;
var canvasHeight = 600;

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(), world = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: { width: canvasWidth, height: canvasHeight, showAngleIndicator: false }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
Composite.add(world, [
    Bodies.rectangle(canvasWidth/2, canvasHeight, canvasWidth, 1, { isStatic: true, render: { fillStyle: '#060a19' } }),
    Bodies.rectangle(0, canvasHeight/2, 1, canvasHeight, { isStatic: true, render: { fillStyle: '#060a19' } }),
    Bodies.rectangle(canvasWidth, canvasHeight/2, 1, canvasHeight, { isStatic: true, render: { fillStyle: '#060a19' } })
]);

var stack = Composites.stack(100, 0, 10, 8, 10, 10, function (x, y) {
    return Bodies.circle(x, y, Common.random(15, 30), { restitution: 0.6, friction: 0.1 });
});

Composite.add(world, [
    stack
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});

// // wrapping using matter-wrap plugin
// var allBodies = Composite.allBodies(world);

// for (var i = 0; i < allBodies.length; i += 1) {
//     allBodies[i].plugin.wrap = {
//         min: { x: render.bounds.min.x - 100, y: render.bounds.min.y },
//         max: { x: render.bounds.max.x + 100, y: render.bounds.max.y }
//     };
// }

console.log(Composite.allBodies(engine.world).map(o=>o.position));