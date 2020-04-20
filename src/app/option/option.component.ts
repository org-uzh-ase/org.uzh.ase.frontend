import { Component, OnInit, Input } from '@angular/core';
import {Movie} from '../model/movie';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.sass']
})
export class OptionComponent implements OnInit {

  @Input() movie: Movie;
  
  constructor() { }

  ngOnInit() {
  }

}
