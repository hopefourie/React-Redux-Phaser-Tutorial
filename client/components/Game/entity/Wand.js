import 'phaser';

export default class Wand extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    //this.flipX = !this.flipX;

    // Set the firing delay (ms)
    this.fireDelay = 100;
    // Keep track of when the gun was last fired
    this.lastFired = 0;
  }

  // Check if the shoot button is pressed and how long its been since we last fired
  update(time, player, cursors, fireLaserFn) {
    if (cursors.space.isDown && time > this.lastFired) {
      if (player.armed) {
        fireLaserFn(); // We'll implement this function in FgScene
        this.lastFired = time + this.fireDelay;
      }
    }
  }
}
