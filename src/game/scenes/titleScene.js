import Phaser from 'phaser';
import config from '../config';
import Button from '../objects/button'
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }
  create () {
    // Game
    this.gameButton = new Button(this, config.width/2, config.height/2 -20, 'blueButton1', 'blueButton2', 'Play Level 1', 'LevelOne');
    this.text = this.add.text(config.width/2 -55, config.height/2 + 25, 'Use WASD to Move', { fontSize: 12 });
    this.text2 = this.add.text(config.width/2 -55, config.height/2 + 40, 'Collect the Keys', { fontSize: 12 });
    this.text3 = this.add.text(config.width/2 -55, config.height/2 + 55, 'Unlock the Doors', { fontSize: 12 });
    this.text4 = this.add.text(config.width/2 -55, config.height/2 + 70, 'Get to the Stairs', { fontSize: 12 });

    

  }
}
