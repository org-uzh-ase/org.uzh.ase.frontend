import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {titles} from '../assets/title_different_fonts';
import {interval} from 'rxjs';
import { UserService } from './services/user.service';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { Score } from './model/score';

export interface Level {
  value: number;
  viewValue: string;
}

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
  visibleLeaderboard: boolean;
  totalScore = 0;
  titlesrc: string;
  titles: string[];
  counter = 0;
  timer;
  leaderForm;
  level = 1;

  levels: Level[] = [
    {value: 1, viewValue: 'Easy'},
    {value: 2, viewValue: 'Medium'},
    {value: 3, viewValue: 'Hard'}
  ]

  constructor(private userService: UserService){
  }

  ngOnInit(){
    this.titles = titles;
    this.setDifferentMovieTitle();
    this.timer = interval(10000);
    this.timer.subscribe(() => this.setDifferentMovieTitle());
    this.visibleLeaderboard = false;
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

  selected(){
    this.level = +document.getElementsByTagName("select")[0].value;
  }
}
