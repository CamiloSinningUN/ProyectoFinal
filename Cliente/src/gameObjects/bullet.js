export default class bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.physicsBodyType = Phaser.Physics.ARCADE;
        this.scale = 0.04;
        this.setTexture("Bullet");
        
    }
    Move(avatar){
        switch (avatar.direction) {
            case 0:
                this.body.setVelocity(0,-100);
                this.flipY=false;               
                break;
            case 1:
                this.body.setVelocity(100,0);
                this.setAngle(90);
                break;
            case 2:
                this.body.setVelocity(0,100);
                this.flipY=true;
                break;

            case 3:
                this.body.setVelocity(-100,0);
                this.setAngle(-90);
                break;
        }
    }
  
}