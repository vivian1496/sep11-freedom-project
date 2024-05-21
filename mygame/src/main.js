import kaboom from "kaboom";

kaboom();

// background color
setBackground(135, 206, 235);

// Load sprites
loadSprite("cloud", "sprites/cloud.png");
loadSprite("grass", "sprites/grass.png");
loadSprite("egg", "sprites/egg.png");
loadSprite("bowser2", "sprites/bowser2.png");

function setupGame() {
    // Clear existing game objects if any
    destroyAll("cloud");
    destroyAll("grass");
    destroyAll("egg");
    destroyAll("bowser2");
    destroyAll("text");

    //  clouds
    for (let i = 0; i < 14; i++) {
        add([
            sprite("cloud"),
            pos(i * 104, 20),
        ]);
    }

    //  grass
    for (let i = 0; i < 24; i++) {
        add([
            sprite("grass"),
            pos(i * 60, 720),
        ]);
    }

    // Create egg
    const player = add([
        sprite("egg"),
        pos(center()),
        area(),
    ]);

    // egg movement
    const playerSpeed = 130;
    onKeyDown("left", () => { player.move(-playerSpeed, 0); });
    onKeyDown("right", () => { player.move(playerSpeed, 0); });
    onKeyDown("up", () => { player.move(0, -playerSpeed); });
    onKeyDown("down", () => { player.move(0, playerSpeed); });

    //  villain aka boswer
    const villain = add([
        sprite("bowser2"),
        scale(0.5),
        pos(500, 500),
        area(),
        "bowser2",  // Adding the tag for collision detection
    ]);

    // chase logic
    const villainSpeed = 200; // Adjusted speed for smoother chasing
    action(() => {

        //EXPLAINATION FOR LINES 72-73
         //This calculates the vector from the villain's position to the player's position.
        // player.pos = the position of the player (egg),
        // villain.pos = the position of the villain (Bowser).
        // Once we have the unit vector pointing from the villain to the player, we scale it by the villain's speed (villainSpeed). This determines how far the villain will move in each frame towards the player.
        // villian.move moves the villain towards the player based on the calculated direction and speed.

        const direction = player.pos.sub(villain.pos).unit();
        villain.move(direction.scale(villainSpeed));
    });

   // Collision detection
   player.collides("bowser2", () => {

    const loseText = add([

        text("You Lose!", 100),

        pos(width() / 2, height() / 2), // Center the text on the screen

        origin("center"),

        color(255, 0, 0),

        layer("ui"), // Ensure the text appears above other entities
    ]);
    destroy(player); // Destroy player to prevent further movement

    destroy(villain); // Destroy villain to stop chasing

    wait(2, () => { // After 2 seconds, remove the lose text and restart the game

        destroy(loseText);
        setupGame(); // Restart the game
    });
});
}

// Initialize game
setupGame();

//ignore
onClick(() => addKaboom(mousePos()));
