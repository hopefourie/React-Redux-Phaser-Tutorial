import 'phaser';

export default class Hat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.playedSound = false;
  }

  // Check which controller button is being pushed and execute movement & animation
  update(success) {
    if (!this.playedSound) {
      this.playedSound = true;
      success.play();
    }
  }
}
