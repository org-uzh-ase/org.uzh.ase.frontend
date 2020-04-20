import { Component, OnInit, Input } from '@angular/core';
import {Quiz} from '../model/quiz'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {
  @Input() quiz: Quiz;

  constructor() { }

  ngOnInit() {
  }

}
