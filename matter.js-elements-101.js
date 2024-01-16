// module aliases
const { Engine, Render, Runner, Bodies, Composite } = Matter;

const elmsWrapper = document.getElementById('elms-wrapper');
const renderWrapper = document.getElementById('render-wrapper');
const areaW = elmsWrapper.offsetWidth;
const areaH = elmsWrapper.offsetHeight;
const movingShapes = [];

// create an engine
const engine = Engine.create();

init();

function init() {
    createBodies();
    addWallsAndGround();
    Matter.Events.on(engine, 'afterUpdate', updateElms)
    
    // create and run the renderer
    initRender();
    // create runner
    const runner = Runner.create();
    // run the engine
    Runner.run(runner, engine);
}

function initRender() {
    const render = Render.create({
        element: renderWrapper,
        engine: engine,
        options: {
            width: areaW,
            height: areaH,
        }
    })
    Render.run(render);
}

// create a body for each html element
function createBodies() {
    const elms = Array.from(elmsWrapper.children);
    const bodies = [];
    elms.forEach(elm => {
        const width = elm.offsetWidth;
        const height = elm.offsetHeight;
        const centerX = elm.offsetLeft + width / 2;
        const centerY = elm.offsetTop + height / 2;
        const isStatic = !elm.hasAttribute('data-matter');
        const body = Bodies.rectangle(centerX, centerY, width, height, { isStatic });
        bodies.push(body);

        if (!isStatic) {
            const shapeObj = {
                body,
                elm,
                width,
                height,
            }
            movingShapes.push(shapeObj);
        }
    });

    Composite.add(engine.world, bodies);
}

function addWallsAndGround() {
    const thickness = 40;
    const groundW = areaW;
    const height = thickness;
    const x = areaW / 2;
    const y = areaH + thickness /2;
    const ground = Bodies.rectangle(x, y, groundW, height, { isStatic: true });
    
    
    const wallW = thickness;
    const wallH = areaH;
    const leftWallX = -1 * thickness / 2;
    const rightWallX = areaW + thickness / 2;
    const wallY = areaH  / 2;
    const leftWall = Bodies.rectangle(leftWallX, wallY, wallW, wallH, { isStatic: true });
    const rightWall = Bodies.rectangle(rightWallX, wallY, wallW, wallH, { isStatic: true });

    Composite.add(engine.world, [ground, leftWall, rightWall]);
}

function updateElms() {
    movingShapes.forEach(shapeObj => {
        const body = shapeObj.body;
        const elm = shapeObj.elm;
        // shape.body's position is based on center of object
        const left = `${body.position.x - shapeObj.width / 2}px`;
        const top = `${body.position.y - shapeObj.height / 2}px`;
        const angle = body.angle + 'rad';

        elm.style.left = left;
        elm.style.top = top;
        elm.style.rotate = angle;
    })
}