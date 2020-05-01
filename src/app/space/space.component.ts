import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.sass']
})
export class SpaceComponent implements OnInit {

  @Output() gameOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit() {
  }

  setGameOver(valueEmitted: boolean){
    this.gameOver.emit(valueEmitted);
  }
}
