import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent{
  title = 'The Very Stressful Movie Quiz';
  startedGame = false;

  startGame(){
    this.startedGame = true
  }
}
