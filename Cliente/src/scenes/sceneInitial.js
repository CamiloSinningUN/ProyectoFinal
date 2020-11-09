import sceneLevel from "./sceneLevel";

export default class sceneInitial extends Phaser.Scene{
    constructor() {
        super({ key: "sceneInitial" });
    }
    create(){
        this.scene.start(sceneLevel);
    }
}