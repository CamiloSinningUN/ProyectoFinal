import avatar from "../gameObjects/avatar.js";
import bullet from "../gameObjects/bullet.js"
export default class sceneLevel extends Phaser.Scene {
    constructor() {
        super({ key: "sceneLevel" });
    }

    Im = 1;
    bulletTime = 0;
    create() {

        this.BeginAnim();
        this.BeginAudio();
        this.player = new avatar(this, 600, 350, "player");
        this.cactus = new avatar(this, 50, 50, "cactus");

        this.player.anims.play("playerFrontAnimIdle");
        this.cactus.anims.play("cactusFrontAnimIdle");      

        this.cursor = this.input.keyboard.createCursorKeys();
        this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    destroyBulletPlayer() {
        this.bullet.destroy();
        this.player.Alive = false;

    }
    destroyBulletCactus() {
        this.bullet.destroy();
        this.cactus.Alive = false;
    }
    update(time, delta) {
        //cactus
        if (!this.cactus.Alive) {
            this.cactus.Dead(this, "cactus", 33);
        } else {
            if (this.Im == 1) {
                if (this.shoot.isUp) {
                    //Idle
                    this.cactus.Idle(this.cursor.up, this.cursor.right, this.cursor.down, this.cursor.left, "cactus");
                    //Moving  
                    this.cactus.Move(this.cursor.up, this.cursor.right, this.cursor.down, this.cursor.left, "cactus");
                }
                //Shoot
                if (this.shoot.isDown) {
                    if (this.time.now > this.bulletTime) {
                        socket.emit("shoot");
                        this.cactus.Shoot("cactus");
                        this.Shoot.play();
                        //Physics
                        this.bala = new bullet(this,this.cactus.x,this.cactus.y,"bullet");

                        this.physics.add.collider(this.bala, this.player, this.destroyBulletPlayer, null, this);
                        this.physics.add.collider(this.bala, this.cactus, this.destroyBalaCactus, null, this);
                        this.bulletTime = this.time.now + 2000;
                    }

                }
            }
        }

        //player
        if (!this.player.Alive) {
            this.player.Dead(this, "player", 42);
        } else {
            if (this.Im == 2) {
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
                end: 31
            }),
            repeat: 1,
            frameRate: 8
        });
        //cactusFrontDead

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
                end: 31
            }),
            repeat: 1,
            frameRate: 8
        });

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
                end: 31
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






