import avatar from "../gameObjects/avatar.js";
import bullet from "../gameObjects/bullet.js";
export default class sceneLevel extends Phaser.Scene {
    constructor() {
        super({ key: "sceneLevel" });
    }

    //De prueba
    Im = 0;

    //Para retrasar el tiempo entre disparos
    bulletTime = 0;

    complete = false;

    //Carga en la escena lo requerido
    create() {

        this.beginClient();

        //Creación de mapa
        const mapa = this.make.tilemap({ key: 'mapa' });
        const atlas = mapa.addTilesetImage('Atlas', "Atlas");
        const npc = mapa.addTilesetImage("NPC's", "NPC");
        this.layer = mapa.createStaticLayer('Pasto', atlas, 0, 0);
        const array = [atlas, npc];
        const layer1 = mapa.createStaticLayer('Cosas del pueblo', array, 0, 0);
        this.layer.setCollisionByProperty({ solido: true });

        //Textos y contadores
        this.AddText("Waiting for more players");
        this.Counter();

        //Servidor
        socket.on('grupo', () => {
            this.text.destroy();
        });

        //Carga animaciones y audio en la escena
        this.BeginAnim();
        this.BeginAudio();

        // //Inicializa y configura los avatares
        // this.player = new avatar(this, 600, 350, "player");
        // this.cactus = new avatar(this, 50, 50, "cactus");

        // this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.75);
        // this.player.body.setOffset(15, 15);

        // this.cactus.body.setSize(this.cactus.width * 0.4, this.cactus.height * 0.7);
        // this.cactus.body.setOffset(14, 15);

        // this.player.anims.play("playerFrontAnimIdle");
        // this.cactus.anims.play("cactusFrontAnimIdle");

        // //Asigna las fisicas con el mapa
        // this.physics.add.collider(layer, this.player.foots);
        // this.physics.add.collider(layer, this.cactus.foots);

        //Crea variables para los botones a usar
        this.cursor = this.input.keyboard.createCursorKeys();
        this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }


    //Muestra en pantalla el tiempo restante para disparar
    cooldown() {
        let string;
        if (this.bulletTime > this.time.now) {
            string = parseInt((this.bulletTime - this.time.now) / 1000);

        } else {
            string = "Shoot!";
        }
        this.cooldowntext.setText(string);
    }

    //Inicializa el texto donde se mostrara el cooldown
    Counter() {
        const configtext = {
            x: 20,
            y: 20,
            text: "Shoot!",
            style: {
                color: "#F54141",
                backgroundColor: "#00000050",
                fontSize: 30,
                align: 'Center'
            }
        }
        this.cooldowntext = this.make.text(configtext);
    }

    //Mata al vaquero
    destroyBulletPlayer() {
        this.bala.destroy();
        this.player.Alive = false;

    }

    //Mata al Cactus
    destroyBulletCactus() {
        this.bala.destroy();
        this.cactus.Alive = false;
    }

