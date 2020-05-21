import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.sass']
})
/**Representation of the possible Answers to the Quiz Part */
export class AnswerComponent implements OnInit, OnChanges {

  /**Movies provided by the QuizComponent */
  @Input() movies: Movie[];
  /**The code of the correct movie */
  @Input() correctAnswer: string;
  /**Forwards to the {@link QuizComponent} if the clicked OptionComponent contained the correct answer or not*/
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.shuffleMovies();
  }

  ngOnChanges(){
    this.shuffleMovies();
  }

  /**In the received movie array ({@link AnswerComponent.movies}), the correct movie is always at position 1. This method shuffles the array in order to make the quiz more challenging.*/
  shuffleMovies(){
    this.shuffle(this.movies);
  }

  /**Algorithm to shuffle the elements of an array.*/
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex); // nosonar
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  /**Receives the information if the clicked OptionComponent was the correct answer or not.*/
  getEventFromOption(valueEmitted: boolean){
    this.clicked.emit(valueEmitted);
  }

}
