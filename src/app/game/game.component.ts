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
    console.log("Game component: " + valueEmitted)
    if(valueEmitted){
      this.score = this.score + 10;
    }
  }
}
