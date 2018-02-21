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
    '1': [
         {
             'type': 'enemy',
             'model': 1,
             'y': 340,
             'health': 10,
             'speed': 1.6,
             'shootingSpeed': 130,
             'delay': 5000,
             'movePattern': "-",
             'shootingPattern': "."
         },
         {
             'type': 'enemy',
             'model': 1,
             'y': 40,
             'health': 10,
             'speed': 1.6,
             'shootingSpeed': 130,
             'delay': 7500,
             'movePattern': "-",
             'shootingPattern': "."
         },
         {
             'type': 'enemy',
             'model': 1,
             'y': 200,
             'health': 10,
             'speed': 1.6,
             'shootingSpeed': 130,
             'delay': 9000,
             'movePattern': "-",
             'shootingPattern': "."
         }
        ],
    '2': [
        {
            'type': 'enemy',
            'model': 1,
            'y': 90,
            'health': 10,
            'speed': 1.4,
            'shootingSpeed': 70,
            'delay': 6000,
            'movePattern': "-",
            'shootingPattern': ".-"
        },
        {
            'type': 'enemy',
            'model': 1,
            'y': 390,
            'health': 10,
            'speed': 1.4,
            'shootingSpeed': 70,
            'delay': 6000,
            'movePattern': "-",
            'shootingPattern': "-."
        }
    ],
    '3': [
        {
            'type': 'enemy',
            'model': 2,
            'y': 80,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 140,
            'delay': 4000,
            'movePattern': "****&&&&",
            'shootingPattern': ","
        },
        {
            'type': 'enemy',
            'model': 2,
            'y': 80,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 140,
            'delay': 4700,
            'movePattern': "****&&&&",
            'shootingPattern': "."
        },
        {
            'type': 'enemy',
            'model': 2,
            'y': 80,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 140,
            'delay': 5400,
            'movePattern': "****&&&&",
            'shootingPattern': "."
        }
    ],
    '4': [
        {
            'type': 'enemy',
            'model': 2,
            'y': 5,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 140,
            'delay': 4000,
            'movePattern': "****&&&&",
            'shootingPattern': ","
        },
        {
            'type': 'enemy',
            'model': 2,
            'y': 5,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 140,
            'delay': 4700,
            'movePattern': "****&&&&",
            'shootingPattern': "."
        },
        {
            'type': 'enemy',
            'model': 2,
            'y': 5,
            'health': 10,
            'speed': 1.5,
            'shootingSpeed': 140,
            'delay': 5400,
            'movePattern': "****&&&&",
            'shootingPattern': "."
        },
        {
            'type': 'enemy',
            'model': 1,
            'y': 90,
            'health': 10,
            'speed': 1.4,
            'shootingSpeed': 70,
            'delay': 4300,
            'movePattern': "-",
            'shootingPattern': ".-"
        },
        {
            'type': 'enemy',
            'model': 1,
            'y': 390,
            'health': 10,
            'speed': 1.4,
            'shootingSpeed': 70,
            'delay': 4300,
            'movePattern': "-",
            'shootingPattern': "-."
        }
    ],
    '5': [
        {
            'type': 'enemy',
            'model': 3,
            'y': 200,
            'health': 10,
            'speed': 1.4,
            'shootingSpeed': 70,
            'delay': 4500,
            'movePattern': "--^^--__",
            'shootingPattern': "..-"
        }
    ],
    '6': [
        {
            'type': 'enemy',
            'model': 3,
            'y': 100,
            'health': 10,
            'speed': 1.4,
            'shootingSpeed': 70,
            'delay': 4000,
            'movePattern': "--^^--__",
            'shootingPattern': "..-"
        },
        {
            'type': 'enemy',
            'model': 3,
            'y': 300,
            'health': 10,
            'speed': 1.4,
            'shootingSpeed': 70,
            'delay': 4000,
            'movePattern': "--^^--__",
            'shootingPattern': "..-"
        }
    ],
    '7': [
        {
            'type': 'enemy',
            'model': 3,
            'y': 300,
            'health': 10,
            'speed': 1.4,
            'shootingSpeed': 70,
            'delay': 4000,
            'movePattern': "--^^--__",
            'shootingPattern': "..-"
        },
        {
            'type': 'enemy',
            'model': 3,
            'y': 300,
            'health': 10,
            'speed': 1.4,
            'shootingSpeed': 70,
            'delay': 4000,
            'movePattern': "--^^--__",
            'shootingPattern': "..-"
        }
    ]
};

// function
function loadLevel(lvl) {
    // count delay

    //iterate through all objects of chosen level
    for (let l of levels[String(lvl)]) {
        let delay = 0;
        if (lvl > 1){
            for (let i = lvl-1; i !== 0; i--) {
                let prevLvl = levels[String(i)];
                delay += prevLvl[prevLvl.length - 1].delay + l['delay'];
            }
        }
        else
            delay = l['delay'];


        if (l['type'] === 'enemy') {
            setTimeout( _ => {
                    shipEnemyArr.push(new ShipEnemy(l['model'], l['y'], l['health'], l['speed'], l['shootingSpeed'], l['movePattern'], l['shootingPattern']));
                    l['delay'] = delay;
                }, delay);
                //l['delay']);
        }
        else if (l['type'] === 'boss') {
            setTimeout( _ => {
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

    //set number of wave
    let delay = 0;
    if (lvl > 1){
        for (let i = lvl-1; i !== 0; i--) {
            let prevLvl = levels[String(i)];
            delay += prevLvl[prevLvl.length - 1].delay + levels[String(lvl)][0]['delay'];
        }
    }
    else{
        delay = levels[String(lvl)][0]['delay'];
    }
    setTimeout( _ => {
        currentWave = lvl; //do this in timeout
    }, delay);

    if (lvl === Object.keys(levels).length)
    //set timeout for game finish
    setTimeout( _ => {
        gameFinish();
    }, delay+12000);


}