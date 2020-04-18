export var CONFIG = {
    type: Phaser.AUTO,
    height: 480,
    width: 320,
    backgroundColor: '#222222',
    parent: 'gameContainer',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 100 }
      }
    }
  };