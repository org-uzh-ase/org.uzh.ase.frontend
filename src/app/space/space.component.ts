import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {PhaserComponent} from '../phaser/phaser.component';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.sass']
})
/**Contains the Shooting game part.*/
export class SpaceComponent implements OnInit {
  /**Forwards to the {@link GameComponent} when the shooting game has finished.*/
  @Output() gameOver: EventEmitter<integer> = new EventEmitter<integer>();
  /**ChildComponent containing the actual shooting game ({@link PhaserComponent}).*/
  @ViewChild(PhaserComponent) childcomp: PhaserComponent;

  constructor() { }

  ngOnInit() {
  }

  /**Triggered when the shooting game is over.*/
  setGameOver(valueEmitted: integer){
    this.gameOver.emit(valueEmitted);
  }

  /**Stops the shooting game. This funtion is triggered when time has run out on the quiz part of the gamne ({@link QuizComponent}).*/
  stopGame(){
    this.childcomp.stopGame();
  }
}
