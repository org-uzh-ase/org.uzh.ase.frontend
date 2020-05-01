import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.sass']
})
export class OptionComponent implements OnInit, OnChanges {

  @Input() movie: Movie;
  @Input() correctAnswer: string;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  style = "wrapper";
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.style = "wrapper";
  }

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
