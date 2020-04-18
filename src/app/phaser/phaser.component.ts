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
    this.config.scene = [MainScene];
   }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
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
      
      var ballTween = this.tweens.add({
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
          var balanceTween = this.tweens.add({
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
