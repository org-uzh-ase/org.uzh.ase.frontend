import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.sass']
})
/**One potential Answer to the Movie Quiz. ChildComponent of the AnswerQuiz.*/
export class OptionComponent implements OnInit, OnChanges {

  /**Movie object which is represented by the OptionComponent. Received by the {@link AnswerComponent}.*/
  @Input() movie: Movie;
  /**The code of the correct movie. Received by the {@link AnswerComponent}.*/
  @Input() correctAnswer: string;
  /**Forwards to the {@link AnswerQuizComponent} when it was clicked with the information if it's the correct answer or not.*/
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**This attribute holds the applied css style class.*/
  style = "wrapper";
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.style = "wrapper";
  }

  /**This method triggers when the component is clicked and evaluates if it contains the correct answer to the movie quiz or not.*/
  validate(){
    if(this.correctAnswer == this.movie.code){
      this.style = "wrapper correct";
      this.clicked.emit(true);
    }else{
      this.style = "wrapper wrong";
      this.clicked.emit(false);
    }    
  }

}
