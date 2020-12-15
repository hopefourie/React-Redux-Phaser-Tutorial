/** @type {import("../typings/phaser")} */

// Bring in all the scenes
import MainScene from './scenes/MainScene';
import OpeningScene from './scenes/OpeningScene';
import WinScene from './scenes/WinScene';
import 'phaser';
import React from 'react';

export default class Game extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1500 },
          debug: false,
        },
      },
      scale: {
        parent: 'game-container',
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      },
      scene: [MainScene, OpeningScene, WinScene],
    };
    new Phaser.Game(config);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <div id="phaser-game" />;
  }
}
