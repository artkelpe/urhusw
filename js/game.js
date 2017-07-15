/**
 * Created by kelpe on 15/06/17.
 */


//    http://scrumblr.ca/urhusw

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 16);
        };
})();


// states of striking:
//  0 - nothing
//  1 - key is pressed, now it will be shot
//  2 - key is still pressed, but the shot is already done

// this shit is made because JS cant handle long press of multiple buttons
window.addEventListener('keydown', function(e) {
    switch(e.keyCode) {
        case 37: shipL = 1; break; //Left key
        case 38: shipU = 1; break; //Up key
        case 39: shipR = 1; break; //Right key
        case 40: shipD = 1; break; //Down key
        case 32: {                 //Space key
            if (shipShooting === 0)
                shipShooting = 1;
        }
    }
}, false);
window.addEventListener('keyup', function(e) {
    switch(e.keyCode) {
        case 37: shipL = 0; break; //Left key
        case 38: shipU = 0; break; //Up key
        case 39: shipR = 0; break; //Right key
        case 40: shipD = 0; break; //Down key
        case 32: shipShooting = 0; break; //Space key
    }
}, false);

// Constants
var CANVASWIDTH = 920,
    CANVASHEIGHT = 520,
    STARSIZE = 2;

// Global vars
var backCanvas, backContext, canvas, context,
    stars = [], movingStars,
    healthMeterImg,
    ship, shipShooting = 0,
    shipU, shipL, shipD, shipR, // bools indicating if the ship is moving in concrete direction
    shipEnemyPatternCounter = 20, // how much frames for each element in enemy's pattern
    shipEnemyArr = [],
    boltsShipArr = [], // array of bolts from ship that are on the screen right now
    boltsEnemyArr = [] // array of bolts from enemies that are on the screen right now
;



//--------------------------------    Interface definitions    ---------------------------------------------------------
class IShip {
    countXPosition() {
        this.x = (this.direction === 0) ? this.x + this.speed : this.x - this.speed;
    }
    countWidthHeight() {
        this.width = this.img.width;
        this.height = this.img.height;
    }
}

class IBolt {
    constructor (direction) {
        this.size = 30;
        this.direction = direction;
    }
    countPosition() {
        this.x = (this.direction === 0) ? this.x + this.speed : this.x - this.speed;
    }
}

//--------------------------------     Class definitions      ----------------------------------------------------------

class Star {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
    }
}

class Ship extends IShip{
    constructor(imgPath, imgProtectedPath, imgHurtPath) {
        super();
        this.img = new Image(); this.img.src = imgPath;
        this.imgProtected = new Image(); this.imgProtected.src = imgProtectedPath;
        this.imgHurt = new Image(); this.imgHurt.src = imgHurtPath;
        this.x = 0;
        this.y = 0;
        this.health = 100;
        this.speed = 5;
        this.isProtected = 0;
        this.timeForProtected = 0;
        this.isHurt = 0;
        this.score = 100;
    }
    countPosition() {
        // diagonal directions
        if (shipU === 1 && shipL === 1) {
            if (ship.y > 0) ship.y = ship.y - ship.speed;
            if (ship.x > 0) ship.x = ship.x - ship.speed;
        }
        else if (shipD === 1 && shipL === 1) {
            if (ship.y < CANVASHEIGHT - 80) ship.y = ship.y + ship.speed;
            if (ship.x > 0) ship.x = ship.x - ship.speed;
        }
        else if (shipD === 1 && shipR === 1) {
            if (ship.y < CANVASHEIGHT - 80) ship.y = ship.y + ship.speed;
            if (ship.x < CANVASWIDTH - 100) ship.x = ship.x + ship.speed;
        }
        else if (shipU === 1 && shipR === 1) {
            if (ship.y > 0) ship.y = ship.y - ship.speed;
            if (ship.x < CANVASWIDTH - 100) ship.x = ship.x + ship.speed;
        }
        // straight directions
        else if (shipL === 1) {
            if (ship.x > 0) ship.x = ship.x - ship.speed;
        }
        else if (shipR === 1) {
            if (ship.x < CANVASWIDTH - 100) ship.x = ship.x + ship.speed;
        }
        else if (shipU === 1) {
            if (ship.y > 0) ship.y = ship.y - ship.speed;
        }
        else if (shipD === 1) {
            if (ship.y < CANVASHEIGHT - 80) ship.y = ship.y + ship.speed;
        }
    }
    updateShip() {
        this.countPosition();
        if (ship.isProtected)
            ship.timeForProtected--;
        if (ship.timeForProtected === 0)
            ship.isProtected = 0;
    }
    countWidthHeight() { super.countWidthHeight() }

}

