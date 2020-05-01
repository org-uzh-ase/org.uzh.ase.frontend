import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent{
  title = 'The Very Stressful Movie Quiz';
  welcome = true;
  startedGame = false;
  gameover = false;
  totalScore = 0;

  startGame(){
    this.startedGame = true
    this.welcome = false
  }

  setGameOver(valueEmitted: integer){
    this.gameover = true;
    this.startedGame = false;
    this.totalScore = valueEmitted;
  }

  restartGame(){
    this.startedGame = true;
    this.gameover = false;
  }

  backToStart(){
    this.welcome = true;
    this.gameover = false;  
  }
}
