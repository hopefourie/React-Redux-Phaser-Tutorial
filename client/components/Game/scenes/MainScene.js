import 'phaser';
import Player from '../entity/Player';
import Ground from '../entity/Ground';
import Enemy from '../entity/Enemy';
import Wand from '../entity/Wand';
import Laser from '../entity/Laser';
import store, { UPDATE_SCORE } from '../../../store';
import Firefly from '../entity/Firefly';
export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.collectWand = this.collectWand.bind(this);
    this.fireLaser = this.fireLaser.bind(this);
    this.hit = this.hit.bind(this);
    this.score = 0;
    this.createGround = this.createGround.bind(this);
  }
  preload() {
    // Preload Sprites
    this.load.image('woods', './assets/backgrounds/woods.png');
    this.load.spritesheet('newt', 'assets/spriteSheets/newt.png', {
      frameWidth: 118.1,
      frameHeight: 131,
    });
    this.load.image('gremlin', 'assets/sprites/gremlin.png');
    this.load.image('ground', 'assets/sprites/ground.png');
    this.load.image('mainGround', 'assets/sprites/mainGround.png');
    this.load.spritesheet('wand', 'assets/spritesheets/wand.png', {
      frameWidth: 63,
      frameHeight: 45,
    });
    this.load.image('laserBolt', 'assets/sprites/laserBolt.png');
    this.load.audio('jump', 'assets/audio/jump.wav');
    this.load.audio('laser', 'assets/audio/laser.wav');
    this.load.audio('goblinBurp', 'assets/audio/goblinBurp.mp3');
    this.load.image('firefly', 'assets/sprites/firefly.png');
  }

  //CREATE GROUND HELPER FUNC
  createGround(x, y) {
    for (let i = 0; i < 6; i++) {
      this.groundGroup.create(x, y, 'ground');
      x += 700;
    }
  }

  //CREATE FIREFLIES HELPER FUNC
  createFireflies(x, y) {
    for (let i = 0; i < 6; i++) {
      this.fireflies.create(x, y, 'firefly');
      x += 700;
    }
  }

  //ANIMATIONS
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
    this.anims.create({
      key: 'wandHand',
      frames: [{ key: 'newt', frame: 9 }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'shine',
      frames: this.anims.generateFrameNumbers('wand', { start: 0, end: 1 }),
      frameRate: 5,
    });
  }

  //CREATE
  create() {
    //set up camera and world bounds
    this.cameras.main.setBounds(0, 0, 4330, 600);
    this.physics.world.setBounds(0, 0, 4330, 600);

    //background
    this.add.image(-160, 0, 'woods').setOrigin(0).setScale(0.5);

    //player
    this.player = new Player(this, 20, 400, 'newt').setScale(0.5);

    this.player.setBounce(0.2);
    this.player.body.setGravityY(350);
    this.player.setCollideWorldBounds(true);

    this.createAnimations();

    //enemy
    this.enemy = new Enemy(this, 600, 400, 'gremlin').setScale(0.5);

    //wand
    this.wand = new Wand(this, 300, 400, 'wand').setScale(0.5);

    //lasers
    this.lasers = this.physics.add.group({
      classType: Laser,
      runChildUpdate: true,
      allowGravity: false,
      maxSize: 40,
    });

    //cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //platforms
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });

    this.createGround(160, 100);
    this.createGround(250, 350);
    this.createGround(530, 200);
    this.createGround(600, 510);

    //hat platform
    this.groundGroup.create(4100, 100, 'ground');

    //floor
    this.groundGroup.create(160, 620, 'mainGround');

    //fireflies
    this.fireflies = this.physics.add.group({ classType: Firefly });

    for (var i = 0; i < 80; i++) {
      let x = Phaser.Math.RND.between(0, 4500);
      let y = Phaser.Math.RND.between(0, 600);

      this.fireflies.create(x, y, 'firefly');
    }

    this.fireflies.children.iterate((child) => {
      child.body.setAllowGravity(false);
      child.setScale(0.1, 0.1);
    });

    //sounds
    this.jumpSound = this.sound.add('jump');
    this.jumpSound.volume = 0.5;
    this.laserSound = this.sound.add('laser');
    this.goblinBurp = this.sound.add('goblinBurp');
    this.goblinBurp.volume = 0.5;

    //colliders
    this.physics.add.collider(this.fireflies, this.groundGroup);
    this.physics.add.collider(this.wand, this.groundGroup);
    this.physics.add.collider(this.player, this.groundGroup);
    this.physics.add.collider(this.enemy, this.groundGroup);
    this.physics.add.collider(this.player, this.enemy);

    //overlap
    this.physics.add.overlap(
      this.player,
      this.wand,
      this.collectWand,
      null,
      this
    );

    this.physics.add.overlap(this.lasers, this.enemy, this.hit, null, this);

    //set camera on player
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
  }

  collectWand(player, wand) {
    wand.disableBody(true, true);
    this.player.armed = true;
  }
  fireLaser(x, y, left) {
    const offsetX = 56;
    const offsetY = 14;
    const laserX =
      this.player.x + (this.player.facingLeft ? -offsetX : offsetX);
    const laserY = this.player.y + offsetY;
    let laser = this.lasers.getFirstDead();
    if (!laser) {
      laser = new Laser(
        this,
        laserX,
        laserY,
        'laserBolt',
        this.player.facingLeft
      );
      this.lasers.add(laser);
    }
    laser.reset(laserX, laserY, this.player.facingLeft);
  }
  hit(enemy, laser) {
    laser.setActive(false);
    laser.setVisible(false);
    enemy.disableBody(true);
    enemy.setVisible(false);
    this.enemy.update(this.goblinBurp);
    this.score += 100;
    store.dispatch({ type: UPDATE_SCORE, score: this.score });
  }

  update(time, delta) {
    //call player update
    this.player.update(this.cursors, this.jumpSound);
    this.wand.update(
      time,
      this.player,
      this.cursors,
      this.fireLaser,
      this.laserSound
    );
    //this.fireflies.getChildren().update();
  }
}
