import { Component, OnInit, Output } from '@angular/core';
import {UserService} from '../services/user.service';
import {Score} from '../model/score';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
export class LeaderboardComponent implements OnInit {
  leaders: Score[];
  leaderboardEmpty: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getLeaders();
  }

  getLeaders(){
    this.userService.getScores().subscribe(
      scores => {
        this.leaders = scores as Score[];
        console.log(this.leaders);
        this.leaderboardEmpty = this.leaders.length == 0;
      })
  }

  postScore(score: Score){
    this.userService.postScore(score);
  }
}
