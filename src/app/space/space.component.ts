import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.sass']
})
export class SpaceComponent implements OnInit {

  @Output() gameOver: EventEmitter<integer> = new EventEmitter<integer>();
  
  constructor() { }

  ngOnInit() {
  }

  setGameOver(valueEmitted: integer){
    this.gameOver.emit(valueEmitted);
  }
}
