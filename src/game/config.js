import Phaser from "phaser";

export default {
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
    }
};