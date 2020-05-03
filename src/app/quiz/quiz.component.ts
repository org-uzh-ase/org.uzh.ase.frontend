import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GameService } from '../services/game.service';
import {Quiz} from '../model/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {
  quiz: Quiz;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() level: integer;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz(){
    var response;
    
    this.gameService.getQuiz(this.level).subscribe(
      quiz => {
        response = <Quiz> quiz;
        if((<Quiz> response).description.length < 150){
          return this.getQuiz();
        }

        for(var el of (<Quiz> response).answers){
          if(!this.imageExists(el.poster)){
            return this.getQuiz();
          }
        }

        this.quiz = response;
      });
  }

  getEventFromOption(valueEmitted: boolean){
    this.clicked.emit(valueEmitted);
  }

  imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    
    try{
      http.send();
      return http.status == 200;
    }
    catch{
      return false;
    }
}

}
