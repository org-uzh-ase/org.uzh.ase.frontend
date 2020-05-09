import { Component, OnInit } from '@angular/core';
import { titles } from '../assets/title_different_fonts';
import { interval } from 'rxjs';
import { UserService } from './services/user.service';

/**
 * Interface for the Dropdown list to choose the Level of Difficulty
 */
export interface Level {
  /**Actual value*/
  value: number;
  /**Value displayed in the dropdown list*/
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

/** 
 *Top Level Component
 */
export class AppComponent implements OnInit{
  title = 'The Very Stressful Movie Quiz';
  /**Flag to display or hidde starting view */
  welcome = true;
  /**Flag to display or hidde game view */
  startedGame = false;
  /**Flag to display or hidde ending view */
  gameover = false;
  /**Variable to store total score after game has finished */
  totalScore = 0;
  /**Path to the title picture "The Very Stressful Movie Quiz" in different movie fonts */
  titlesrc: string;
  /**Array of the different title picture paths used for {@link AppComponent.titlesrc}*/
  titles: string[];
  /**Counter to iterate through {@link AppComponent.titles}*/
  counter = 0;
  /** Observable responsible to switch title image path every 10s*/
  observ;
  /**Level of difficulty. Default = 1 */
  level = 1;

  /**Available Level of Difficulty in the dropdown list when starting the game */
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
    this.observ = interval(10000);
    this.observ.subscribe(() => this.setDifferentMovieTitle());
  }

  /**
   * Method responsible for switching the title pictures with different movie fonts.
   */
  setDifferentMovieTitle(){
    this.titlesrc = this.titles[this.counter];
    this.counter = (this.counter+1)%this.titles.length;
  }

  /**
   * Switching from the starting view to the game view.
   */
  startGame(){
    this.startedGame = true
    this.welcome = false
  }

 /**
   * Switching from the game view to the ending view. Triggered when the game is over.
   */
  setGameOver(valueEmitted: integer){
    this.gameover = true;
    this.startedGame = false;
    this.totalScore = valueEmitted;
  }

  /**
   * Switching from the ending view to the game view.
   */
  restartGame(){
    this.startedGame = true;
    this.gameover = false;
  }

  /**
   * Switching from the ending view to the starting view.
   */
  backToStart(){
    this.welcome = true;
    this.gameover = false;  
  }

  /**Assign the selected level of difficulty to {@link AppComponent.level} */
  selected(){
    this.level = +document.getElementsByTagName("select")[0].value;
  }
}
