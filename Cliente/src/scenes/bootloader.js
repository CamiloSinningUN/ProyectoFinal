
export default class Bootloader extends Phaser.Scene{
    constructor() {
        super({ key: "Bootloader" });
    }
    
    preload(){
        this.load.on("complete",()=>{
            this.scene.start("sceneLevel");
        });
        //cactus
        this.load.spritesheet("cactusBack", "./assest/CactusBack.png", { frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet("cactusFront", "./assest/CactusFront.png", { frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet("cactusSide", "./assest/CactusSide.png", { frameWidth: 40, frameHeight: 40 });

        //player
        this.load.spritesheet("playerBack", "./assest/PlayerBack.png", { frameWidth: 48, frameHeight: 44 });
        this.load.spritesheet("playerFront", "./assest/PlayerFront.png", { frameWidth: 48, frameHeight: 44 });
        this.load.spritesheet("playerSide", "./assest/PlayerSide.png", { frameWidth: 48, frameHeight: 44 });

        this.load.tilemapTiledJSON('Mapa', './assest/Mapa.json');
        this.load.image('atlas', './assest/atlas.png');

        //Bullet
        this.load.image("Bullet", "./assest/Bullet.png")
    
        //Soundtrack
        this.load.audio("SoundTrack", "./assest/SoundTrack.mp3");
        //Shoot
        this.load.audio("Shoot", "./assest/Shoot.mp3");

        //Walk
        //this.load.audio("Walk", "./assest/Walk.mp3");
       
    }

}