import Phaser from 'phaser';

export default class WinScene extends Phaser.Scene {
  constructor() {
    super('WinScene');
  }

  preload() {
    this.load.image('newtHat', './assets/sprites/newtHat.png');
  }

  create() {
    //Popup box
    this.popup = this.add.graphics();
    this.popup.lineStyle(1, 0x2a275c);
    this.popup.fillStyle(0x7c8d99, 0.5);
    this.popup.strokeRect(25, 25, 750, 550);
    this.popup.fillRect(25, 25, 750, 550);

    //start button square
    this.button = this.add.graphics();
    this.button.lineStyle(1, 0x2a275c);
    this.button.fillStyle(0xf6d304, 0.5);
    this.button.strokeRect(300, 465, 200, 50);
    this.button.fillRect(300, 465, 200, 50);

    this.add.image(212.5, 220, 'newtHat').setOrigin(0.5);
    this.add
      .text(400, 100, 'You Won!', {
        fill: '#2a275c',
        fontSize: '50px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(550, 220, 'You fought off the goblins and got your hat back!', {
        fill: '#CED4D6',
        fontSize: '25px',
        fontStyle: 'bold',
        align: 'left',
        wordWrap: { width: 380, height: 445, useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    this.add
      .text(400, 340, 'Enter your score above to be added to the leaderboard', {
        fill: '#CED4D6',
        fontSize: '25px',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: 520, height: 445, useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    this.playAgain = this.add
      .text(400, 490, 'Play Again', {
        fill: '#2A275C',
        fontSize: '30px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    this.playAgain.setInteractive();
    this.playAgain.on(
      'pointerdown',
      () => {
        this.scene.stop('OpeningScene');
      },
      this
    );
  }
}
