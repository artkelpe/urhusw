/**
 * Created by kelpe on 05/07/17.
 */

// convention:
    //  lvl[1-9][1-9] : arr of arr    example:level11, lvl23, lvl31 etc

    //  for each element of lvl[1-9][1-9] as element:
    //      element[type, dispersion , delay]
    //  BUT lastElement : bool        0 - not started/in progress, 1 - ended

var attrConsts = [10, 1.1, 1];      //basic/minimal attrs of enemies: health, speed, shootingSpeed

var levels = {
     '1' : [{
         'type':11,
         'y': 50,
         'health': 10,
         'speed': 1.8,
         'shootingSpeed': 80,
         'delay': 500,
         'pattern': "-_-^"
        }, {
         'type':12,
         'y': 450,
         'health': 10,
         'speed': 1.5,
         'shootingSpeed': 80,
         'delay': 1500
        },{
         'type':12,
         'y': 200,
         'health': 10,
         'speed': 1.5,
         'shootingSpeed': 80,
         'delay': 3000,
         'pattern': ""
        },{
         'type':11,
         'y': 320,
         'health': 10,
         'speed': 2.1,
         'shootingSpeed': 80,
         'delay': 4000
        }]
};

// function                   ShipEnemy(imgSrc, y, health, speed, shootingSpeed)
function loadLevel(lvl) {
    for (let l of lvl) {
        setTimeout(function() {
            shipEnemyArr.push(new ShipEnemy("res/enemy" + l['type'] + ".png",
                                            l['y'], l['health'], l['speed'],
                                            l['shootingSpeed'], l['pattern']));

            shipEnemyArr[shipEnemyArr.length-1].countWidthHeight()}, l['delay']);
    }
}