    //Se ejecuta todo el tiempo esta función
    update(time, delta) {
        //Muestra el tiempo restante para disparar
        this.cooldown();
        if ((this.Im == 1) && (!this.complete)) {
            //Pone la velocidad de cactus en cero
            this.cactus.body.setVelocity(0, 0);
            this.cactus.foots.body.setVelocity(0, 0);
        } else if ((this.Im == 2) && (!this.complete)) {
            //Pone la velocidad del vaquero en cero
            this.player.foots.body.setVelocity(0, 0);
            this.player.body.setVelocity(0, 0);
        } else if (this.complete) {
            //Pone la velocidad de cactus en cero
            this.cactus.body.setVelocity(0, 0);
            this.cactus.foots.body.setVelocity(0, 0);
            //Pone la velocidad del vaquero en cero
            this.player.foots.body.setVelocity(0, 0);
            this.player.body.setVelocity(0, 0);
        }

        if (this.Im == 1) {
            //cactus
            if (!this.cactus.Alive) {
                this.cactus.Dead(this, "cactus", 33);
                this.cactus.Alive = true;
                this.scene.start("sceneWin");
                this.SoundTrack.stop();
            } else {

                if (this.shoot.isUp) {
                    let upCactus = false;
                    let rightCactus = false;
                    let downCactus = false;
                    let leftCactus = false;
                    if (this.cursor.up.isDown) {
                        upCactus = true;
                        socket.player = {
                            x: 0,
                            y: -50
                        };
                    } else if (this.cursor.right.isDown) {
                        rightCactus = true;
                        socket.player = {
                            x: 50,
                            y: 0
                        };
                    } else if (this.cursor.down.isDown) {
                        downCactus = true;
                        socket.player = {
                            x: 0,
                            y: 50
                        };
                    } else if (this.cursor.left.isDown) {
                        leftCactus = true;
                        socket.player = {
                            x: -50,
                            y: 0
                        };
                    }
                    if (upCactus || rightCactus || downCactus || leftCactus) {
                        //Moving  
                        this.cactus.Move(upCactus, rightCactus, downCactus, leftCactus, "cactus");
                        socket.emit('move', socket.player);
                    } else {
                        //Idle
                        this.cactus.Idle(upCactus, rightCactus, downCactus, leftCactus, "cactus");
                        socket.emit('idle');
                    }

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

        if (this.Im == 2) {
            //vaquero
            if (!this.player.Alive) {
                this.player.Dead(this, "player", 42);
                this.player.Alive = true;
                this.scene.start("sceneWin");
                this.SoundTrack.stop();
            } else {
                if (this.shoot.isUp) {
                    let upPlayer = false;
                    let rightPlayer = false;
                    let downPlayer = false;
                    let leftPlayer = false;
                    if (this.cursor.up.isDown) {
                        upPlayer = true;
                        socket.player = {
                            x: 0,
                            y: -50
                        };
                    } else if (this.cursor.right.isDown) {
                        rightPlayer = true;
                        socket.player = {
                            x: 50,
                            y: 0
                        };
                    } else if (this.cursor.down.isDown) {
                        downPlayer = true;
                        socket.player = {
                            x: 0,
                            y: 50
                        };
                    } else if (this.cursor.left.isDown) {
                        leftPlayer = true;
                        socket.player = {
                            x: -50,
                            y: 0
                        };
                    }
                    if (upPlayer || rightPlayer || downPlayer || leftPlayer) {
                        //Moving  
                        this.player.Move(upPlayer, rightPlayer, downPlayer, leftPlayer, "player");
                        socket.emit('move', socket.player);
                    } else {
                        //Idle
                        this.player.Idle(upPlayer, rightPlayer, downPlayer, leftPlayer, "player");
                        socket.emit('idle');
                    }

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

    //Añade un texto determinado en la posicion 100,100
    AddText(string) {
        const configtext = {
            x: 100,
            y: 100,
            text: string,
            style: {
                fontSize: 30,
                align: 'right'
            }
        }
        this.text = this.make.text(configtext);
    }

    //Se ejecuta cuando un avatar dispara
    pullTheTriger(name) {
        this.Shoot.play();
        this.bala = new bullet(this, this.bulletX(name), this.bulletY(name), "bullet");
        this.bala.body.setOffset(0, 200);
        this.bala.Move(name);
        this.physics.add.collider(this.bala, this.player, this.destroyBulletPlayer, null, this);
        this.physics.add.collider(this.bala, this.cactus, this.destroyBulletCactus, null, this);
        this.bulletTime = this.time.now + 2000;

    }

    //Calcula la posición en x de generación de la bala
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

    //Calcula la posición en y de generación de la bala
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

    //Incializa las animaciones de los personajes
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
            frameRate: 7
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
            frameRate: 7
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
            frameRate: 7
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
            frameRate: 10
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
            frameRate: 10
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
            frameRate: 10
        });
        //End
        //End
    }

    //Incializa los audios del juego
    BeginAudio() {
        //SoundTrack
        this.SoundTrack = this.sound.add("SoundTrack", { loop: true, volume: 0.05 });

        //Shoot
        this.Shoot = this.sound.add("Shoot", { volume: 0.2, rate: 1.5 });

        //Pone a sonar el soundtrack
        this.SoundTrack.play();
    }


    beginClient() {
        socket.emit('newplayer');
        socket.on('newplayer', (data) => {
            this.text.setText("");
            this.complete = true;
            if (data.type == 1) {
                this.addNewCactus();
            } else {
                this.addNewPlayer();
            } 
        });
        socket.on('allplayers', (data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].type == 1) {
                    this.addNewCactus();
                    if (i == data.length - 1) {
                        this.Im = 1;
                        this.text.setText("");
                    }
                } else if (data[i].type == 2) {
                    this.addNewPlayer();
                    if (i == data.length - 1) {
                        this.Im = 2;
                        this.text.setText("");
                    }
                }
                if(i == 1){
                    this.complete = true;
                }
            }
            socket.on('moving', (vData) => {
                let up = false;
                let right = false;
                let down = false;
                let left = false;
                if (vData.y < 0) {
                    up = true;
                } else if (vData.x > 0) {
                    right = true;
                } else if (vData.y > 0) {
                    down = true;
                } else if (vData.x < 0) {
                    left = true;
                }
                //console.log("up: " + up + "\n right: " + right + "\n down: " + down + "\n left: " + left);
                if (this.Im == 1) {
                    this.player.Move(up, right, down, left, "player");
                } else if (this.Im == 2) {
                    this.cactus.Move(up, right, down, left, "cactus");
                }

            });
            socket.on('idling', () => {
                if (this.Im == 1) {
                    this.player.body.setVelocity(0, 0);
                    this.player.foots.body.setVelocity(0, 0);
                    this.player.Idle(false, false, false, false, "player");
                } else if (this.Im == 2) {
                    this.cactus.body.setVelocity(0, 0);
                    this.cactus.foots.body.setVelocity(0, 0);
                    this.cactus.Idle(false, false, false, false, "cactus");
                }
            });

            //Disparo
            socket.on('shooting', () => {
                if (this.Im == 1) {
                    if (this.shoot.isDown) {
                        if (this.time.now > this.bulletTime) {
                            this.cactus.Shoot("cactus");
                            if (this.cactus.anims.currentFrame.isLast) {
                                this.pullTheTriger(this.cactus);
                            }
                        }
                    }
                } else if (this.Im == 2) {
                    if (this.shoot.isDown) {
                        if (this.time.now > this.bulletTime) {
                            this.player.Shoot("player");
                            if (this.player.anims.currentFrame.isLast) {
                                this.pullTheTriger(this.player);
                            }
                        }
                    }
                }
            });


            socket.on('remove', () => {
                this.text.setText("Waiting for more players");
                this.removePlayer();
            });
        });
    }


    addNewPlayer() {
        this.player = new avatar(this, 600, 350, "player");
        this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.75);
        this.player.body.setOffset(15, 15);
        this.player.anims.play("playerFrontAnimIdle");
        this.physics.add.collider(this.layer, this.player.foots);
    }