class ShipEnemy extends IShip{
    constructor(imgSrc, y, health, speed, shootingSpeed, pattern="-") {
        super();
        this.img = new Image();this.img.src = imgSrc;
        this.x = CANVASWIDTH;
        if (y === 0)
            this.y = Math.floor((Math.random() * CANVASHEIGHT-70) + 1);
        else
            this.y = y;
        this.direction = 1;
        this.health = health;
        this.speed = speed;
        this.value = 10 * health;
        this.shootingSpeed = shootingSpeed;
        this.counterForShooting = 0;
        this.isShooting = 0;
        this.pattern = pattern;
        this.actualElemOfPattern = 0;
        this.counterForPattern = 0;
    }
    countPosition() {
        this.counterForPattern += 1;
        if (this.counterForPattern === shipEnemyPatternCounter){
            this.counterForPattern = 0;
            this.actualElemOfPattern += 1;
            if (this.actualElemOfPattern === this.pattern.length)
                this.actualElemOfPattern = 0;
        }
        switch (this.pattern[this.actualElemOfPattern]){
            case '^':{
                if (this.y - 5 > 0)
                    this.y = this.y - 5;
                break;
            }
            case '&':{
                if (this.y - 5 > 0)
                    this.y = this.y - 5;
                super.countXPosition();
                break;
            }
            case '-':{
                super.countXPosition();
                break;
            }
            case '*':{
                if (this.y + 5 < CANVASHEIGHT - this.height)
                    this.y = this.y + 5;
                super.countXPosition();
                break;
            }
            case '_':{
                if (this.y + 5 < CANVASHEIGHT - this.height)
                    this.y = this.y + 5;
                break;
            }
            case '.':{
                break;
            }
            default:{
                super.countXPosition();
            }
        }
    }
    countWidthHeight() { super.countWidthHeight(); }
}

class BoltShip extends IBolt {
    constructor() {
        super(0);
        this.img = new Image();
        this.img.src = "res/laser11.png";
        this.y = ship.y + 20;
        this.x = ship.x + 93;
        this.speed = 10;
        this.direction = 0;
    }
    countPosition() { super.countPosition(); }
}

class BoltEnemy extends IBolt {
    constructor(x, y, speed, direction) {
        super(1);
        this.img = new Image();
        this.img.src = "res/laser21.png";
        this.x = x;
        this.y = y;
        this.speed = speed;
        //this.direction = direction;
    }
    countPosition() { super.countPosition(); }
}

//-------------------------------    updates     ----------------------------------------------------------------------
function updateBackground() {
    backContext.fillStyle = "#223";
    backContext.fillRect(0, 0, CANVASWIDTH, CANVASHEIGHT+30);
    for (let i = 0; i < stars.length; i++) {
        backContext.fillStyle = stars[i].colour;
        stars[i].x = stars[i].x - 1;
        if (stars[i].x < -STARSIZE) {
            stars[i].x = CANVASWIDTH;
            stars[i].y = Math.floor(Math.random() * (CANVASHEIGHT));
        }
        backContext.fillRect(stars[i].x, stars[i].y, STARSIZE, STARSIZE);
    }

    backContext.fillStyle = "#239c28";
    backContext.fillRect(35, 520, (590 * ship.health / 100 < 0)? 0 : 590 * ship.health / 100, 20);

    backContext.drawImage(healthMeterImg, 20, CANVASHEIGHT-10);

    backContext.font="15px fffforwa";
    backContext.fillText("SCORE:   " + ship.score, 710, CANVASHEIGHT+20);
}

