import 'phaser';

export default class Ground extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
  }

  // Check which controller button is being pushed and execute movement & animation
  update() {
    // << INSERT CODE HERE >>
  }
}
