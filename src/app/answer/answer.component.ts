import { Component, OnInit, Input } from '@angular/core';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.sass']
})
export class AnswerComponent implements OnInit {

  @Input() movies: Movie[];

  constructor() { }

  ngOnInit() {
  }

}
