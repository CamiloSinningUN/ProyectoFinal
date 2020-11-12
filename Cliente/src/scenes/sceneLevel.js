import avatar from "../gameObjects/avatar.js";
export default class sceneLevel extends Phaser.Scene {
    constructor() {
        super({ key: "sceneLevel" });
    }
    // 0 = arriba
    // 1 = derecha
    // 2 = abajo
    // 3 = izquierda

    Im = 1;
    Shooting = false;
    bulletTime = 0;

    create() {
        socket.on("shooting", () => {
            console.log("un jugador esta disparando");
        });

        this.BeginAnim();
        this.BeginAudio();
        this.player = new avatar(this, 600, 350, "player");

        this.cactus = new avatar(this, 50, 50, "cactus");

        this.player.anims.play("playerFrontAnimIdle");
        this.cactus.anims.play("cactusFrontAnimIdle")

        this.bullet = this.physics.add.image(100, 100, "Bullet")
        this.bullet.scale = 0.04;
        this.bullet.setVelocityY(-30);
        this.bullet.setCollideWorldBounds(true);

        //Physics
        this.physics.add.collider(this.bullet, this.player, this.destroy, null, this);
        this.physics.add.collider(this.bullet, this.cactus, this.destroy, null, this);
       
        

        this.cursor = this.input.keyboard.createCursorKeys();
        this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    destroy() {
        this.bullet.destroy();
    }
    update(time, delta) {
        
        //cactus
        if (this.Im == 1) {
            if (this.shoot.isUp) {
                //Idle
                this.cactus.Idle(this.cursor.up, this.cursor.right, this.cursor.down, this.cursor.left, "cactus");
                //Moving  
                this.cactus.Move(this.cursor.up, this.cursor.right, this.cursor.down, this.cursor.left, "cactus");
            }
            //Shoot
            if (this.shoot.isDown) {
                socket.emit("shoot");
                this.cactus.Shoot("cactus");
            }
        }
        //player
        else {
            if (this.shoot.isUp) {
                //Idle
                this.player.Idle(this.cursor.up, this.cursor.right, this.cursor.down, this.cursor.left, "player");
                //Moving  
                this.player.Move(this.cursor.up, this.cursor.right, this.cursor.down, this.cursor.left, "player");
            }
            //Shoot
            if (this.shoot.isDown) {
                socket.emit("shoot");
                this.player.Shoot("player");
            }
        }
    }
    BeginAnim() {
        this.anims.create({
            key: "playerFrontAnimIdle",
            frames: this.anims.generateFrameNumbers("playerFront", {
                start: 0,
                end: 5
            }),
            repeat: -1,
            frameRate: 6
        });


        //playerFrontMoving
        this.anims.create({
            key: "playerFrontAnimMoving",
            frames: this.anims.generateFrameNumbers("playerFront", {
                start: 14,
                end: 21
            }),
            repeat: -1,
            frameRate: 16
        });
        //playerFrontShoot
        this.anims.create({
            key: "playerFrontAnimShoot",
            frames: this.anims.generateFrameNumbers("playerFront", {
                start: 28,
                end: 33
            }),
            repeat: 1,
            frameRate: 8
        });
        //playerFrontDead
        this.anims.create({
            key: "playerFrontAnimDead",
            frames: this.anims.generateFrameNumbers("playerFront", {
                start: 56,
                end: 69
            }),
            repeat: 1,
            frameRate: 8
        });
        //End

        //playerback
        //playerBackIdle
        this.anims.create({
            key: "playerBackAnimIdle",
            frames: this.anims.generateFrameNumbers("playerBack", {
                start: 0,
                end: 5
            }),
            repeat: -1,
            frameRate: 6
        });
        //playerBackMoving
        this.anims.create({
            key: "playerBackAnimMoving",
            frames: this.anims.generateFrameNumbers("playerBack", {
                start: 14,
                end: 21
            }),
            repeat: -1,
            frameRate: 16
        });
        //playerBackShoot
        this.anims.create({
            key: "playerBackAnimShoot",
            frames: this.anims.generateFrameNumbers("playerBack", {
                start: 28,
                end: 33
            }),
            repeat: 1,
            frameRate: 8
        });
        //playerBackDead
        this.anims.create({
            key: "playerBackAnimDead",
            frames: this.anims.generateFrameNumbers("playerBack", {
                start: 56,
                end: 69
            }),
            repeat: 1,
            frameRate: 8
        });
        //End

        //playerSide
        //playerSideIdle
        this.anims.create({
            key: "playerSideAnimIdle",
            frames: this.anims.generateFrameNumbers("playerSide", {
                start: 0,
                end: 5
            }),
            repeat: -1,
            frameRate: 6
        });

        //playerSideMoving
        this.anims.create({
            key: "playerSideAnimMoving",
            frames: this.anims.generateFrameNumbers("playerSide", {
                start: 14,
                end: 21
            }),
            repeat: -1,
            frameRate: 16
        });
        //playerSideShoot
        this.anims.create({
            key: "playerSideAnimShoot",
            frames: this.anims.generateFrameNumbers("playerSide", {
                start: 28,
                end: 33
            }),
            repeat: 1,
            frameRate: 8
        });
        //playerSideDead
        this.anims.create({
            key: "playerSideAnimDead",
            frames: this.anims.generateFrameNumbers("playerSide", {
                start: 56,
                end: 69
            }),
            repeat: 1,
            frameRate: 8
        });
        //End
        //End

        //cactus


        //cactusFront
        //cactusFrontIdle
        this.anims.create({
            key: "cactusFrontAnimIdle",
            frames: this.anims.generateFrameNumbers("cactusFront", {
                start: 0,
                end: 3
            }),
            repeat: -1,
            frameRate: 6
        });

        //cactusFrontMoving
        this.anims.create({
            key: "cactusFrontAnimMoving",
            frames: this.anims.generateFrameNumbers("cactusFront", {
                start: 11,
                end: 20
            }),
            repeat: -1,
            frameRate: 16
        });
        //cactusFrontShoot
        this.anims.create({
            key: "cactusFrontAnimShoot",
            frames: this.anims.generateFrameNumbers("cactusFront", {
                start: 22,
                end: 32
            }),
            repeat: 1,
            frameRate: 8
        });
        //cactusFrontDead
        this.anims.create({
            key: "cactusFrontAnimDead",
            frames: this.anims.generateFrameNumbers("cactusFront", {
                start: 33,
                end: 33
            }),
            repeat: 1,
            frameRate: 8
        });
        //End

        //cactusback
        //cactusBackIdle
        this.anims.create({
            key: "cactusBackAnimIdle",
            frames: this.anims.generateFrameNumbers("cactusBack", {
                start: 0,
                end: 3
            }),
            repeat: -1,
            frameRate: 6
        });
        //cactusBackMoving
        this.anims.create({
            key: "cactusBackAnimMoving",
            frames: this.anims.generateFrameNumbers("cactusBack", {
                start: 11,
                end: 20
            }),
            repeat: -1,
            frameRate: 16
        });
        //cactusBackShoot
        this.anims.create({
            key: "cactusBackAnimShoot",
            frames: this.anims.generateFrameNumbers("cactusBack", {
                start: 22,
                end: 32
            }),
            repeat: 1,
            frameRate: 8
        });
        //cactusBackDead
        this.anims.create({
            key: "cactusBackAnimDead",
            frames: this.anims.generateFrameNumbers("cactusBack", {
                start: 33,
                end: 33
            }),
            repeat: 1,
            frameRate: 8
        });
        //End

        //cactusSide
        //cactusSideIdle
        this.anims.create({

            key: "cactusSideAnimIdle",
            frames: this.anims.generateFrameNumbers("cactusSide", {
                start: 0,
                end: 3
            }),
            repeat: -1,
            frameRate: 6
        });

        //cactusSideMoving
        this.anims.create({
            key: "cactusSideAnimMoving",
            frames: this.anims.generateFrameNumbers("cactusSide", {
                start: 11,
                end: 19
            }),
            repeat: -1,
            frameRate: 16
        });
        //cactusSideShoot
        this.anims.create({
            key: "cactusSideAnimShoot",
            frames: this.anims.generateFrameNumbers("cactusSide", {
                start: 22,
                end: 32
            }),
            repeat: 1,
            frameRate: 8
        });
        //cactusSideDead
        this.anims.create({
            key: "cactusSideAnimDead",
            frames: this.anims.generateFrameNumbers("cactusSide", {
                start: 33,
                end: 33
            }),
            repeat: 1,
            frameRate: 8
        });
        //End
        //End
    }
    BeginAudio() {
        //Audio
        let SoundTrack = this.sound.add("SoundTrack", { loop: true, volume: 0.05 });
        this.Shoot = this.sound.add("Shoot", { volume: 0.2, rate: 1.5 });
        //this.Walk = this.sound.add("Walk", { volume: 10, rate: 1 });
        SoundTrack.play();
    }

}