function update() {
    context.fillStyle="rgba(0, 0, 200, 0)";
    context.fill();

    // ---------------  count positions       ---------------------------
    // ship
    ship.countPosition();

    if (shipShooting === 1 ){
        boltsShipArr.push(new BoltShip(IBolt));
        ship.score -= 1;
        shipShooting = 2;
    }

    // enemy ships
    for (let i = 0; i < shipEnemyArr.length; i++) {
        shipEnemyArr[i].countPosition();
        shipEnemyArr[i].counterForShooting += 1;
        if (shipEnemyArr[i].counterForShooting === shipEnemyArr[i].shootingSpeed)
            shipEnemyArr[i].isShooting = 1;
    }

    // ship bolts
    for (let i = 0; i < boltsShipArr.length; i++) {
        boltsShipArr[i].countPosition();

    }

    // enemy ship bolts
    for (let i = 0; i < shipEnemyArr.length; i++) {
        if (shipEnemyArr[i].isShooting === 1) {
            boltsEnemyArr.push(new BoltEnemy(shipEnemyArr[i].x-18, shipEnemyArr[i].y+10, 5, 1));
            shipEnemyArr[i].counterForShooting = 0;
            shipEnemyArr[i].isShooting = 0;
        }
    }


    for (let i = 0; i < boltsEnemyArr.length; i++) {
        boltsEnemyArr[i].countPosition();
    }

    //-----------------    check collisions    -------------------------------
    //enemy bolts -> ship
    if (!ship.isProtected) {
        for (let i = 0; i < boltsEnemyArr.length; i++) {
            if (ship.x < boltsEnemyArr[i].x + boltsEnemyArr[i].size &&
                ship.x + ship.width > boltsEnemyArr[i].x &&
                ship.y < boltsEnemyArr[i].y + boltsEnemyArr[i].size &&
                ship.y + ship.height > boltsEnemyArr[i].y)
            {
                console.log("SHOT");
                boltsEnemyArr.splice(i, 1);
                ship.health -= 10;
                ship.isHurt = 1;
                setTimeout(function () {ship.isHurt = 0 ;}, 20);

            }
        }
    }

    //ship bolts -> enemies
    for (let i = 0; i < shipEnemyArr.length; i++) {
        for (let j = 0; j < boltsShipArr.length; j++) {
            if (shipEnemyArr[i].x < boltsShipArr[j].x + boltsShipArr[j].size &&
                shipEnemyArr[i].x + shipEnemyArr[i].width > boltsShipArr[j].x &&
                shipEnemyArr[i].y < boltsShipArr[j].y + boltsShipArr[j].size &&
                shipEnemyArr[i].y + shipEnemyArr[i].height > boltsShipArr[j].y)
            {
                boltsShipArr.splice(i, 1);
                shipEnemyArr[i].health -= 10;
            }
        }
    }
    // remove enemies with no health
    for (let i = 0; i < shipEnemyArr.length; i++) {
        if (shipEnemyArr[i].health < 1) {
            ship.score += shipEnemyArr[i].value;
            shipEnemyArr.splice(i, 1);

        }
    }


    //-----------------    draw everything    --------------------------------
    //ship
    if (ship.isProtected === 1) {
        context.drawImage(ship.imgProtected, ship.x, ship.y);
    }
    else if (ship.isHurt === 1) {
        context.drawImage(ship.imgHurt, ship.x, ship.y);
        console.log("hurt");
    }
    else {
        context.drawImage(ship.img, ship.x, ship.y);
    }

    //context.drawImage( (ship.isProtected === 0) ? ship.img : ship.imgProtected, ship.x, ship.y);

    //enemy ships
    for (let i = 0; i < shipEnemyArr.length; i++) {
        if (shipEnemyArr[i].x < -100)
            shipEnemyArr.splice(i, 1);
        else {
            context.drawImage(shipEnemyArr[i].img, shipEnemyArr[i].x, shipEnemyArr[i].y);
        }
    }

    //bolts
    for (let i = 0; i < boltsShipArr.length; i++) {
        if (boltsShipArr[i].x > CANVASWIDTH)
            boltsShipArr.splice(i, 1);
        else
            context.drawImage(boltsShipArr[i].img, boltsShipArr[i].x, boltsShipArr[i].y);
    }

    //enemy bolts
    for (let i = 0; i < boltsEnemyArr.length; i++) {
        if (boltsEnemyArr[i].x < -15)
            boltsEnemyArr.splice(i, 1);
        else
            context.drawImage(boltsEnemyArr[i].img, boltsEnemyArr[i].x, boltsEnemyArr[i].y);
    }


    requestAnimFrame(function() {
        update();
    });
}

function init() {
    // setting canvases
    backCanvas = document.getElementById("backCanv");
    backCanvas.width = CANVASWIDTH;
    backCanvas.height = CANVASHEIGHT+40;
    backContext = backCanvas.getContext('2d');

    canvas = document.getElementById("frontCanv");
    canvas.width = CANVASWIDTH;
    canvas.height = CANVASHEIGHT+40;
    context = backCanvas.getContext('2d');

    // create stars on background
    for (let i = 0; i < 40; i++)
        stars.push(new Star(Math.floor(Math.random() * (CANVASWIDTH)), Math.floor(Math.random() * (CANVASHEIGHT)), Please.make_color({
            hue: 12,
            saturation: .20,
            value: .7
        })));
    // make stars move
    movingStars = setInterval(updateBackground, 25);

    //add healthBar
    healthMeterImg = new Image();
    healthMeterImg.src = 'res/healthMeter.png';

    // create ship
    ship = new Ship("res/ship.png", "res/shipProtected.png", "res/shipHurt.png");
    ship.countWidthHeight();


    // function                                  ShipEnemy(imgSrc, y, health, speed, shootingSpeed)
    //setTimeout(function() {shipEnemyArr.push(new ShipEnemy("res/enemy11.png", 150, 10, 2, 50))}, 2000);
    //setTimeout(function() {shipEnemyArr.push(new ShipEnemy("res/enemy12.png", 250, 10, 1.1, 80))}, 3000);
    loadLevel(levels['1']);
    update();
}