const config = {
    width: screen.width,
    height: screen.height - 115,
    parent: "container",
    type: Phaser.AUTO,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: "arcade",
        arcade: {

        }
    }
}
var game = new Phaser.Game(config);
var direction;
var Im = 1;
// 0 = arriba
// 1 = derecha
// 2 = abajo
// 3 = izquierda
function preload() {

    this.load.spritesheet("cactusBack", "./assest/CactusBack.png", { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet("cactusFront", "./assest/CactusFront.png", { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet("cactusSide", "./assest/CactusSide.png", { frameWidth: 40, frameHeight: 40 });
}
function create() {

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
    direction = 2;
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
    direction = 2;
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



    this.cursor = this.input.keyboard.createCursorKeys();
    this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}
function update(time, delta) {
    //cactus
    if (Im == 1) {
        //Idle
        if (this.cursor.right.isUp && this.cursor.left.isUp && this.cursor.up.isUp && this.cursor.down.isUp && this.shoot.isUp) {
            switch (direction) {
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
            switch (direction) {
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
                direction = 1;
            }
            else if (this.cursor.left.isDown) {
                this.cactus.flipX = true;
                this.cactus.anims.play("cactusSideAnimMoving", true);
                this.cactus.x = this.cactus.x - 1;
                direction = 3;
            }
            else if (this.cursor.up.isDown) {
                this.cactus.anims.play("cactusBackAnimMoving", true);
                this.cactus.y = this.cactus.y - 1;
                direction = 0;
            }
            else if (this.cursor.down.isDown) {
                this.cactus.anims.play("cactusFrontAnimMoving", true);
                this.cactus.y = this.cactus.y + 1;
                direction = 2;
            }
        }
    }
}
