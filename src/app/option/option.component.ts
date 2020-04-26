import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.sass']
})
export class OptionComponent implements OnInit, OnChanges {

  @Input() movie: Movie;
  @Input() correctAnswer: string;
  style = "wrapper"
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.style = "wrapper";
  }

  validate(){
    if(this.correctAnswer == this.movie.code){
      this.style = "wrapper correct";
    }else{
      this.style = "wrapper wrong";
    }    
  }

}
