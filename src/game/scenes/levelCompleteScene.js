import Phaser from 'phaser';
import config from '../config';
import Button from '../objects/button'
import { levelCompleteMsg, timeIsBetter } from '../../js/apiRoutes'
import { currentUserName } from '../..';

export let topTime = 0;
export let newTime = 0;

export default class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super('LevelComplete');
  }
  create () {
    // Game
    // let timeIsBetter = false;
    // let levelCompleteMsg = [`35.000 Seconds`, `45.000 Seconds`];
    if(currentUserName) {
        if(timeIsBetter) {
            this.text = this.add.text(config.width/2 -73, config.height/2 + 22, `New Top Time!!`, { fontSize: 18 });
            this.text2 = this.add.text(config.width/2 -25, config.height/2 + 47, levelCompleteMsg[0], { fontSize: 12 });
            this.text3 = this.add.text(config.width/2 -81, config.height/2 + 62, `Former Top Time`, { fontSize: 18 });
            this.text4 = this.add.text(config.width/2 -25, config.height/2 + 87, levelCompleteMsg[1], { fontSize: 12 });
        } else if (levelCompleteMsg[1]){
            this.text = this.add.text(config.width/2 -52, config.height/2 + 22, `New Time:`, { fontSize: 18 });
            this.text2 = this.add.text(config.width/2 -25, config.height/2 + 47, levelCompleteMsg[0], { fontSize: 12 });
            this.text3 = this.add.text(config.width/2 -111, config.height/2 + 62, `Doesn't Beat Top Time:`, { fontSize: 18 });
            this.text4 = this.add.text(config.width/2 -25, config.height/2 + 87, levelCompleteMsg[1], { fontSize: 12 });
        } else {
            this.text = this.add.text(config.width/2 -88, config.height/2 + 22, `First Time logged:`, { fontSize: 18 });
            this.text2 = this.add.text(config.width/2 -25, config.height/2 + 47, levelCompleteMsg[0], { fontSize: 12 });
        }
    } else {
        this.text = this.add.text(config.width/2 -73, config.height/2 + 22, `Please Login`, { fontSize: 18 });
        this.text = this.add.text(config.width/2 -73, config.height/2 + 42, `To Track Time`, { fontSize: 18 });
    }

    this.gameButton = new Button(this, config.width/2, config.height/2 -20, 'blueButton1', 'blueButton2', 'Retry Level 1', 'LevelOne');


  }
}

