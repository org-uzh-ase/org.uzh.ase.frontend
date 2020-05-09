import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import {Observable, interval} from 'rxjs';
import { SpaceComponent } from '../space/space.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  score: integer;
  correctAnswer: integer;
  timer: integer;
  obs: Observable<number>;
  @Input() level: integer;
  @Output() gameover: EventEmitter<integer> = new EventEmitter<integer>(); 
  @ViewChild(SpaceComponent) childcomp: SpaceComponent;

  constructor() { }

  ngOnInit() {
    this.score = 0;
    this.correctAnswer = 1;
    this.timer = 100;
    this.obs = interval(50);
    this.obs.subscribe(() => this.setTime())
  }

  setTime(){
    this.timer = this.timer - 0.25;
    if(this.timer < 0){
      this.stopGame();
    }
  }

  addTime(delta: integer){
    this.timer = Math.min(100, this.timer + delta);
  }

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

  setGameOver(valueEmitted: integer){
    this.gameover.emit(valueEmitted + this.score);
  }

  stopGame(){
    this.childcomp.stopGame();
  }
}
