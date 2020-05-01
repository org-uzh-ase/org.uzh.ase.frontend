import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../game.service';
import {Quiz} from '../model/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {
  quiz: Quiz;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz(){

    this.gameService.getQuiz().subscribe(
      quiz => {
        this.quiz = <Quiz> quiz;
      })
  }

  getEventFromOption(valueEmitted: boolean){
    this.clicked.emit(valueEmitted);
  }

}
