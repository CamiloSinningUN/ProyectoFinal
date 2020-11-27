
export default class Bootloader extends Phaser.Scene{
    constructor() {
        super({ key: "Bootloader" });
    }
    //Pone en cache todos los sprites y audios a usar
    preload(){
        //Verifica que se carga todo
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

        //map
        this.load.tilemapTiledJSON('mapa', './assest/Mapa.json');
        this.load.image('Atlas', './assest/atlas.png');
        this.load.image('NPC','./assest/NPC.png');

        //Bullet
        this.load.image("Bullet", "./assest/Bullet.png")
    
        //Soundtrack
        this.load.audio("SoundTrack", "./assest/SoundTrack.mp3");

        //Shoot
        this.load.audio("Shoot", "./assest/Shoot.mp3");
       
    }

}