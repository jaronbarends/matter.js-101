// module aliases
const { Engine, Render, Runner, Bodies, Composite } = Matter;

// create an engine
const engine = Engine.create();

// create two boxes and a ground
// params: (center-x, center-y, width, height)
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add a sprite
const bodyOptions = {
    render: {
        sprite: {
            texture: './kitten-150.jpeg',
        }
    }
}
const sprite = Bodies.rectangle(300, 0, 150, 150, bodyOptions);

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground, sprite]);

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        background: 'transparent',
    },
});
// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);