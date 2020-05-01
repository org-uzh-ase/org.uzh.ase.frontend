import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent{
  title = 'The Very Stressful Movie Quiz';
  startedGame = false;
  gameover = false;
  totalScore = 0;

  startGame(){
    this.startedGame = true
  }

  setGameOver(valueEmitted: integer){
    this.gameover = true;
    this.startedGame = false;
    this.totalScore = valueEmitted;
  }
}
