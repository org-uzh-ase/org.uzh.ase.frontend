import { Component, OnInit } from '@angular/core';
import { Quiz } from '../model/quiz';
import { Movie } from '../model/movie';
import {GameService} from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
