/**
 * Created by kelpe on 15/06/17.
 */

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
var CANVASWIDTH = 920;
var CANVASHEIGHT = 520;

// Global vars
var backCanvas, backContext, canvas, context,
    stars = [], starSize = 2, movingStars,
    ship, shipShooting = 0,
    shipU, shipL, shipD, shipR, // bools indicating if the ship is moving in concrete direction
    shipEnemyArr = [],
    boltsShipArr = [], // array of bolts from ship that are on the screen right now
    boltsEnemyArr = [] // array of bolts from enemies that are on the screen right now
;



//---------------------------------------------------------------------------------------------------------------------
// Interface definitions
function IShip() {}
IShip.prototype.countPosition = function() {
    this.x = (this.direction === 0) ? this.x + this.speed : this.x - this.speed;
};

function IBolt() {}
IBolt.prototype.countPosition = function() {
    this.x = (this.direction === 0) ? this.x + this.speed : this.x - this.speed;
};


//---------------------------------------------------------------------------------------------------------------------
// Class definitions
function Star(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = colour;
}

function Ship(img, imgProtected) {
    this.img = img;
    this.imgProtected = imgProtected;
    this.x = 0;
    this.y = 0;
    this.health = 100;
    this.speed = 5;
    this.isProtected = 0;
    this.timeForProtected = 0;

    this.countPosition = function () {
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
    };
    this.updateShip = function () {
        this.countPosition();
        if (ship.isProtected)
            ship.timeForProtected--;
        if (ship.timeForProtected === 0)
            ship.isProtected = 0;
    }
}

function ShipEnemy(img, x, y, direction, health, speed, shootingSpeed) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.health = health;
    this.speed = speed;
    this.shootingSpeed = 40;

    // this.countPosition = function () {
    //     // diagonal directions
    //     if (shipU === 1 && shipL === 1) {
    //         if (ship.y > 0) ship.y = ship.y - ship.speed;
    //         if (ship.x > 0) ship.x = ship.x - ship.speed;
    //     }
    //     else if (shipD === 1 && shipL === 1) {
    //         if (ship.y < CANVASHEIGHT - 80) ship.y = ship.y + ship.speed;
    //         if (ship.x > 0) ship.x = ship.x - ship.speed;
    //     }
    //     else if (shipD === 1 && shipR === 1) {
    //         if (ship.y < CANVASHEIGHT - 80) ship.y = ship.y + ship.speed;
    //         if (ship.x < CANVASWIDTH - 100) ship.x = ship.x + ship.speed;
    //     }
    //     else if (shipU === 1 && shipR === 1) {
    //         if (ship.y > 0) ship.y = ship.y - ship.speed;
    //         if (ship.x < CANVASWIDTH - 100) ship.x = ship.x + ship.speed;
    //     }
    //     // straight directions
    //     else if (shipL === 1) {
    //         if (ship.x > 0) ship.x = ship.x - ship.speed;
    //     }
    //     else if (shipR === 1) {
    //         if (ship.x < CANVASWIDTH - 100) ship.x = ship.x + ship.speed;
    //     }
    //     else if (shipU === 1) {
    //         if (ship.y > 0) ship.y = ship.y - ship.speed;
    //     }
    //     else if (shipD === 1) {
    //         if (ship.y < CANVASHEIGHT - 80) ship.y = ship.y + ship.speed;
    //     }
    // };
    this.countPosition = IShip.prototype.countPosition;
}



function BoltShip() {
    /*IBolt.call(this); //ЭТО НАСЛЕДОВАНИе
    IBolt.apply(this);
    BoltShip.__proto__ = IBolt;*/
    this.img = new Image();
    this.img.src = "res/laser1.png";
    this.y = ship.y + 20;
    this.x = ship.x + 93;
    this.speed = 10;
    this.direction = 0;

    this.countPosition = IBolt.prototype.countPosition;

}
function BoltEnemy() {
    IBolt.call(this); //ЭТО НАСЛЕДОВАНИе
}



function updateStars() {
    backContext.fillStyle = "#223";
    backContext.fillRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
    for (var i = 0; i < stars.length; i++) {
        backContext.fillStyle = stars[i].colour;
        stars[i].x = stars[i].x - 1;
        if (stars[i].x < -3) {
            stars[i].x = CANVASWIDTH;
            stars[i].y = Math.floor(Math.random() * (CANVASHEIGHT));
        }
        backContext.fillRect(stars[i].x, stars[i].y, starSize, starSize);
    }
}

function update() {
    context.fillStyle="rgba(0, 0, 200, 0)";
    context.fill();

    // ship
    ship.updateShip();

    if (shipShooting === 1 ){
        boltsShipArr.push(new BoltShip(IBolt));
        shipShooting = 2;
    }

    // enemy ships
    for (var i = 0; i < shipEnemyArr.length; i++) {
        shipEnemyArr[i].countPosition();
    }

    // bolts
    for (var i = 0; i < boltsShipArr.length; i++) {
        boltsShipArr[i].countPosition();
    }

    //-----------------    draw everything    -------------------------------------------------
    //ship
    context.drawImage( (ship.isProtected === 0) ? ship.img : ship.imgProtected, ship.x, ship.y);

    //enemy ships
    for (var i = 0; i < shipEnemyArr.length; i++) {
        if (shipEnemyArr[i].x < -100)
            shipEnemyArr.splice(i, 1);
        else
            context.drawImage(shipEnemyArr[i].img, shipEnemyArr[i].x, shipEnemyArr[i].y);
    }

    //bolts
    for (var i = 0; i < boltsShipArr.length; i++) {
        if (boltsShipArr[i].x > CANVASWIDTH)
            boltsShipArr.splice(i, 1);
        else
            context.drawImage(boltsShipArr[i].img, boltsShipArr[i].x, boltsShipArr[i].y);
    }


    requestAnimFrame(function() {
        update();
    });
}

function init() {
    // setting canvases
    backCanvas = document.getElementById("backCanv");
    backCanvas.width = CANVASWIDTH;
    backCanvas.height = CANVASHEIGHT;
    backContext = backCanvas.getContext('2d');

    canvas = document.getElementById("frontCanv");
    canvas.width = CANVASWIDTH;
    canvas.height = CANVASHEIGHT;
    context = backCanvas.getContext('2d');


    // create stars on background
    for (var i = 0; i < 40; i++)
        stars.push(new Star(Math.floor(Math.random() * (CANVASWIDTH)), Math.floor(Math.random() * (CANVASHEIGHT)), Please.make_color({
            hue: 12,
            saturation: .20,
            value: .7
        })));
    // make stars move
    movingStars = setInterval(updateStars, 25);


    // create ship
    var shipImg = new Image();
    shipImg.src = "res/ship.png";
    var shipImgProtected = new Image();
    shipImgProtected.src = "res/shipProtected.png";
    ship = new Ship(shipImg, shipImgProtected);
    shipImg.onload = function() {
        context.drawImage(ship.img, ship.x, ship.y);
    };
    var i = new Image();
    i.src = "res/enemy11.png";
    setTimeout(function() {shipEnemyArr.push(new ShipEnemy(i, CANVASWIDTH, 150, 1, 10, 10, 10))}, 2000);
    update();
}