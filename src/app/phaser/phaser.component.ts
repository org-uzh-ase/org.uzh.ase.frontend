import { Component, OnInit } from '@angular/core';
import * as Phaser from "phaser";
import {CONFIG} from './CONFIG';


@Component({
  selector: 'app-phaser',
  templateUrl: './phaser.component.html',
  styleUrls: ['./phaser.component.sass']
})

export class PhaserComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = CONFIG;
    this.config.scene = [SpaceScene];
   }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }
}

class SpaceScene extends Phaser.Scene{
  player;
  aliens;
bullets;
bulletTime = 0;
cursors;
fireButton;
explosions;
starfield;
score = 0;
scoreString = '';
 scoreText;
 lives;
 enemyBullets;
 firingTimer = 0;
 stateText;
 livingEnemies = [];

  preload(){
    this.load.image('bullet', '../assets/invaders/bullet.png');
    this.load.image('enemyBullet', 'assets/invaders/enemy-bullet.png');
    this.load.spritesheet('invader', 'assets/invaders/invader32x32x4.png', {frameWidth: 32, frameHeight: 32});
    this.load.image('ship', 'assets/invaders/player.png');
    this.load.spritesheet('kaboom', 'assets/invaders/explode.png', {frameWidth:128, frameHeight: 128});
    this.load.image('starfield', 'assets/invaders/starfield.png');
    this.load.image('background', 'assets/invaders/background2.png');
  }

