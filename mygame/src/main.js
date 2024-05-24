import kaboom from "kaboom";


kaboom({
    background: [135, 206, 235],
});

// sprites
loadSprite("snoopy", "sprites/snoopy.png");
loadSprite("grass", "sprites/grass.png");
loadSprite("bowser", "sprites/bowser.png");
loadSprite("cloud", "sprites/cloud.png");
loadSprite("grass", "sprites/grass.png");

// Create clouds
const cloudWidth = 80;
const cloudHeight = 60;
const numClouds = Math.ceil(width() / cloudWidth);

for (let i = 0; i < numClouds; i++) {
    add([
        sprite("cloud"),
        pos(i * cloudWidth, 30), // Positions the clouds at the top of the screen
    ]);
}

// Create grass
const grassWidth = 63;
const grassHeight = 60;
const numGrass= Math.ceil(width() / grassWidth);

for (let i = 0; i < numGrass; i++) {
    add([
        sprite("grass"),
        pos(i * grassWidth, 720), // Positions the grass at the top of the screen
    ]);
}

const SPEED = 120;
const VILLAINSPEED = 140;

// Creates snoopy
const main = add([
    sprite("snoopy"),
    pos(140, 390),
    scale(3),
    anchor("center"),
    area(),
]);

// snoopy movement
onKeyDown("left", () => {
    main.move(-SPEED, 0);
});
onKeyDown("right", () => {
    main.move(SPEED, 0);
});
onKeyDown("up", () => {
    main.move(0, -SPEED);
});
onKeyDown("down", () => {
    main.move(0, SPEED);
});

// Create Bowser
const bowser = add([
    sprite("bowser"),
    pos(400, 300),
    scale(0.7),
    area(),
]);




// ---------

    // makes Bowser chase snoopy
    bowser.action(() => {
        const direction = main.pos.sub(bowser.pos).unit(); // Calculate the unit vector towards snoopy
        bowser.move(direction.scale(VILLAINSPEED * dt()));  // Move Bowser towards snoopy, scaled by delta time
    });

    // Collision detection
    main.collides("bowser", () => {
        add([
            text("Caught by Bowser! Game Over.", { size: 24, color: rgb(255, 0, 0) }),
            pos(center()),
            origin("center"),
        ]);
        destroy(main);  // Removes snoopy
        wait(2, () => {
            go("game");  // Restarts the game
        });
    });

