import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.sass']
})
export class AnswerComponent implements OnInit, OnChanges {

  @Input() movies: Movie[];
  @Input() correctAnswer: string;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.shuffleMovies();
  }

  ngOnChanges(){
    this.shuffleMovies();
  }

  shuffleMovies(){
    this.shuffle(this.movies);
  }

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

  getEventFromOption(valueEmitted: boolean){
    this.clicked.emit(valueEmitted);
  }

}
