import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {PhaserComponent} from '../phaser/phaser.component';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.sass']
})
export class SpaceComponent implements OnInit {

  @Output() gameOver: EventEmitter<integer> = new EventEmitter<integer>();
  @ViewChild(PhaserComponent) childcomp: PhaserComponent;

  constructor() { }

  ngOnInit() {
  }

  setGameOver(valueEmitted: integer){
    this.gameOver.emit(valueEmitted);
  }

  stopGame(){
    this.childcomp.stopGame();
  }
}
