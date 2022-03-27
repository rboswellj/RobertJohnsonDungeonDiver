import Phaser from 'phaser';
import axios from 'axios';
import {updateTopTime, updateState} from '../js/apiRoutes';
import {printKeys, rankUsers, currentUserInfo} from '../index'

class levelOne extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    init() {
        this.playerSpeed = 280;
        this.timer;
        this.deaths = 0;
        this.endTime;
        this.keyCount = 0;
        this.gameWidth = this.sys.game.config.width;
        this.gameHeight = this.sys.game.config.height;
        this.user = 'jstarr';
        this.levelName = 'level1';
        printKeys(0);
    }

    preload ()
    {
        this.load.image('gameTiles', './src/assets/Tiles.png');
        this.load.tilemapTiledJSON('tilemap', './src/assets/dungeon1.json');
        this.load.spritesheet('player', './src/assets/playerSpriteSheet.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('goal', './src/assets/goal.png');
        this.load.image('door', './src/assets/door.png');
        this.load.image('key', './src/assets/key.png');
    }
      
    create ()
    {
    // Map and tiles

    // Load in tileset
    const map = this.make.tilemap({ key: 'tilemap' });
    const tileset = map.addTilesetImage('dungeon', 'gameTiles');
    // Tileset Layers
    this.ground = map.createLayer('ground', tileset);
    this.outWalls = map.createLayer('outerWalls', tileset);
    this.inWalls = map.createLayer('innerWalls', tileset);

    // Map Objects
    this.goal = this.physics.add.staticSprite(this.gameWidth / 2 + 8, this.gameHeight / 2 -8, 'goal');
    this.goal.body.setSize(40,40);
    this.door1 = this.physics.add.staticSprite(this.gameWidth / 2 , this.gameHeight / 2 + 72, 'door');     
    this.door2 = this.physics.add.staticSprite(this.gameWidth / 2 , this.gameHeight / 2 + 25, 'door');
    this.key1 = this.physics.add.staticSprite(280, 280, 'key');
    this.key1.body.setSize(30,30);
    this.key2 = this.physics.add.staticSprite(225, 210, 'key');
    this.key2.body.setSize(30,30);

    // Payer
    this.player = this.physics.add.sprite(186, 278, 'player');
    this.player.setScale(1.6);
    this.player.body.setSize(4, 8);

    // Colliders and Physics
    //key 1
    this.physics.add.overlap(this.player, this.key1, this.getKey, null, this);
    // key 2
    this.physics.add.overlap(this.player, this.key2, this.getKey, null, this);
    // goal
    this.physics.add.overlap(this.player, this.goal, this.levelComplete, null, this);
    // door 1
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

    // Timer
    // Timer
    this.timer = this.time.addEvent({
        delay: 999999,
        paused: true
    });

    this.text = this.add.text(20, 30, '', { fill: '#00FFFF', font: 'bold 18px system-ui' })
      .setShadow(2, 2, '#00205B', 8);
  

    this.timer.paused = false;
    this.elapsed = this.timer.getElapsedSeconds().toFixed(1);

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
        this.player.body.setVelocityY(0);
        this.player.anims.play('right', true);
    }
    
    // left
    else if(this.cursors.left.isDown) {
        this.player.body.setVelocityX(-this.playerSpeed);
        this.player.body.setVelocityY(0);
        this.player.anims.play('left', true);
    }
    
    // down
    else if(this.cursors.down.isDown) {
        this.player.body.setVelocityY(this.playerSpeed);
        this.player.body.setVelocityX(0);
        this.player.anims.play('down', true);
    }
    
    // up
    else if(this.cursors.up.isDown) {
        this.player.body.setVelocityY(-this.playerSpeed);
        this.player.body.setVelocityX(0);
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
    .setText(this.timer.getElapsedSeconds().toFixed(3));

    }

    getKey (player, key) {
        key.disableBody(true, true);
        this.keyCount++;
        printKeys(this.keyCount);
        console.log(`Key picked up at ${this.timer.getElapsedSeconds().toFixed(1)}`);
        console.log('keys: ' + this.keyCount);
    }

    openDoor (player, door) {
        if(this.keyCount > 0) {
            this.keyCount--;
            printKeys(this.keyCount);
            door.disableBody();
            door.destroy();
            console.log(`door opened at ${this.timer.getElapsedSeconds().toFixed(1)}`);
        }
    }

    async levelComplete(player, goal) {
        goal.disableBody(true, true);
        console.log('Goal reached');
        this.timer.paused = true;
        this.endTime = this.timer.getElapsedSeconds().toFixed(3);
        console.log(`End Time: ${this.endTime}`);
        await updateTopTime(this.user, this.levelName, this.endTime, this.deaths);
        await rankUsers();
        await currentUserInfo();
        return;

        // collect score data
        // display score data
        // check against any saved data for level/player
        // upload score data if better than last score
        // prompt retry, next level
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
            debug: false,
            gravity: 0
        }
    },
    scene: levelOne
};

const game = new Phaser.Game(config);

export default levelOne;
