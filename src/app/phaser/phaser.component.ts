import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as Phaser from "phaser";
import {CONFIG} from './CONFIG';
import {Bullet} from './Bullet';


@Component({
  selector: 'app-phaser',
  templateUrl: './phaser.component.html',
  styleUrls: ['./phaser.component.sass']
})

export class PhaserComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  score: integer;

  @Output() gameOver: EventEmitter<integer> = new EventEmitter<integer>();

  constructor() {
    this.config = CONFIG;
    this.config.scene = [SpaceScene];
   }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
    window["angularLink"] = this;
  }

  setGameOver(score: integer){
    this.gameOver.emit(score);
    this.phaserGame.destroy(true, false);
  }

  stopGame(){
    this.score = this.phaserGame.scene.scenes[0].score;
    this.setGameOver(this.score);
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
  scorePrefix = 'SCORE: ';
  scoreText;
  lives;
  enemyBullets;
  firingTimer = 0;
  stateText;
  livingAliens = [];
  lastAlienBulletTime = 0;
  lastPlayerBulletTime = 0;
  playerLives;
  isGameOver = false;
  gameOverModal;
  gameOverText;
  config;

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
    // Setup our aliens' "hover" animation.
    this.anims.create({
      key: 'hover',
      frames: this.anims.generateFrameNumbers( 'invader', {
          start: 0,
          end: 9
      }),
      frameRate: 10,
      repeat: -1
  });

  // Setup our explosion animation.
  this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers( 'kaboom', {
          start: 0,
          end: 15
      }),
      frameRate: 16,
      repeat: 0,
      hideOnComplete: true
  });

  // Set starfield's value to be a tile sprite, and make sure it's scaled properly.
  this.starfield = this.add.tileSprite( 0, 0, 2048, 2048, 'starfield' );
  this.starfield.setScale( 1 );

  // Setup the score text.
  this.scoreText = this.add.text( 10, 15, this.scorePrefix + this.score, {'fontSize': '25px'} );

  // Setup the player's lives.
  this.playerLives = this.add.group();
  this.add.text(
      this.sys.canvas.width - 210,    // From the right.
      15,                             // From the top.
      'LIVES:',
      {'fontSize': '25px'}
  );
  this.createPlayerLives( this );

  // Add the player as a sprite to the game physics!
  this.player = this.physics.add.sprite( 400, 500, 'ship' );
  this.player.setOrigin( 0.5, 0 );
  this.player.setCollideWorldBounds( true );

  // Create a group to hold our invaders.
  this.aliens = this.physics.add.group();
  this.createAliens();

  // Create the player and alien bullet collections.
  this.bullets = this.createBullets( 'bullet', this );
  this.enemyBullets = this.createBullets( 'enemyBullet', this );

  // Create some explosions!
  this.explosions = this.add.group({
      defaultKey: 'kaboom',
      maxSize: 100
  });

  this.cursors = this.input.keyboard.addKeys({
    left:Phaser.Input.Keyboard.KeyCodes.A,
    right:Phaser.Input.Keyboard.KeyCodes.D
  });

  // Wire up the player's firing mechanism.
  this.firePlayerBullet( this );

  // Setup the game over screen.
  this.createGameOverModal( this );
  
}

createAliens () {

  for (var y = 0; y < 4; y++)
  {
      for (var x = 0; x < 15; x++)
      {
          var alien = this.aliens.create( x * 48, y * 45, 'invader' );
          alien.setOrigin( 0.5, 0.5 );
          alien.lastFired = 0;
          alien.play( 'hover' );
      }
  }
      // Center our collection of aliens.
      Phaser.Actions.IncX( this.aliens.getChildren(), 60 );

      // Bring them further into the scene vertically.
      Phaser.Actions.IncY( this.aliens.getChildren(), 75 );
}

createBullets(imageName, sceneRef) {
  return sceneRef.physics.add.group({
    classType: Bullet,
    defaultKey: imageName,
    runChildUpdate: true
});
}

