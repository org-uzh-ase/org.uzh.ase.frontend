export var CONFIG = {
    type: Phaser.AUTO,
    height: 600,
    width: 800,
    backgroundColor: '#222222',
    parent: 'phaser-game',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 100 }
      }
    }
  };