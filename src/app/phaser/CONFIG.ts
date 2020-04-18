export var CONFIG = {
    type: Phaser.AUTO,
    height: 900,
    width: 600,
    backgroundColor: '#222222',
    parent: 'phaser-game',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 100 }
      }
    }
  };