    addNewCactus() {
        this.cactus = new avatar(this, 50, 50, "cactus");
        this.cactus.body.setSize(this.cactus.width * 0.4, this.cactus.height * 0.7);
        this.cactus.body.setOffset(14, 15);
        this.cactus.anims.play("cactusFrontAnimIdle");
        this.physics.add.collider(this.layer, this.cactus.foots);
    }


    sendMove() {
        socket.emit('click', { x: x, y: y });
    }

    sendShoot() {
        socket.emit('')
    }
    removePlayer() {
        if (this.Im == 1) {
            this.player.destroy();
            this.player.foots.destroy();
        } else if (this.Im == 2) {
            this.cactus.destroy();
            this.cactus.foots.destroy();
        }
    }




}


// var Client = {};
// Client.socket = io.connect();


// Client.askNewPlayer = function(){
//     Client.socket.emit('newplayer');
// };

// Client.sendClick = function(x,y){
//   Client.socket.emit('click',{x:x,y:y});
// };

// Client.socket.on('newplayer', function (data) {
//     Game.addNewPlayer(data.id, data.x, data.y);
// });

// Client.socket.on('allplayers',function(data){
//     for(var i = 0; i < data.length; i++){
//         Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
//     }

//     Client.socket.on('move',function(data){
//         Game.movePlayer(data.id,data.x,data.y);
//     });

//     Client.socket.on('remove',function(id){
//         Game.removePlayer(id);
//     });
// });







