export default class avatar extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.immovable=true;
        this.body.setCollideWorldBounds(true);
        
    }
    Im = 1;
    direction;
    Move(up,right,down,left,name){
        
        if (right.isDown) {
            this.flipX = false;
            this.anims.play(name+"SideAnimMoving", true);
            this.x = this.x + 1;
           this.direction = 1;
        }
        else if (left.isDown) {
            this.flipX = true;
            this.anims.play(name+"SideAnimMoving", true);
            this.x = this.x - 1;
            this.direction = 3;
        }
        else if (up.isDown) {
            this.anims.play(name+"BackAnimMoving", true);
            this.y = this.y - 1;
            this.direction = 0;
        }
        else if (down.isDown) {
            this.anims.play(name+"FrontAnimMoving", true);
            this.y = this.y + 1;
            this.direction = 2;
        }
    }
    Idle(up,right,down,left,name){
        if (right.isUp && left.isUp && up.isUp && down.isUp) {
            switch (this.direction) {
                case 0:
                    this.anims.play(name+"BackAnimIdle", true);
                    break;
                case 1:
                    this.anims.play(name+"SideAnimIdle", true);
                    break;

                case 2:
                    this.anims.play(name+"FrontAnimIdle", true);
                    break;

                case 3:
                    this.anims.play(name+"SideAnimIdle", true);
                    break;

            }
        }
    }
    Shoot(name){
        //this.Shoot.play();
        console.log("dispare");
        switch (this.direction) {
            case 0:
                this.anims.play(name+"BackAnimShoot", true);

                break;
            case 1:
                this.anims.play(name+"SideAnimShoot", true);

                break;

            case 2:
                this.anims.play(name+"FrontAnimShoot", true);

                break;

            case 3:
                this.anims.play(name+"SideAnimShoot", true);
                break;
        }
    }
}