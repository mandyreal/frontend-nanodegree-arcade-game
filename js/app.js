// globale variables used by game environment
// this variable controls how fast the bugs move, 
// can be set from 200 onwards with 200 as normal speed
var bugSpeed = 200;

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

    // Collission detection logic. Reset player to starting position
    // when any of the bugs collides with the player
    if ((this.x - player.x <  50 && this.y - player.y < 50) && 
        (this.x - player.x > -50 && this.y - player.y > -50)) {
        player.reset();
    }

    // Check if bug location has reached the right end, 
    // then reset bug's location to random starting point
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
    this.sprite = 'images/char-boy.png';
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
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
            // this means player hits water, reset to initial position
            else {
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

var player = new Player(205,308);

// assign randon starting x coordinate for each bug to add some randomness
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

