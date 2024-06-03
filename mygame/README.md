# Folder structure

- `src` - source code for your kaboom project
- `www` - distribution folder, contains your index.html, built js bundle and static assets


## Development

```sh
$ npm run dev
```

will start a dev server at http://localhost:8000

## Distribution

```sh
$ npm run build
```

will build your js files into `www/main.js`

```sh
$ npm run bundle
```

will build your game and package into a .zip file, you can upload to your server or itch.io / newground etc.


CODE FOR KABOOM PlAYGROUND


// Start Kaboom with background color
kaboom({
    background: [0, 120, 180], // Adjusted for correct color values
});


// Display instruction text
add([
	pos(12, 602),
    text("Press arrow keys to move the watermelon, Q/A/S/Z to move the butterfly", {
		size:20,
		 width: 500,
    }),

])

// Load assets
loadSprite("btfly", "/sprites/btfly.png");
loadSprite("watermelon", "/sprites/watermelon.png");
loadSprite("cloud", "/sprites/cloud.png");
// Define player movement speed (pixels per second)
const SPEED = 60;
const MSPEED = 300

// Add player game object
const player = add([
    sprite("btfly"),
    pos(center()),
	area(),
	body(),
	"player"
]);

// Enemy movement controls
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
// Add enemy game object
const enemy = add([
    sprite("watermelon"),
    pos(x, y),
	area(),
	body(),
	"enemy"
]);

// Player movement controls
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

// every time bean collides with anything with tag "fruit", remove it
enemy.onCollide("player", (player) => {
    destroy(player)
})

// Calculate the number of clouds to be placed
const numClouds = 3;
const cloudWidth = width() / numClouds;

// Add clouds in a straight line at the top of the screen
for (let i = 0; i < numClouds; i++) {
    const cloudX = (i + 0.4) * cloudWidth; // Calculate x position for each cloud
    add([
        sprite("cloud"),
        pos(cloudX, 1), // Clouds are positioned at y = 0
        area(),
        body(),
    ]);
}