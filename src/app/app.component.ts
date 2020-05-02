import { Component, OnInit } from '@angular/core';
import {titles} from '../assets/title_different_fonts';
import {interval} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'The Very Stressful Movie Quiz';
  welcome = true;
  startedGame = false;
  gameover = false;
  totalScore = 0;
  titlesrc: string;
  titles: string[];
  counter = 0;
  timer;

  ngOnInit(){
    this.titles = titles;
    this.setDifferentMovieTitle();
    this.timer = interval(10000);
    this.timer.subscribe(() => this.setDifferentMovieTitle());
  }

  setDifferentMovieTitle(){
    this.titlesrc = this.titles[this.counter];
    this.counter = (this.counter+1)%this.titles.length;
  }

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
