
export default class sceneWin extends Phaser.Scene {
    constructor() {
        super({ key: "sceneWin" });
    }
    sw = true;
    create() {
        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5);
        graphics.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        const configtext = {
            x: 100,
            y: 100,
            text: "Press SPACE to play again",
            style: {
                fontSize: 30,
                align: 'right'
            }
        }
        this.text = this.make.text(configtext);
        this.Reload = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        if(this.Reload.isDown && this.sw){
            location.reload();   
            this.sw = false;
        }

    }
}
