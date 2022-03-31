import Phaser from 'phaser';
import config from './config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import LevelOneScene from './scenes/LevelOneScene';
import LevelOneComplete from './scenes/LevelCompleteScene'
import Model from './model';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Game', GameScene);
    this.scene.add('LevelOne', LevelOneScene);
    this.scene.add('LevelOneComplete', LevelOneComplete);
    this.scene.start('Boot');
  }
}
window.game = new Game();

export default Game;