firePlayerBullet(sceneRef){
  sceneRef.input.keyboard.on( 'keydown_SPACE', () => {

    // If the player died, no processing!
    if ( this.player.active === false ) {
        return;
    }

    // Grab the first bullet in the group, activate it, and make it visible.
    var playerBullet = this.bullets.get().setActive( true ).setVisible( true );

    // As long as we have a valid bullet, fire it.
    if ( playerBullet && sceneRef.time.now - this.lastPlayerBulletTime > 1000 ) {

        // We don't need a target, since we don't need to calculate angles.
        playerBullet.fire( this.player ); 

        // Setup collision handling.
        sceneRef.physics.add.collider( this.aliens, playerBullet, this.handleEnemyCollision, null, this );

        // Update the player last fired time.
        this.lastPlayerBulletTime = sceneRef.time.now;
    }
}, sceneRef );
}

fireEnemyBullet( player, time, sceneRef ) {

  // Grab the first bullet in the group, activate it, and make it visible.
  var enemyBullet = this.enemyBullets.get().setActive( true ).setVisible( true );

  // Find out how many alien invaders are still "alive," and track them.
  this.livingAliens = this.aliens.getChildren().filter( alien => alien.active === true );

  // If we have an instance of enemyBullet, AND there are aliens still alive.
  if ( enemyBullet && this.livingAliens.length > 0 ) {

      // Get a random number between 0 and the number of aliens alive.
      var randomAlienNumber = Phaser.Math.RND.integerInRange(
          0,
          this.livingAliens.length - 1
      );

      // Get the alien from the collection with that number.
      var randomAlien = this.livingAliens[ randomAlienNumber ];

      // If this alien hasn't fired in the last 4,000 milliseconds...
      if ( time - randomAlien.lastFired > 4000 ) {

          // Set the lastFired, so the alien doesn't fire again for a while.
          randomAlien.lastFired = time;

          // FIRE ZE BULLET!
          enemyBullet.fire( randomAlien, player );

          // Setup collision handling.
          sceneRef.physics.add.collider( player, enemyBullet, this.handlePlayerCollision, null, this );

          // Update the global last fired time, and add 2,000 milliseconds.
          this.lastAlienBulletTime = time + 2000;
      }
  }
}

createGameOverModal(sceneRef){
  // Create a "modal" window.
  this.gameOverModal = sceneRef.add.graphics();

  // Set its background color.
  this.gameOverModal.fillStyle( 0x303030, 0.8 );

  // Set its shape, x- and y-coordinates, and size.
  this.gameOverModal.fillRect(
      0,
      0,
      sceneRef.sys.canvas.width,
      sceneRef.sys.canvas.height
  );

  // It shouldn't be visible... yet.
  this.gameOverModal.visible = false;

  // Get our game over text ready.
  this.gameOverText = sceneRef.add.text(
      sceneRef.sys.canvas.width / 2,
      sceneRef.sys.canvas.height / 2,
      ' ',
      {
          align: 'center'
      }
  );
  this.gameOverText.setOrigin( 0.5, 0.5 );

  // It shouldn't be visible... yet.
  this.gameOverText.visible = false;

  // Handle the player wanting to start over on mouse click.
  sceneRef.input.on( 'pointerdown', ( pointer ) => {

      // Only on a Game Over condition.
      if ( this.isGameOver ) {

          // Reset everything.
          this.bullets.clear( true, true );
          this.enemyBullets.clear( true, true );
          this.explosions.clear( true, true );
          this.aliens.clear( true, true );
          this.playerLives.clear( true, true );

          // Create again.
          this.createAliens();
          this.createPlayerLives( sceneRef );
          this.player.setActive( true ).setVisible( true );

          // Hide the text, followed by the modal.
          this.gameOverText.visible = false;
          this.gameOverModal.visible = false;            

          // Reset the game over state.
          this.isGameOver = false;
      }
  }, sceneRef );
}

