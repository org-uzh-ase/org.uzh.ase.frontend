import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GameService } from '../services/game.service';
import { Quiz } from '../model/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
/**This component contains the Movie Quiz part of the game.*/
export class QuizComponent implements OnInit {
  /**The quiz object which will be passed to the child components.*/
  quiz: Quiz;
  /**Forwards to the {@link GameComponent} if the correct movie was chosen or not.*/
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**Level of difficulty chosen by the player when starting the game.*/
  @Input() level: integer;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getQuiz();
  }

  /**Getting the quiz object from the Quiz Microservice.*/
  getQuiz(){
    var response;

    var loc = window.location.href;
    var tmp = loc.split(":");
    var url = tmp.slice(0,2).join(":");
    this.gameService.url = url;

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

  /**This method is triggered when the player chooses (clicks) an answer for the question.*/
  getEventFromOption(valueEmitted: boolean){
    this.clicked.emit(valueEmitted);
  }

  /**Check if a given image url is reachable or not.*/
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
