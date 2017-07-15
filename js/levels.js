/**
 * Created by kelpe on 05/07/17.
 */

/* OLD
 patterns of movements:
 _   go down
 -   go straight
 ^   go up
 .   dont move
 */

/*
 patterns of movements:
 ^   up
 &   up+left
 <   left
 >   right
 *   down+left
 _   down
 -   straight
 .   dont move
 */
/*
 patterns of shooting:
.    shoot
-    wait
 */

const levels = {
     '1' : [
         {
         'type': 'enemy',
         'model': 11,
         'y': 50,
         'health': 10,
         'speed': 1,
         'shootingSpeed': 30,
         'delay': 500,
         'movePattern': "-",
         'shootingPattern': "."
        }, {
             'type': 'enemy',
             'model': 11,
             'y': 250,
             'health': 10,
             'speed': 1,
             'shootingSpeed': 30,
             'delay': 1500,
             'movePattern': "-",
             'shootingPattern': "."
         }, {
             'type': 'enemy',
             'model': 11,
             'y': 450,
             'health': 10,
             'speed': 1,
             'shootingSpeed': 30,
             'delay': 4500,
             'movePattern': "-",
             'shootingPattern': "."
         }
        ],
    '2': [
        {

        }
    ]
};

// function                           ShipEnemy(imgSrc, y, health, speed, shootingSpeed)
function loadLevel(lvl) {
    for (let l of lvl) {
        if (l['type'] === 'enemy') {
            setTimeout(function () {
                    shipEnemyArr.push(new ShipEnemy("res/enemy" + l['model'] + ".png",
                        l['y'], l['health'], l['speed'],
                        l['shootingSpeed'], l['movePattern'], l['shootingPattern']));
                    shipEnemyArr[shipEnemyArr.length - 1].countWidthHeight()
                },
                l['delay']);
        }
        else if (l['type'] === 'boss') {
            setTimeout(function () {
                    shipEnemyArr.push(new ShipEnemy("res/boss" + l['model'] + ".png",
                        l['y'], l['health'], l['speed'],
                        l['shootingSpeed'], l['movePattern']));
                    shipEnemyArr[shipEnemyArr.length - 1].countWidthHeight()
                },
                l['delay']);
        }
        else if (l['type'] === 'bonus') {

        }
    }
}