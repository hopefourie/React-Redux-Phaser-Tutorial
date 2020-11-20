import 'phaser';

export default class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, facingLeft) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.facingLeft = facingLeft;
    //bolt speed
    this.speed = Phaser.Math.GetSpeed(400, 1); // (distance in pixels, time (ms))

    //lifespan
    this.lifespan = 900;
    this.body.setAllowGravity(false);
    this.reset(x, y, facingLeft);
  }

  reset(x, y, facingLeft) {
    this.setActive(true);
    this.setVisible(true);
    this.lifespan = 900;
    this.facingLeft = facingLeft;
    this.setPosition(x, y);
  }

  // Check which direction the player is facing and move the laserbolt in that direction as long as it lives
  update(time, delta) {
    this.lifespan -= delta;
    const moveDistance = this.speed * delta;
    if (this.facingLeft) {
      this.x -= moveDistance;
    } else {
      this.x += moveDistance;
    }
    // If this laser has run out of lifespan, we "kill it" by deactivating it.
    // We can then reuse this laser object
    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
