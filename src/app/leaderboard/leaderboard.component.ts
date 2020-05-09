import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {UserService} from '../services/user.service';
import {Score} from '../model/score';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
/**Contains the top 100 users with their scores.*/
export class LeaderboardComponent implements OnInit {
  /**List of leaders. */
  leaders: Score[];
  /**Flag to make leaderboard invisible in case there are no scores.*/
  leaderboardEmpty: boolean;
  /**Total score of a player after the game has finished.*/
  @Input() totalScore: integer;
  /** Flag if the leaderboard is displayed at the starting or ending view.*/
  @Input() gameover: boolean;
  /**Potential score transmitted to the User Microservice.*/
  score = new Score('', 0);
  /**Flag to indicate whether the player has submitted her score at the end of the game.*/
  submitted: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.leaderboardEmpty = true;
    this.submitted = false;
    this.getLeaders();
  }

  /**Get Top 100 scores from the User Microservice.*/
  getLeaders(){
    this.userService.getScores().subscribe(
      scores => {
        this.leaders = scores as Score[];
        this.leaderboardEmpty = this.leaders.length == 0;
      })
  }
  
  /**Triggered when the player submits her score to the User Microservice.*/
  onSubmit(){
    this.score.scoreNo = this.totalScore;
    this.userService.postScore(this.score).subscribe(() => this.getLeaders());
    this.submitted = true;
  }
}