  create(){
  //  The scrolling starfield background
  this.starfield = this.add.tileSprite(400, 300, 800, 600, 'starfield');
  
  //  The baddies!
  this.aliens = this.add.group();
  this.aliens.enableBody = true;
  this.aliens.physicsBodyType = Phaser.Physics.Arcade;

  this.createAliens();

  //  Our bullet group
  this.bullets = this.add.group();
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.Arcade;
  this.bullets.createMultiple(30, 'bullet');
  this.bullets.forEach('anchor.x', 0.5);
  this.bullets.forEach('anchor.y', 1);
  this.bullets.forEach('outOfBoundsKill', true);
  this.bullets.forEach('checkWorldBounds', true);

  // The enemy's bullets
  this.enemyBullets = this.add.group();
  this.enemyBullets.enableBody = true;
  this.enemyBullets.physicsBodyType = Phaser.Physics.Arcade;
  this.enemyBullets.createMultiple(30, 'enemyBullet');
  this.enemyBullets.setAll('anchor.x', 0.5);
  this.enemyBullets.setAll('anchor.y', 1);
  this.enemyBullets.setAll('outOfBoundsKill', true);
  this.enemyBullets.setAll('checkWorldBounds', true);

  //  The hero!
  this.player = this.add.sprite(400, 500, 'ship');
  this.player.anchor.setTo(0.5, 0.5);
 // this.physics.enable(this.player, Phaser.Physics.Arcade);

  //  The score
  this.scoreString = 'Score : ';
  this.scoreText = this.add.text(10, 10, this.scoreString + this.score, { font: '34px Arial', fill: '#fff' });

  //  Lives
  this.lives = this.add.group();
  this.add.text(CONFIG.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

  //  Text
  this.stateText = this.add.text(10, 10,' ', { font: '84px Arial', fill: '#fff' });
  this.stateText.anchor.setTo(0.5, 0.5);
  this.stateText.visible = false;

  for (var i = 0; i < 3; i++) 
  {
      var ship = this.lives.create(CONFIG.width - 100 + (30 * i), 60, 'ship');
      ship.anchor.setTo(0.5, 0.5);
      ship.angle = 90;
      ship.alpha = 0.4;
  }

  //  An explosion pool
  this.explosions = this.add.group();
  this.explosions.createMultiple(30, 'kaboom');
  this.explosions.forEach(this.setupInvader, this);

  //  And some controls to play the game with
  this.cursors = this.input.keyboard.createCursorKeys();
  this.fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
}

createAliens () {

  for (var y = 0; y < 4; y++)
  {
      for (var x = 0; x < 10; x++)
      {
          var alien = this.aliens.create(x * 48, y * 50, 'invader');
          alien.setScale(1.25);
          //alien.anims.create('fly', [ 0, 1, 2, 3 ], 20, true);
          //alien.play('fly');
          //alien.body.moves = false;
      }
  }

  this.aliens.x = 100;
  this.aliens.y = 50;

  //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
  var tween = this.add.tween({
   targets: this.aliens,
   x: 200,
   duration: 2000,
   autoStart: true,
   delay: 0,
   repat: 1000,
   yoyo: true
  });

  //  When the tween loops it calls descend
  tween.on('loop', this.descend);
}

setupInvader (invader) {

  invader.anchor.x = 0.5;
  invader.anchor.y = 0.5;
  invader.animations.add('kaboom');

}

descend() {

  this.aliens.y += 10;

}

update() {

  //  Scroll the background
  this.starfield.tilePosition.y += 2;

  if (this.player.alive)
  {
      //  Reset the player, then check for movement keys
      this.player.body.velocity.setTo(0, 0);

      if (this.cursors.left.isDown)
      {
        this.player.body.velocity.x = -200;
      }
      else if (this.cursors.right.isDown)
      {
        this.player.body.velocity.x = 200;
      }

      //  Firing?
      if (this.fireButton.isDown)
      {
        this.fireBullet();
      }

      if (this.time.now > this.firingTimer)
      {
        this.enemyFires();
      }

      //  Run collision
      this.physics.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);
      this.physics.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
  }

}

render() {

  // for (var i = 0; i < aliens.length; i++)
  // {
  //     game.debug.body(aliens.children[i]);
  // }

}

collisionHandler (bullet, alien) {

  //  When a bullet hits an alien we kill them both
  bullet.kill();
  alien.kill();

  //  Increase the score
  this.score += 20;
  this.scoreText.text = this.scoreString + this.score;

  //  And create an explosion :)
  var explosion = this.explosions.getFirstExists(false);
  explosion.reset(alien.body.x, alien.body.y);
  explosion.play('kaboom', 30, false, true);

  if (this.aliens.countLiving() == 0)
  {
    this.score += 1000;
    this.scoreText.text = this.scoreString + this.score;

    this.enemyBullets.callAll('kill',this);
    this.stateText.text = " You Won, \n Click to restart";
    this.stateText.visible = true;

      //the "click to restart" handler
      this.input.on('pointerdown', this.restart);
  }

}

enemyHitsPlayer (player,bullet) {
  
  bullet.kill();

  var live = this.lives.getFirstAlive();

  if (live)
  {
    live.kill();
  }

  //  And create an explosion :)
  var explosion = this.explosions.getFirstExists(false);
  explosion.reset(player.body.x, player.body.y);
  explosion.play('kaboom', 30, false, true);

  // When the player dies
  if (this.lives.countLiving() < 1)
  {
      player.kill();
      this.enemyBullets.callAll('kill');

      this.stateText.text=" GAME OVER \n Click to restart";
      this.stateText.visible = true;

      //the "click to restart" handler
      this.input.on('pointerdown', this.restart);
  }

}

enemyFires () {

  //  Grab the first bullet we can from the pool
  var enemyBullet = this.enemyBullets.getFirstExists(false);

  this.livingEnemies.length=0;

  this.aliens.forEachAlive( (alien) => {

      // put every living enemy in an array
      this.livingEnemies.push(alien);
  });


  if (enemyBullet && this.livingEnemies.length > 0)
  {
      
      var random=random.integerInRange(0,this.livingEnemies.length-1);

      // randomly select one of them
      var shooter=this.livingEnemies[random];
      // And fire the bullet from this enemy
      enemyBullet.reset(shooter.body.x, shooter.body.y);

      this.physics.moveToObject(enemyBullet,this.player,120);
      this.firingTimer = this.time.now + 2000;
  }

}

fireBullet () {

  //  To avoid them being allowed to fire too fast we set a time limit
  if (this.time.now > this.bulletTime)
  {
      //  Grab the first bullet we can from the pool
      var bullet = this.bullets.getFirstExists(false);

      if (bullet)
      {
          //  And fire it
          bullet.reset(this.player.x, this.player.y + 8);
          bullet.body.velocity.y = -400;
          this.bulletTime = this.time.now + 200;
      }
  }

}

resetBullet (bullet) {

  //  Called if the bullet goes out of the screen
  bullet.kill();

}

restart () {

  //  A new level starts
  
  //resets the life count
  this.lives.callAll('revive');
  //  And brings the aliens back from the dead :)
  this.aliens.removeAll();
  this.createAliens();

  //revives the player
  this.player.revive();
  //hides the text
  this.stateText.visible = false;

}

}

