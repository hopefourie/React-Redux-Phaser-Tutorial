/** @type {import("../typings/phaser")} */
/* The above loads the phaser.d.ts file so that VSCode has autocomplete for the Phaser API.
If you experience problems with autocomplete, try opening the phaser.d.ts file and scrolling up and down in it.
That may fix the problem -- some weird quirk with VSCode. A new typing file is released with
every new release of Phaser. Make sure it's up-to-date!

At some point, the typings will
be officially added to the official release so that all you'll have to do is do:

npm install @types/phaser

But this hasn't happened yet!
*/

// Bring in all the scenes
import ExampleScene from './scenes/ExampleScene';
import MainScene from './scenes/MainScene';
import BgScene from './scenes/scene1/BgScene';
import FgScene from './scenes/scene1/FgScene';
import 'phaser';
import React from 'react';

export default class Game extends React.Component {
  // constructor() {
  //   super();
  //   // Add all the scenes
  //   this.scene.add('BgScene', BgScene);
  //   this.scene.add('FgScene', FgScene);
  //   this.scene.add('MainScene', MainScene);

  //   // Start the game with the mainscene
  //   this.scene.start('MainScene');
  // }
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
      scene: [ExampleScene],
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
// Create new instance of game
// window.onload = function () {
//   window.game = new Game();
// };
