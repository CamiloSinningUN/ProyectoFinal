export default class bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        //Incializa la bala
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.physicsBodyType = Phaser.Physics.ARCADE;
        this.scale = 0.04;
        this.setTexture("Bullet");
        
    }
    //velocidad de la bala
    velocity = 200;
    
    Move(avatar){
        switch (avatar.direction) {
            case 0:
                this.body.setVelocity(0,-this.velocity);
                this.flipY=false;               
                break;
            case 1:
                this.body.setVelocity(this.velocity,0);
                this.setAngle(90);
                break;
            case 2:
                this.body.setVelocity(0,this.velocity);
                this.flipY=true;
                break;

            case 3:
                this.body.setVelocity(-this.velocity,0);
                this.setAngle(-90);
                break;
        }
    }
  
}