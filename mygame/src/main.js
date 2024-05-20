import kaboom from "kaboom";

kaboom();

// background color
setBackground(135, 206, 235);

loadSprite("cloud", "sprites/cloud.png");
loadSprite("grass", "sprites/grass.png");
loadSprite("egg", "sprites/egg.png");
loadSprite("bowser2", "sprites/bowser2.png");


//CLOUDS

const numClouds = 14; // Number of clouds
const cloudSpacing = 104; // Spacing between each cloud

// Loop to create multiple clouds right next to eachother
for (let i = 0; i < numClouds; i++) {
    add([
        sprite("cloud"),
        pos(i * cloudSpacing, 20), // Y position
    ]);
}

// GRASS

const numGrass = 24; // Number of grass blocks
const GrassSpacing = 60; // Spacing between each grass block

// Loop to create multiple grass blocks
for (let i = 0; i < numGrass; i++) {
    add([
        sprite("grass"),
        pos(i * GrassSpacing, 720), // Y position
    ]);
}






// WORK



const speed = 200;

const player = add([
    sprite("egg"),
    pos(center()),
]);

onKeyDown("left", () => {
    player.move(-speed, 0);
});

onKeyDown("right", () => {
    player.move(speed, 0);
});

onKeyDown("up", () => {
    player.move(0, -speed);
});

onKeyDown("down", () => {
    player.move(0, speed);
});


//villian

const villain = add([
    sprite("bowser2"),
    scale(0.5),
    pos(500, 500) // Initial position of the villain
]);

// Function to move Bowser randomly
function moveVillainRandomly() {
    const directions = [
        vec2(20, 0),  // Right
        vec2(-20, 0), // Left
        vec2(0, 20),  // Down
        vec2(0, -20)  // Up
    ];

    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const moveDistance = 750; // Adjust this value as needed

    villain.move(randomDirection.scale(moveDistance));
}

// Update Bowser's position every second
loop(0.5, () => {
    moveVillainRandomly();
});

onClick(() => addKaboom(mousePos()));