export class Bullet extends Phaser.GameObjects.Image {
    isEnemyBullet;
    speed;
    born;
    direction;
    xSpeed;
    ySpeed;

    constructor(scene, x, y, defaultKey){
        super(scene, x, y, defaultKey);
        // Tell Phaser to use our preloaded image.
        Phaser.GameObjects.Image.call( this, scene, 0, 0, defaultKey );

        // Is this a bullet for the enemy?
        this.isEnemyBullet = ( defaultKey === 'enemyBullet' );

        // This is our base speed.
        this.speed = 0.1;

        // This is the time when the bullet was "born" (fired).
        this.born = 0;

        // This is the direction the bullet is traveling.
        this.direction = 0;

        // This is the bullet's speed along the x-axis.
        this.xSpeed = 0;

        // This is the bullet's speed along the y-axis.
        this.ySpeed = 0;

        // Set the image size based on the type of bullet.
        if ( this.isEnemyBullet ) {
            this.setSize( 9, 9 );
        } else {
            this.setSize( 6, 36 );
        }
    }

    fire(shooter, target){
        // Set the starting x- and y-coordinates to the shooter's.
        this.setPosition( shooter.x, shooter.y );

        // Set things assuming that the player is shooting.
        this.direction = 90;
        this.xSpeed = 0;
        this.ySpeed = -this.speed;
        this.born = 0;

        // But if an alien is shooting, reset those.
        if ( this.isEnemyBullet ) {

            // Calculate the direction.
            var xDifference = target.x - this.x;
            var yDifference = target.y - this.y;
            this.direction = Math.atan( xDifference / yDifference );

            // Calculate the x-axis speed against the direction.
            this.xSpeed = this.speed * Math.sin( this.direction );

            // Calculate the y-axis speed against the direction.
            this.ySpeed = this.speed * Math.cos( this.direction );

            // Calculate a rotation for an enemy bullet.
            this.rotation = Phaser.Math.Angle.Between(
                shooter.x,
                shooter.y,
                target.x,
                target.y
            );
        }
    }

    update(time, delta){
       // Set this bullet's x-coordinate.
       this.x += this.xSpeed * delta;

       // Set this bullet's y-coordinate.
       this.y += this.ySpeed * delta;

       // Update this bullet's born time.
       this.born += delta;

       // If it's more than 5,000 milliseconds, it's off the screen.
       // Remove it from the game, so Phaser doesn't have to track it anymore.
       if ( this.born > 5000 ) {
           this.setActive( false );
           this.setVisible( false );
       } 
    }
}