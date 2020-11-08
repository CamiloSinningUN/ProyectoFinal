import sceneLevel from "./sceneLevel.js";
const config = {
    width: 640,
    height: 400,
    parent: "container",
    type: Phaser.AUTO,
    pixelArt: true,

    physics: {
        default: "arcade",
    },
    scene:[
        sceneLevel
    ]
    
}
new Phaser.Game(config);