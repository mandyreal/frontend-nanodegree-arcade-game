// globale variables used by game environment

var bugSpeed = 100;  // this variable controls how fast the bugs move, lowest speed set to 100 as default
var gameLevel = 1;   // starting level for the game, moves to next one everytime player reaches the water


var GameEnv = function() {
    this.sprite = 'images/Heart.png';
}

// Draw game environment elements on the screenm e.g. game level no.
GameEnv.prototype.render = function() {
    // Draw other game specific details like game level
    ctx.font="25px Verdana";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.textAlign = "left";
    ctx.fillText("Level " + gameLevel,203,575,ctx.canvas.height); 
}

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // Generate random speeds for each bug for every page refresh
    this.x += Math.round((Math.random()* 100) + bugSpeed) * dt;

    // Check for collision between bugs and player 
    // Reset player to starting position when any of the bugs collides with the player
    if ((this.x - player.x <  50 && this.y - player.y < 50) && 
        (this.x - player.x > -50 && this.y - player.y > -50)) {
        player.reset();
    }

    // Check if bug location has reached the right end, then reset bug's location to random starting point
    if (this.x > 400) {
       this.x = -(Math.round(Math.random()*500));
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.playerImages = ['images/char-boy.png','images/char-cat-girl.png',
                         'images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png'];
    // random selection of player for every new game
    this.playerImg = this.playerImages[Math.floor(Math.random() * 5)];
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x * dt;
    this.y * dt;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerImg), this.x, this.y);
}

// Reset player position to starting point 
Player.prototype.reset = function() {
    // Default starting point for player, 
    // prefer to start always in middle of screen
    this.x = 205;
    this.y = 308;
}

Player.prototype.handleInput = function(keynum) {
    switch(keynum)  {
        case 'up':
            if(this.y > 38) {
                this.y -= 90;
            }
            else {
                // this means player hits water, reset to initial position
                // increase bugSpeed everytime player is able to reach the water
                // this way game difficulty is increased as well
                bugSpeed  = bugSpeed + 55;
                gameLevel = gameLevel + 1;
                player.reset();
            }
            break;
        case 'down':
            if(this.y < 375){
                this.y+=90;
            }
            break;
        case 'left':
            if(this.x > 15){
                this.x-=100;
            }
            break;
        case 'right':
            if(this.x < 400){
                this.x+=100;
            }
            break;
        default:
            return;
    }
};  


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var gameenv = new GameEnv();

var player = new Player(205,308);

// assign random starting x coordinate for each bug
var enemy1 = new Enemy(Math.round(Math.random()*105),55);
var enemy2 = new Enemy(Math.round(Math.random()*105),145);
var enemy3 = new Enemy(Math.round(Math.random()*105),225);

allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


