import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import {Quiz} from '../model/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {
  quiz: Quiz;

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

}
