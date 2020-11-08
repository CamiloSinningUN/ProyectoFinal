

class sceneLevel extends Phaser.Scene {   
    constructor() {       
        super({ key: "sceneLevel" });
    }
    // 0 = arriba
    // 1 = derecha
    // 2 = abajo
    // 3 = izquierda
    Im=2;
    direction;
    preload() {
        //cactus
        this.load.spritesheet("cactusBack", "./assest/CactusBack.png", { frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet("cactusFront", "./assest/CactusFront.png", { frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet("cactusSide", "./assest/CactusSide.png", { frameWidth: 40, frameHeight: 40 });
        //End
        //player
        this.load.spritesheet("playerBack", "./assest/PlayerBack.png", { frameWidth: 48, frameHeight: 44 });
        this.load.spritesheet("playerFront", "./assest/PlayerFront.png", { frameWidth: 48, frameHeight: 44 });
        this.load.spritesheet("playerSide", "./assest/PlayerSide.png", { frameWidth: 48, frameHeight: 44 });
        //End
    }
    create() {
    
        //Player
        this.player = this.physics.add.sprite(100, 100, "PlayerFront");
        this.player.setCollideWorldBounds(true);

        //playerFront
        //playerFrontIdle
        this.anims.create({
            key: "playerFrontAnimIdle",
            frames: this.anims.generateFrameNumbers("playerFront", {
                start: 0,
                end: 5
            }),
            repeat: -1,
            frameRate: 6
        });
        this.player.anims.play("playerFrontAnimIdle");
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
        this.player.anims.play("playerSideAnimIdle");
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
        this.cactus = this.physics.add.sprite(100, 100, "cactusFront");
        this.cactus.setCollideWorldBounds(true);

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
        this.cactus.anims.play("cactusFrontAnimIdle");
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
        this.cactus.anims.play("cactusSideAnimIdle");
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


        this.cursor = this.input.keyboard.createCursorKeys();
        this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(time, delta) {
        //cactus
        if (this.Im == 1) {
            //Idle
            if (this.cursor.right.isUp && this.cursor.left.isUp && this.cursor.up.isUp && this.cursor.down.isUp && this.shoot.isUp) {
                switch (this.direction) {
                    case 0:
                        this.cactus.anims.play("cactusBackAnimIdle", true);
                        break;
                    case 1:
                        this.cactus.anims.play("cactusSideAnimIdle", true);
                        break;

                    case 2:
                        this.cactus.anims.play("cactusFrontAnimIdle", true);
                        break;

                    case 3:
                        this.cactus.anims.play("cactusSideAnimIdle", true);
                        break;

                }
            }
            //Shoot
            if (this.shoot.isDown) {
                switch (this.direction) {
                    case 0:
                        this.cactus.anims.play("cactusBackAnimShoot", true);
                        break;
                    case 1:
                        this.cactus.anims.play("cactusSideAnimShoot", true);
                        break;

                    case 2:
                        this.cactus.anims.play("cactusFrontAnimShoot", true);
                        break;

                    case 3:
                        this.cactus.anims.play("cactusSideAnimShoot", true);
                        break;

                }
            }
            //Moving
            if (this.shoot.isUp) {
                if (this.cursor.right.isDown) {
                    this.cactus.flipX = false;
                    this.cactus.anims.play("cactusSideAnimMoving", true);
                    this.cactus.x = this.cactus.x + 1;
                    this.direction = 1;
                }
                else if (this.cursor.left.isDown) {
                    this.cactus.flipX = true;
                    this.cactus.anims.play("cactusSideAnimMoving", true);
                    this.cactus.x = this.cactus.x - 1;
                    this.direction = 3;
                }
                else if (this.cursor.up.isDown) {
                    this.cactus.anims.play("cactusBackAnimMoving", true);
                    this.cactus.y = this.cactus.y - 1;
                    this.direction = 0;
                }
                else if (this.cursor.down.isDown) {
                    this.cactus.anims.play("cactusFrontAnimMoving", true);
                    this.cactus.y = this.cactus.y + 1;
                    this.direction = 2;
                }
            }
        }
        //player
        else {
            //Idle
            if (this.cursor.right.isUp && this.cursor.left.isUp && this.cursor.up.isUp && this.cursor.down.isUp && this.shoot.isUp) {
                switch (this.direction) {
                    case 0:
                        this.player.anims.play("playerBackAnimIdle", true);
                        break;
                    case 1:
                        this.player.anims.play("playerSideAnimIdle", true);
                        break;

                    case 2:
                        this.player.anims.play("playerFrontAnimIdle", true);
                        break;

                    case 3:
                        this.player.anims.play("playerSideAnimIdle", true);
                        break;

                }
            }
            //Shoot
            if (this.shoot.isDown) {
                switch (this.direction) {
                    case 0:
                        this.player.anims.play("playerBackAnimShoot", true);
                        break;
                    case 1:
                        this.player.anims.play("playerSideAnimShoot", true);
                        break;

                    case 2:
                        this.player.anims.play("playerFrontAnimShoot", true);
                        break;

                    case 3:
                        this.player.anims.play("playerSideAnimShoot", true);
                        break;

                }
            }
            //Moving
            if (this.shoot.isUp) {
                if (this.cursor.right.isDown) {
                    this.player.flipX = false;
                    this.player.anims.play("playerSideAnimMoving", true);
                    this.player.x = this.player.x + 1;
                    this.direction = 1;
                }
                else if (this.cursor.left.isDown) {
                    this.player.flipX = true;
                    this.player.anims.play("playerSideAnimMoving", true);
                    this.player.x = this.player.x - 1;
                    this.direction = 3;
                }
                else if (this.cursor.up.isDown) {
                    this.player.anims.play("playerBackAnimMoving", true);
                    this.player.y = this.player.y - 1;
                    this.direction = 0;
                }
                else if (this.cursor.down.isDown) {
                    this.player.anims.play("playerFrontAnimMoving", true);
                    this.player.y = this.player.y + 1;
                    this.direction = 2;
                }
            }
        }
    }
}
export default sceneLevel;




