import 'phaser';
import Player from '../entity/Player';
import Ground from '../entity/Ground';

export default class ExampleScene extends Phaser.Scene {
  preload() {
    // Preload Sprites
    this.load.image('woods', './assets/backgrounds/woods.png');
    this.load.spritesheet('newt', 'assets/spriteSheets/newt.png', {
      frameWidth: 118.1,
      frameHeight: 131,
    });
    this.load.image('ground', 'assets/sprites/ground.png');
    this.load.image('mainGround', 'assets/sprites/mainGround.png');
  }
  createGround(x, y) {
    this.groundGroup.create(x, y, 'ground');
  }
  createAnimations() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('newt', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'leftJump',
      frames: [{ key: 'newt', frame: 2 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'newt', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'rightJump',
      frames: [{ key: 'newt', frame: 6 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('newt', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }
  create() {
    this.cameras.main.setBounds(0, 0, 4330, 600);
    this.physics.world.setBounds(0, 0, 4330, 600);

    // Create Sprites
    this.add.image(-160, 0, 'woods').setOrigin(0).setScale(0.5);

    this.player = new Player(this, 20, 400, 'newt').setScale(0.5);

    this.player.setBounce(0.2);
    this.player.body.setGravityY(350);
    this.player.setCollideWorldBounds(true);

    this.createAnimations();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });

    this.createGround(160, 100);
    this.createGround(600, 510);
    this.groundGroup.create(250, 350, 'ground');
    this.groundGroup.create(530, 200, 'ground');
    this.groundGroup.create(160, 620, 'mainGround');

    this.physics.add.collider(this.player, this.groundGroup);

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
  }

  update(time, delta) {
    this.player.update(this.cursors);
  }
}
