import 'phaser';

export default class Firefly extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.playedSound = false;
    this.body.setAllowGravity(false);
  }

  update(twinkle) {
    // Phaser.Actions.RotateAroundDistance(
    //   this,
    //   { x: this.x, y: this.y },
    //   0.02,
    //   10
    // );
    if (!this.playedSound) {
      this.playedSound = true;
      twinkle.play();
    }
  }
}
