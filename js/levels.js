/**
 * Created by kelpe on 05/07/17.
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
             'y': 340,
             'health': 10,
             'speed': 1.5,
             'shootingSpeed': 140,
             'delay': 1000,
             'movePattern': "-",
             'shootingPattern': "."
         },
         {
             'type': 'enemy',
             'model': 11,
             'y': 40,
             'health': 10,
             'speed': 1.5,
             'shootingSpeed': 140,
             'delay': 3500,
             'movePattern': "-",
             'shootingPattern': "."
         },
         {
             'type': 'enemy',
             'model': 11,
             'y': 200,
             'health': 10,
             'speed': 1.5,
             'shootingSpeed': 140,
             'delay': 6000,
             'movePattern': "-",
             'shootingPattern': "."
         }
        ],
    '2': [
        {
            'type': 'enemy',
            'model': 11,
            'y': 140,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 90,
            'delay': 12000,
            'movePattern': "-",
            'shootingPattern': ".-"
        },
        {
            'type': 'enemy',
            'model': 11,
            'y': 340,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 90,
            'delay': 12000,
            'movePattern': "-",
            'shootingPattern': "..-"
        }
    ],
    '3': [
        {
            'type': 'enemy',
            'model': 11,
            'y': 100,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 140,
            'delay': 17000,
            'movePattern': "****&&&&",
            'shootingPattern': ","
        },
        {
            'type': 'enemy',
            'model': 11,
            'y': 100,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 140,
            'delay': 18000,
            'movePattern': "****&&&&",
            'shootingPattern': "."
        },
        {
            'type': 'enemy',
            'model': 11,
            'y': 100,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 140,
            'delay': 19000,
            'movePattern': "****&&&&",
            'shootingPattern': "."
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