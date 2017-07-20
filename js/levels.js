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

const delayBetweenLvls = 2000;

const levels = {
     '1' : [
         {
             'type': 'enemy',
             'model': 1,
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
             'model': 1,
             'y': 40,
             'health': 10,
             'speed': 1.5,
             'shootingSpeed': 140,
             'delay': 200,
             'movePattern': "-",
             'shootingPattern': "."
         },
         {
             'type': 'enemy',
             'model': 1,
             'y': 200,
             'health': 10,
             'speed': 1.5,
             'shootingSpeed': 140,
             'delay': 3000,
             'movePattern': "-",
             'shootingPattern': "."
         }
        ],
    '2': [
        {
            'type': 'enemy',
            'model': 2,
            'y': 140,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 90,
            'delay': 2000,
            'movePattern': "-",
            'shootingPattern': ".-"
        },
        {
            'type': 'enemy',
            'model': 2,
            'y': 340,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 90,
            'delay': 3000,
            'movePattern': "-",
            'shootingPattern': "..-"
        }
    ],
    '3': [
        {
            'type': 'enemy',
            'model': 1,
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
            'model': 2,
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
            'model': 2,
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

    for (let l of levels[String(lvl)]) {
        let delay = 0;
        if (lvl > 1){
            let tmp = levels[String(lvl-1)];
            delay = tmp[tmp.length - 1].delay + l['delay'];
        }
        else
            delay = l['delay'];

        if (l['type'] === 'enemy') {
            setTimeout( ()=> {
                    shipEnemyArr.push(new ShipEnemy(l['model'], l['y'], l['health'], l['speed'], l['shootingSpeed'], l['movePattern'], l['shootingPattern']));
                }, delay);
                //l['delay']);
        }
        else if (l['type'] === 'boss') {
            setTimeout(function () {
                    shipEnemyArr.push(new ShipEnemy("res/boss" + l['model'] + ".png",
                        l['y'], l['health'], l['speed'],
                        l['shootingSpeed'], l['movePattern']));
                },
                l['delay']);
        }
        else if (l['type'] === 'bonus') {

        }
        //debugger;
    }
}