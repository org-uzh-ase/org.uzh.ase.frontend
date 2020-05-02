import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Score} from '../model/score';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
export class LeaderboardComponent implements OnInit {
  leaders: Score[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getLeaders();
  }

  getLeaders(){
    this.userService.getScores().subscribe(
      scores => {
        this.leaders = scores as Score[];
      })
  }

  postScore(score: Score){
    this.userService.postScore(score);
  }

}
