import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  score: integer;

  constructor() { }

  ngOnInit() {
    this.score = 0;
  }

  getEventFromOption(valueEmitted:boolean){
    if(valueEmitted){
      this.score = this.score + 10;
    }else{
      this.score = this.score - 5;
    }
  }
}
