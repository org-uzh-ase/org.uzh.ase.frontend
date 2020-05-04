import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() totalScore: integer;
  @Input() gameover: boolean;
  @Output() visibility: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  score = new Score('', 0);
  submitted: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.leaderboardEmpty = true;
    this.submitted = false;
    this.getLeaders();
  }

  getLeaders(){
    this.userService.getScores().subscribe(
      scores => {
        this.leaders = scores as Score[];
        this.leaderboardEmpty = this.leaders.length == 0;
      })
  }
  
  onSubmit(){
    this.score.scoreNo = this.totalScore;
    this.userService.postScore(this.score).subscribe(() => this.getLeaders());
    this.submitted = true;
  }
}
