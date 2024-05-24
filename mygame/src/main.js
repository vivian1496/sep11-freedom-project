import kaboom from "kaboom";

// Initialize Kaboom with some basic settings
kaboom({
    background: [135, 206, 235],
});

// Load sprites
loadSprite("snoopy", "sprites/snoopy.png");
loadSprite("grass", "sprites/grass.png");
loadSprite("bowser", "sprites/bowser.png");
loadSprite("cloud", "sprites/cloud.png");
loadSprite("grass", "sprites/grass.png");

// Create clouds
const cloudWidth = 80; // Adjust as needed
const cloudHeight = 60; // Adjust as needed
const numClouds = Math.ceil(width() / cloudWidth); // Calculate the number of clouds needed to fill the screen

for (let i = 0; i < numClouds; i++) {
    add([
        sprite("cloud"),
        pos(i * cloudWidth, 30), // Position the clouds at the top of the screen
    ]);
}

// Create grass
const grassWidth = 63; // Adjust as needed
const grassHeight = 60; // Adjust as needed
const numGrass= Math.ceil(width() / grassWidth); // Calculate the number of grass needed to fill the screen

for (let i = 0; i < numGrass; i++) {
    add([
        sprite("grass"),
        pos(i * grassWidth, 720), // Position the grass at the top of the screen
    ]);
}

const SPEED = 120;
const VILLAINSPEED = 140;

// Create the main player (snoopy)
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
    scale(0.7),  // Scale down Bowser
    area(),
]);

// Update function to make Bowser chase snoopy
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
    destroy(main);  // Remove main character
    wait(2, () => {
        go("game");  // Restart the game or go to another scene
    });
});

