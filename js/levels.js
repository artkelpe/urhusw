/**
 * Created by kelpe on 05/07/17.
 */

/*
 patterns of movements:
 _   go down
 -   go straight
 ^   go up
 .   dont move
 */

var levels = {
     '1' : [
         {
         'type':11,
         'y': 50,
         'health': 10,
         'speed': 1.2,
         'shootingSpeed': 120,
         'delay': 500
        }, {
         'type':12,
         'y': 450,
         'health': 10,
         'speed': 1.2,
         'shootingSpeed': 120,
         'delay': 1500
        }, {
         'type':12,
         'y': 200,
         'health': 10,
         'speed': 1.2,
         'shootingSpeed': 120,
         'delay': 2500,
        }
        ],
    '2': [
        {

        }
    ]
};

// function                   ShipEnemy(imgSrc, y, health, speed, shootingSpeed)
function loadLevel(lvl) {
    for (let l of lvl) {
        setTimeout(function() {
                shipEnemyArr.push(new ShipEnemy("res/enemy" + l['type'] + ".png",
                                            l['y'], l['health'], l['speed'],
                                            l['shootingSpeed'], l['pattern']));

                shipEnemyArr[shipEnemyArr.length-1].countWidthHeight()},
            l['delay']);
    }
}