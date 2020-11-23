import 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.playedSound = false;
  }

  // Check which controller button is being pushed and execute movement & animation
  update(goblinBurp) {
    if (!this.playedSound) {
      this.playedSound = true;
      goblinBurp.play();
    }
  }
}