handleEnemyCollision(bullet, alien){
  if ( bullet.active === true && alien.active === true ) {

      // Deactivate the bullet, and take it off the screen.
      bullet.setActive( false ).setVisible( false );

      // Get the first explosion, and activate it.
      var explosion = this.explosions.get().setActive( true );

      // Place the explosion on the screen, and play the animation.
      explosion.setOrigin( 0.5, 0.5 );
      explosion.x = alien.x;
      explosion.y = alien.y;
      explosion.play( 'explode' );

    // Deactivate and remove the alien from the screen.
    alien.setActive( false ).setVisible( false );

    // Increment the score.
    this.score += 20;
    this.scoreText.setText( this.scorePrefix + this.score );

    // Game Over condition: has the player killed all the alien invaders?
    if ( this.aliens.countActive() === 0 ) {

        // Award a bonus for winning.
        this.score += 1000;
        this.scoreText.setText( this.scorePrefix + this.score );

        // Handle Game Over.
        this.handleGameOver( true );
    }
  }
}

handlePlayerCollision( player, bullet ) {

  // If both the player and bullet are active...
  if ( player.active === true && bullet.active === true ) {

      // Deactivate the bullet, and take it off the screen.
      bullet.setActive( false ).setVisible( false );

      // Get the first explosion, and activate it.
      var explosion = this.explosions.get().setActive( true );

      // Place the explosion on the screen, and play the animation.
      explosion.setOrigin( 0.5, 0.5 );
      explosion.x = player.x;
      explosion.y = player.y;
      explosion.play( 'explode' );

      this.removeLife();

      // Game Over condition: has the player lost all their lives?
      if ( this.playerLives.countActive() < 1 ) {
        this.handleGameOver( false );
      }
  }
}

removeLife(){
  // Remove a life.
  var life = this.playerLives.getFirstAlive();
  if ( life ) {
      life.setActive( false ).setVisible( false );
  }
}

createPlayerLives(sceneRef){
  // Our x-coordinate for the lives images.
  var x = sceneRef.sys.canvas.width - 105;

  // Only 3.
  for ( var i = 0; i < 3; i++ ) {
      // Calculate this life's x-coordinate.
      var lifeX = x + 40 * i;

      // Add a life to our collection of lives.
      var life = this.playerLives.create( lifeX, 25, 'ship' );

      // Set the life's origin, scale, and opacity.
      life.setOrigin( 0.5, 0.5 );
      life.setScale( 0.75 );
      life.alpha = 0.6;
  }
}

handleGameOver( didPlayerWin ) {

  // Set the condition flag, so the aliens stop firing if any are left.
  this.isGameOver = true;

  // Remove and disable a group item.
  var removeDisableItem = function( item ) {
      item.setActive( false ).setVisible( false );
  };

  // Disable all bullets, so no one can fire.
  Phaser.Utils.Array.Each( this.bullets.getChildren(), removeDisableItem , this.game.context);
  Phaser.Utils.Array.Each( this.enemyBullets.getChildren(), removeDisableItem, this.game.context );
  Phaser.Utils.Array.Each( this.aliens.getChildren(), removeDisableItem, this.game.context );

  // Disable the player.
  this.player.setActive( false ).setVisible( false );

  // The text to display, based on whether the player won.
  var displayText = ( didPlayerWin )
      ? ' YOU WON! \n\n Click to restart.'
      : ' GAME OVER \n\n Click to restart.';

  // Set the text.
  this.gameOverText.setText( displayText );

  // Show the modal, followed by the text.
  this.gameOverModal.visible = true;
  this.gameOverText.visible = true;

  this.setGameOver();
}

setGameOver(){
  var comp: PhaserComponent;
  comp = window['angularLink'] as PhaserComponent;
  comp.setGameOver(this.score);
}

update(time) {

      
    // Scroll our starfield background.
    this.starfield.tilePositionY += this.isGameOver ? 0.5 : 2;

    // Is the player pressing the left arrow?
    if ( this.cursors.left.isDown ) {
      this.player.setVelocityX( -200 );
    }

    // Is the player pressing the right arrow?
    else if ( this.cursors.right.isDown ) {
      this.player.setVelocityX( 200 );
    }

    // Otherwise, we need to slow them down.
    else {
      this.player.setVelocityX( 0 );
    }
    
    // If the invaders haven't fired recently - and the game isn't over - fire one.
    if ( time > this.lastAlienBulletTime && !this.isGameOver ) {
      this.fireEnemyBullet( this.player, time, this );
    }
}

}
