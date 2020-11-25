
import Bootloader from "./bootloader.js";
import sceneLevel from "./sceneLevel.js";
import sceneWin from "./sceneWin.js";
const config = {
    width: 640,
    height: 400,
    parent: "container",
    type: Phaser.AUTO,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            gravity: 0,
            debug:true
        }
    },
    scene:[
        Bootloader,
        sceneLevel,
        sceneWin
    ]
    
}
var game = new Phaser.Game(config);