class MainScene extends Phaser.Scene {
  growBall: boolean; 
  canPlay: boolean;
  balance;
  ball;
  gameOptions;
  config;

  constructor() {
    super({ key: 'main' });
    this.config = CONFIG;
   
        this.gameOptions = {
            maxDiameter: 1,
            ballGrowingSpeed: 0.015,
            balanceFriction: 400
        };

        this.growBall = false;
        this.canPlay = true;
        this.ball = null;
        this.balance = [];
  }

  preload() {

    this.load.image("balance", "../assets/balance.png");
    this.load.image("ball", "../assets/ball.png");
  }

  create() {
    
    for(var i = 0; i < 2; i++){
      this.balance[i] = this.add.group();
      this.balance[i].weight = 0;
      this.balance[i].saveYPosition = 0;
      var balanceSprite = this.add.sprite(this.config.width / 2 *i, 240, "balance");
      balanceSprite.setOrigin(0, 0.5);
      this.balance[i].add(balanceSprite)
    }
    this.input.on("pointerdown", this.placeBall, this);
    this.input.on("pointerup", this.dropBall, this);
  }

  placeBall(pointer) {
    if(!this.growBall && this.canPlay){
      var side = Math.floor(pointer.x / (this.config.width / 2));
      this.ball = this.add.sprite(pointer.x, 30, "ball");
      this.ball.setScale(0.1);
      this.ball.balance = side;
      this.growBall = true;
    }
  }

  dropBall() {
    if(this.growBall){
      this.growBall = false;
      this.canPlay = false;

      var group = this.balance[this.ball.balance];

      var ballDestination = this.config.height / 2 + group.saveYPosition - group.children.entries[0].height / 2 - this.ball.height * this.ball.scaleY / 2;
      this.balance[this.ball.balance].weight += (4/3) * Math.PI * Math.pow((this.ball.width * this.ball.scaleX /2), 3);
      
      this.tweens.add({
        targets: this.ball,
        y: ballDestination,
        duration: 2000,
        ease: "Bounce",
        onComplete: adjustBalances,
        onCompleteScope: this
      })
    }

    function adjustBalances() {
      var weightDifference = (this.balance[0].weight - this.balance[1].weight) / 400;
      var maxDifference = this.config.height / 3;
      if(weightDifference > maxDifference){
          weightDifference = maxDifference;
      }
      if(weightDifference < -maxDifference){
          weightDifference = -maxDifference;
      }
      for(var i = 0; i < 2; i++){
          var difference = - this.balance[i].saveYPosition + weightDifference - (2 * i * weightDifference)
          this.balance[i].saveYPosition += difference;
          this.tweens.add({
              targets: this.balance[i].children.entries,
              y: "+=" + difference.toString(),
              duration: 2000,
              ease: "Quad",
              onComplete: function(){
                  this.canPlay = true;
              },
              onCompleteScope: this
          })
      }
    }
  }


  update() {
    if (this.growBall && this.ball.scaleX < this.gameOptions.maxDiameter)
    {
        this.ball.setScale(this.ball.scaleX + this.gameOptions.ballGrowingSpeed);
    }
  }
}
