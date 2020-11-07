const config = {
    width: screen.width,
    height: screen.height-115,
    parent: "container",
    type: Phaser.AUTO,
    //physhics
    scene:{
        preload: preload,
        create: create,
        update: update
    },
    physics:{
        default: "arcade",
        arcade:{
            gravity:{
                y:500
            }
        }
    }
}
var game = new Phaser.Game(config);

function preload(){
    this.load.image("slime","./assest/Sprite-0001.png");
}
function create() {
    this.slime = this.physics.add.image(50,100,"slime");
    this.slime.setScale(10);
    this.slime.setOrigin(0.5,0.75);
    this.slime.setCollideWorldBounds(true);
}
function update(time,delta) {
    //this.slime.x++;
}