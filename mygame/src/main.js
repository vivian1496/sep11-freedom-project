import kaboom from "kaboom"


kaboom({
    background: [0, 120, 180], // green
});



//  instruction text
add([
	pos(12, 602),
    text("Press arrow keys to move the bowser, Q/A/S/Z to move the snoopy", {
		size:20,
		 width: 500,
    }),

])

// Load assets
loadSprite("snoopy", "/sprites/snoopy.png");
loadSprite("bowser", "/sprites/bowser.png");
loadSprite("cloud", "/sprites/cloud.png");

//  players movement speed
const SPEED = 60;
const MSPEED = 350

// snoopy
const player = add([
    sprite("snoopy"),
    pos(center()),
    scale(3),
	area(),
	body(),
	"player"

]);

// player movement controls
onKeyPress("q", () => {
    player.move(0, -MSPEED); // Move up
});

onKeyPress("a", () => {
    player.move(-MSPEED, 0); // Move left
});

onKeyPress("s", () => {
    player.move(MSPEED, 0); // Move right
});

onKeyPress("z", () => {
    player.move(0, MSPEED); // Move down
});




const x = rand(0, width())
	const y = rand(0, height())

// bowser
const enemy = add([
    sprite("bowser"),
    pos(x, y),
	area(),
	body(),
	"enemy"
]);

// enemy movement controls
onKeyDown("left", () => {
    enemy.move(-SPEED, 0);
});

onKeyDown("right", () => {
    enemy.move(SPEED, 0);
});

onKeyDown("up", () => {
    enemy.move(0, -SPEED);
});

onKeyDown("down", () => {
    enemy.move(0, SPEED);
});

// every time bowser collides with anything with tag "player", it removes it
enemy.onCollide("player", (player) => {
    destroy(player)
})


// Calculates the number of clouds to be placed
const numClouds = 3;
const cloudWidth = width() / numClouds;

// Adds clouds in a straight line at the top of the screen
for (let i = 0; i < numClouds; i++) {
    const cloudX = (i + 0.4) * cloudWidth; // Calculates x position for each cloud
    add([
        sprite("cloud"),
        pos(cloudX, 1), // Clouds are positioned at y = 1
        area(),
        body(),
    ]);
}
