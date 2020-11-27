import avatar from "../gameObjects/avatar.js";
import bullet from "../gameObjects/bullet.js";
export default class sceneLevel extends Phaser.Scene {
    constructor() {
        super({ key: "sceneLevel" });
    }

    //Quien soy
    Im = 0;

    //La room esta completa
    complete = false;

    //Lag
    Compensator = 1000;

    //Carga en la escena lo requerido
    create() {

        //Iniciar servidor
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

        //Carga animaciones y audio en la escena
        this.BeginAnim();
        this.BeginAudio();

        //Crea variables para los botones a usar
        this.cursor = this.input.keyboard.createCursorKeys();
        this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    //Muestra en pantalla el tiempo restante para disparar
    cooldown() {
        let string;
        if (this.Im == 1) {
            if (this.cactus.bulletTime > this.time.now) {
                string = parseInt((this.cactus.bulletTime - this.time.now) / 1000);

            } else {
                string = "Shoot!";
            }
            this.cooldowntext.setText(string);
        } else if (this.Im == 2) {
            if (this.player.bulletTime > this.time.now) {
                string = parseInt((this.player.bulletTime - this.time.now) / 1000);

            } else {
                string = "Shoot!";
            }
            this.cooldowntext.setText(string);
        }

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
        //socket.close();

    }

    //Mata al Cactus
    destroyBulletCactus() {
        this.bala.destroy();
        this.cactus.Alive = false;
        //socket.close();
    }

    //Se ejecuta todo el tiempo esta función
    update(time, delta) {
        //Muestra el tiempo restante para disparar
        this.cooldown();

        //Compensador de lag
        if ((this.Compensator < this.time.now) && (this.complete)) {
            if (this.Im == 1 && this.complete) {
                socket.player = {
                    type: 1,
                    x: this.cactus.foots.x,
                    y: this.cactus.foots.y
                }
            } else if (this.Im == 2 && this.complete) {
                socket.player = {
                    type: 2,
                    x: this.player.foots.x,
                    y: this.player.foots.y
                }

            }
            socket.emit("compensator", socket.player);
            this.Compensator = this.time.now + 1000;
        }

        //Pone en 0 la velocidad de los avatares
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

        //Matar los avatares
        if (this.complete) {
            if (!this.cactus.Alive) {
                this.cactus.Dead(this, "cactus", 33);
                this.cactus.Alive = true;
                this.scene.start("sceneWin");
                this.SoundTrack.stop();
            }
            if (!this.player.Alive) {
                this.player.Dead(this, "player", 42);
                this.player.Alive = true;
                this.scene.start("sceneWin");
                this.SoundTrack.stop();
            }
        }

        //cactus
        if (this.Im == 1) {

            if(this.cactus.Alive) {
                if (this.shoot.isUp) {
                    let upCactus = false;
                    let rightCactus = false;
                    let downCactus = false;
                    let leftCactus = false;
                    if (this.cursor.up.isDown) {
                        upCactus = true;
                        socket.player = {
                            type: 1,
                            x: 0,
                            y: -50
                        };
                    } else if (this.cursor.right.isDown) {
                        rightCactus = true;
                        socket.player = {
                            type: 1,
                            x: 50,
                            y: 0
                        };
                    } else if (this.cursor.down.isDown) {
                        downCactus = true;
                        socket.player = {
                            type: 1,
                            x: 0,
                            y: 50
                        };
                    } else if (this.cursor.left.isDown) {
                        leftCactus = true;
                        socket.player = {
                            type: 1,
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
                    if (this.time.now > this.cactus.bulletTime) {
                        socket.emit('shoot');
                        this.cactus.Shoot("cactus");
                        if (this.cactus.anims.currentFrame.isLast) {
                            this.pullTheTriger(this.cactus, true);
                        }
                    }
                }

            }
        }

        //vaquero
        if (this.Im == 2) {
            if (this.player.Alive) {
                if (this.shoot.isUp) {
                    let upPlayer = false;
                    let rightPlayer = false;
                    let downPlayer = false;
                    let leftPlayer = false;
                    if (this.cursor.up.isDown) {
                        upPlayer = true;
                        socket.player = {
                            type: 2,
                            x: 0,
                            y: -50
                        };
                    } else if (this.cursor.right.isDown) {
                        rightPlayer = true;
                        socket.player = {
                            type: 2,
                            x: 50,
                            y: 0
                        };
                    } else if (this.cursor.down.isDown) {
                        downPlayer = true;
                        socket.player = {
                            type: 2,
                            x: 0,
                            y: 50
                        };
                    } else if (this.cursor.left.isDown) {
                        leftPlayer = true;
                        socket.player = {
                            type: 2,
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
                    if (this.time.now > this.player.bulletTime) {
                        socket.emit('shoot');
                        this.player.Shoot("player");
                        if (this.player.anims.currentFrame.isLast) {
                            this.pullTheTriger(this.player, true);
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
    pullTheTriger(name, mI) {

        this.Shoot.play();
        this.bala = new bullet(this, this.bulletX(name), this.bulletY(name), "bullet");
        this.bala.body.setOffset(0, 200);
        this.bala.Move(name);
        this.physics.add.collider(this.bala, this.player, this.destroyBulletPlayer, null, this);
        this.physics.add.collider(this.bala, this.cactus, this.destroyBulletCactus, null, this);
        if (mI) {
            if (this.Im == 1) {
                this.cactus.bulletTime = this.time.now + 2000;
            } else if (this.Im == 2) {
                this.player.bulletTime = this.time.now + 2000;
            }
        }
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
            frameRate: 4
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
            frameRate: 4
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
            frameRate: 4
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

    //Lo que concierne a el multijugador
    beginClient() {
        //Emite al servido que entraste
        socket.emit('newplayer');

        //Carga un jugador nuevo
        socket.on('newplayer', (data) => {
            this.text.setText("");
            this.complete = true;
            if (data.type == 1) {
                this.addNewCactus();
                this.player.setX(600)
                this.player.setY(350)
                this.player.foots.setX(600);
                this.player.foots.setY(350);
            } else {
                this.addNewPlayer();
                this.cactus.setX(50)
                this.cactus.setY(50)
                this.cactus.foots.setX(50);
                this.cactus.foots.setY(50);
            }
        });

        //Carga los personajes que ya estan en la partida
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
                if (i == 1) {
                    this.complete = true;
                }
            }

            //Recibe los movimientos del otro jugador
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
                if (this.Im == 1) {
                    this.player.Move(up, right, down, left, "player");
                } else if (this.Im == 2) {
                    this.cactus.Move(up, right, down, left, "cactus");
                }

            });

            //Recibe si el otro personaje esta quieto
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
            socket.on('shooting', (pData) => {
                if (this.Im == 1) {
                    this.shootPlayer();
                } else if (this.Im == 2) {
                    this.shootCactus();
                }
            });

            //Remueve al otro jugador al desconectarse
            socket.on('remove', () => {
                this.text.setText("Waiting for more players");
                this.removePlayer();
                this.complete = false;
            });

            //Para el lag
            socket.on('compensation', (pData) => {
                if (this.Im == 1) {
                    // this.player.x = pData.x;
                    // this.player.y = pData.y;
                    this.player.foots.x = pData.x;
                    this.player.foots.y = pData.y;
                } else if (this.Im == 2) {
                    // this.cactus.x = pData.x;
                    // this.cactus.y = pData.y;
                    this.cactus.foots.x = pData.x;
                    this.cactus.foots.y = pData.y;
                }
            });
        });
    }

    //Disparo del cactus
    shootCactus() {
        this.cactus.Shoot("cactus");
        if (this.cactus.anims.currentFrame.isLast) {
            this.pullTheTriger(this.cactus, false);

        }
    }

    //Disparo del vaquero
    shootPlayer() {
        this.player.Shoot("player");
        console.log(this.player.anims.currentFrame)
        if (this.player.anims.currentFrame.isLast) {
            console.log("entre al disparo del player remoto");
            this.pullTheTriger(this.player, false);

        }
    }

    //Añade un nuevo vaquero a la partida
    addNewPlayer() {
        this.player = new avatar(this, 600, 350, "player");
        this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.75);
        this.player.body.setOffset(15, 15);
        this.player.anims.play("playerFrontAnimIdle");
        this.physics.add.collider(this.layer, this.player.foots);
    }

    //Añade un nuevo cactus a la partida
    addNewCactus() {
        this.cactus = new avatar(this, 50, 50, "cactus");
        this.cactus.body.setSize(this.cactus.width * 0.4, this.cactus.height * 0.7);
        this.cactus.body.setOffset(14, 15);
        this.cactus.anims.play("cactusFrontAnimIdle");
        this.physics.add.collider(this.layer, this.cactus.foots);
    }

    //Elimina jugadores que se salieron sin razon
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








