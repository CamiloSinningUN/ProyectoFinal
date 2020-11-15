import avatar from "../gameObjects/avatar.js";
import bullet from "../gameObjects/bullet.js"

export default class sceneLevel extends Phaser.Scene {
    constructor() {
        super({ key: "sceneLevel" });
    }
    Im = 1;
    bulletTime = 0;
    create() {
        const mapa = this.make.tilemap({ key: 'mapa' });
        const atlas = mapa.addTilesetImage('Atlas',"Atlas");
        const npc = mapa.addTilesetImage("NPC's","NPC");
        const layer = mapa.createStaticLayer('Pasto', atlas, 0, 0);
        const layer1 = mapa.createStaticLayer('Cosas del pueblo', atlas, 0, 0);
        layer.setCollisionByProperty({solido : true});
        //this.cameras.main.centerOn(100, 100);
        this.Waiting();
        //layer.physicsBodyType = Phaser.Physics.ARCADE;
       

        
        socket.on('grupo', () => {
            this.text.destroy();
        });
        this.BeginAnim();
        this.BeginAudio();
        this.player = new avatar(this, 600, 350, "player");
        this.cactus = new avatar(this, 50, 50, "cactus");
        this.cactus.setOrigin(0.5, 0.5);
        this.player.setOrigin(0.5, 0.5);

        this.player.anims.play("playerFrontAnimIdle");
        this.cactus.anims.play("cactusFrontAnimIdle");

        this.cursor = this.input.keyboard.createCursorKeys();
        this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.physics.add.collider(this.player, layer, this.choque, null, this );
        this.physics.add.collider(this.cactus, layer, this.choque, null, this);
    }

    choque(){
        console.log('me choqué');
    }

    destroyBulletPlayer() {
        this.bala.destroy();
        this.player.Alive = false;

    }
    destroyBulletCactus() {
        this.bala.destroy();
        this.cactus.Alive = false;
    }
    update(time, delta) {      
        //cactus
        if (!this.cactus.Alive) {
            this.cactus.Dead(this, "cactus", 33);
            this.scene.restart();
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
                        this.cactus.Shoot("cactus");
                        if (this.cactus.anims.currentFrame.isLast) {
                            this.pullTheTriger(this.cactus);
                        }
                    }

                }
            }
        }

        //player
        if (!this.player.Alive) {
            this.player.Dead(this, "player", 42);
            this.scene.restart();
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
                    if (this.time.now > this.bulletTime) {
                        this.player.Shoot("player");
                        if (this.player.anims.currentFrame.isLast) {
                            this.pullTheTriger(this.player);
                        }
                    }
                }
            }

        }
    }
    Waiting() {
        const configtext = {
            x: 100,
            y: 100,
            text: 'Waiting for more players',
            style: {
                fontSize: 30,
                align: 'right'
            }
        }
        this.text = this.make.text(configtext);
    }
    pullTheTriger(name) {
        socket.emit("shoot");
        this.Shoot.play();
        this.bala = new bullet(this, this.bulletX(name), this.bulletY(name), "bullet");
        this.bala.Move(name);
        this.physics.add.collider(this.bala, this.player, this.destroyBulletPlayer, null, this);
        this.physics.add.collider(this.bala, this.cactus, this.destroyBulletCactus, null, this);
        this.bulletTime = this.time.now + 2000;
        
    }


    bulletX(name) {
        let x = name.x;
        switch (name.direction) {
            case 1:
                x = name.x + 30;
                break;
            case 3:
                x = name.x - 30;
                break;
        }
        return x;
    }
    bulletY(name) {
        let y = name.y;
        switch (name.direction) {
            case 0:
                y = name.y - 25;
                break;
            case 2:
                y = name.y + 25;
                break;
        }
        return y;
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






