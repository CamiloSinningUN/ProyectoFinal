export default class avatar extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        //Incializa avatar
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.physicsBodyType = Phaser.Physics.ARCADE;
        this.body.setCollideWorldBounds(true);

        //Incializa pies de avatar
        this.foots = scene.add.rectangle(x, y + this.body.halfHeight, 15, 8, 0xff0000, 0);
        scene.physics.world.enable(this.foots);           
    }
    
    //En que dirección esta mirando el avatar
    direction;
    // 0 = arriba
    // 1 = derecha
    // 2 = abajo
    // 3 = izquierda

    //Pies del avatar
    foots;

    //Si esta vivo o no
    Alive = true;

    //Cooldown
    bulletTime = 0;

    Move(up, right, down, left, name) {
        if (right) {
            this.flipX = false;
            this.anims.play(name + "SideAnimMoving", true);
            this.body.setVelocityX(50);
            this.foots.body.setVelocityX(50);
            this.direction = 1;            
        }
        else if (left) {
            this.flipX = true;
            this.anims.play(name + "SideAnimMoving", true);
            this.body.setVelocityX(-50);
            this.foots.body.setVelocityX(-50);
            this.direction = 3;
        }
        else if (up) {
            this.anims.play(name + "BackAnimMoving", true);
            this.body.setVelocityY(-50);
            this.foots.body.setVelocityY(-50);
            this.direction = 0;
        }
        else if (down) {
            this.anims.play(name + "FrontAnimMoving", true);
            this.body.setVelocityY(50);
            this.foots.body.setVelocityY(50);
            this.direction = 2;
        }
        this.x = this.foots.x;
        this.y = this.foots.y - this.body.halfHeight;
    }

    Idle(up, right, down, left, name) {
        if (!right && !left && !up && !down) {
            switch (this.direction) {
                case 0:
                    this.anims.play(name + "BackAnimIdle", true);
                    break;
                case 1:
                    this.anims.play(name + "SideAnimIdle", true);
                    break;

                case 2:
                    this.anims.play(name + "FrontAnimIdle", true);
                    break;

                case 3:
                    this.anims.play(name + "SideAnimIdle", true);
                    break;

            }         
        }
    }

    Shoot(name) {
        switch (this.direction) {
            case 0:
                this.anims.play(name + "BackAnimShoot", true);

                break;
            case 1:
                this.anims.play(name + "SideAnimShoot", true);

                break;

            case 2:
                this.anims.play(name + "FrontAnimShoot", true);

                break;

            case 3:
                this.anims.play(name + "SideAnimShoot", true);
                break;
        }
    }

    Dead(scene, name, num) {
        scene.add.sprite(this.x, this.y, name + "Back", num);
        this.destroy();
    }
}