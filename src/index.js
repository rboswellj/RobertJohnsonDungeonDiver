import Phaser from 'phaser';

class levelOne extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    init() {
        this.playerSpeed = 300;
        this.timer;
        this.deaths;
        this.score;
        this.startTime;
        this.endTime;
    }

    preload ()
    {
        //load tilemap file
        this.load.image('gameTiles', './src/assets/Tiles.png');
        this.load.tilemapTiledJSON('tilemap', './src/assets/dungeon1.json');
        // this.load.image('player', './src/assets/player.png');
        this.load.spritesheet('player', './src/assets/playerSpriteSheet.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('goal', './src/assets/goal.png');
        this.load.image('door', './src/assets/door.png');
        this.load.image('key', './src/assets/key.png');
    }
      
    create ()
    {
        this.keyCount = 0;
        // create the Tilemap
	    const map = this.make.tilemap({ key: 'tilemap' })

        // add the tileset image we are using
	    const tileset = map.addTilesetImage('dungeon', 'gameTiles')

        // create the layers we want in the right order
	    this.ground = map.createLayer('ground', tileset);

        this.outWalls = map.createLayer('outerWalls', tileset);

        this.inWalls = map.createLayer('innerWalls', tileset);

        this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;


        // Goal
        this.goal = this.physics.add.staticSprite(this.gameWidth / 2 + 8, this.gameHeight / 2 -8, 'goal');
        this.goal.setScale(1);
        
        // Door 1
        this.door1 = this.physics.add.staticSprite(this.gameWidth / 2 , this.gameHeight / 2 + 72, 'door');

        // Door 2
        this.door2 = this.physics.add.staticSprite(this.gameWidth / 2 , this.gameHeight / 2 + 25, 'door');

        // key 1
        this.key1 = this.physics.add.staticSprite(280, 280, 'key');

        // key 2
        this.key2 = this.physics.add.staticSprite(225, 210, 'key')

        // Player
        this.player = this.physics.add.sprite(186, 278, 'player');
        this.player.setScale(1.6);
        this.player.body.setSize(8, 8);
        this.player.setCollideWorldBounds(true);


        // Colliders

        //key 1
        this.physics.add.overlap(this.player, this.key1, this.getKey, null, this);
        // key 2
        this.physics.add.overlap(this.player, this.key2, this.getKey, null, this);
        // goal
        this.physics.add.overlap(this.player, this.goal, this.levelComplete, null, this);
        // // door 1
        this.physics.add.collider(this.player, this.door1, null, function(){
            if(this.keyCount > 0 ) {
                this.openDoor(this.player, this.door1);
            } else {
                console.log('Door Locked, zero keys collected');
            }
        }, this);
        // door 2
        this.physics.add.collider(this.player, this.door2, null, function(){
            if(this.keyCount > 0 ) {
                this.openDoor(this.player, this.door2);
            } else {
                console.log('Door Locked, zero keys collected');
            }
        }, this);

        // Outer Walls
        this.outWalls.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.outWalls);

        // Inner Walls
        // this.physics.world.enable(this.inWalls);
        this.inWalls.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, this.inWalls);

        this.player.body.setVelocity(0);

        

        // Timer
        this.timer = this.time.addEvent({
            delay: 999999,
            paused: true
        });

        this.input.on('pointerdown', function () {
            timer.paused = !timer.paused;
          });

        this.text = this.add.text(20, 30, '', { fill: '#00FFFF', font: 'bold 18px system-ui' })
          .setShadow(2, 2, '#00205B', 8);
      

        this.timer.paused = false;
        this.elapsed = this.timer.getElapsedSeconds().toFixed(1);
        
        console.log(this.elapsed);        
        
        // Animation

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update() {

        // Key Bindings

        //right
        if(this.cursors.right.isDown) {
            this.player.body.setVelocityX(this.playerSpeed);
            this.player.anims.play('right', true);
        }
        
        // left
        else if(this.cursors.left.isDown) {
            this.player.body.setVelocityX(-this.playerSpeed);
            this.player.anims.play('left', true);
        }
        
        // down
        else if(this.cursors.down.isDown) {
            this.player.body.setVelocityY(this.playerSpeed);
            this.player.anims.play('down', true);
        }
        
        // up
        else if(this.cursors.up.isDown) {
            this.player.body.setVelocityY(-this.playerSpeed);
            this.player.anims.play('up', true);
        }

        // idle
        else {
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
            this.player.anims.play('idle', true);
        }
        

        // Normalize and scale velocity. Keeps from moving faster diagonally
        this.player.body.velocity.normalize().scale(this.playerSpeed);

        this.text
        .setFill(this.timer.paused ? '#FFFF00' : '#00FFFF')
        .setText(this.timer.getElapsedSeconds().toFixed(1));

    }

    getKey (player, key) {
        key.disableBody(true, true);
        this.keyCount++
        console.log(`Key picked up at ${this.timer.getElapsedSeconds().toFixed(1)}`);
        console.log('keys: ' + this.keyCount);
    }

    openDoor (player, door) {
        if(this.keyCount > 0) {
            this.keyCount--;
            door.disableBody();
            door.destroy();
            console.log(`door opened at ${this.timer.getElapsedSeconds().toFixed(1)}`);
        }
    }

    levelComplete(player, goal) {
        goal.disableBody(true, true);
        console.log('Goal reached');
        this.timer.paused = true;
        this.endTime = this.timer.getElapsedSeconds();
        console.log(`End Time: ${this.endTime}`);
        return;

        // collect score data
        // display score data
        // check against any saved data for level/player
        // upload score data if better than last score
        // prompt retry, next level
    }

    

    stopTimer() {
      
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 320,
    height: 320,
    physics: { 
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: 0
        }
    },
    scene: levelOne
};

const game = new Phaser.Game(config);


