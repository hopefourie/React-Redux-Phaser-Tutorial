import Player from '../../entity/Player';
import Ground from '../../entity/Ground';

export default class FgScene extends Phaser.Scene {
  preload() {
    // Preload Sprites
    this.load.spritesheet('josh', 'assets/spriteSheets/josh.png', {
      frameWidth: 340,
      frameHeight: 460,
    });
    this.load.image('ground', 'assets/sprites/ground.png');

    // Preload Sounds
    // << LOAD SOUNDS HERE >>
  }

  createGround(x, y) {
    this.groundGroup.create(x, y, 'ground');
  }

  create() {
    // Create game entities
    this.player = new Player(this, 20, 400, 'josh').setScale(0.25);

    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });

    this.createGround(160, 540);
    this.createGround(600, 540);

    // Create sounds
    // << CREATE SOUNDS HERE >>

    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>
  }
}
