import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import {Observable, interval} from 'rxjs';
import { SpaceComponent } from '../space/space.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
/**Represents the game and contains the quiz and shooting game.  */
export class GameComponent implements OnInit {
  /**Current score to the Movie Quiz part of the game. */
  score: integer;
  /**Keeps track of how many times the player answered correctly to the movie quiz.*/
  correctAnswer: integer;
  /**Represents the length of the timebar in percent.*/
  timer: integer;
  /**Observable which helps evaluating the current length of the timebar.*/
  obs: Observable<number>;
  /**Level of difficulty provided by the {@link AppComponent}.*/
  @Input() level: integer;
  /**Forwards to the {@link AppComponent} when the game has ended.*/
  @Output() gameover: EventEmitter<integer> = new EventEmitter<integer>();
  /**Keeps track of {@link SpaceComponent}.*/ 
  @ViewChild(SpaceComponent) childcomp: SpaceComponent;

  constructor() { }

  ngOnInit() {
    this.score = 0;
    this.correctAnswer = 1;
    this.timer = 100;
    this.obs = interval(50);
    this.obs.subscribe(() => this.setTime())
  }

  /**Method to update timebar to simulate time running out.*/
  setTime(){
    this.timer = this.timer - 0.25;
    if(this.timer < 0){
      this.stopGame();
    }
  }

  /**This method is triggered when the player answered the quiz correctly. 
   * The player then is awarded additional time.*/
  addTime(delta: integer){
    this.timer = Math.min(100, this.timer + delta);
  }

  /**Receives the information if the clicked {@link OptionComponent} was the correct answer or not.
   * The player receives points on a correct answer and 5 points are subtracted on a wrong answer.
   * On a correct answer, the amount of additional time depends on the level of difficulty ({@link GameComponent.level} and 
   * the amount of points on the number of consecutively correct answered questions ({@link GameComponent.correctAnswer}).
  */
  getEventFromOption(valueEmitted:boolean){
    if(valueEmitted){
      this.addTime(25/this.level);
      this.correctAnswer += 1;
      this.score = this.score + 10*this.correctAnswer;
    }else{
      this.score = this.score - 5;
      this.correctAnswer = 1;
    }
  }

  /** Triggered when the player lost in the shooting game part of the game ({@link PhaserComponent}).*/
  setGameOver(valueEmitted: integer){
    this.gameover.emit(valueEmitted + this.score);
  }

  /**Triggered when time runs out on the timebar ({@link GameComponent.timer}) */
  stopGame(){
    this.childcomp.stopGame();
  }
}
