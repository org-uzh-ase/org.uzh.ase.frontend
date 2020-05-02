import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Score } from '../model/score';

@Injectable()
export class UserService {
  BASE_URL = "http://localhost:8081"

  constructor(private http: HttpClient) { }

  getScores(){
    return this.http.get(this.BASE_URL + "/api/scores");
  }

  postScore(score: Score){
    this.http.post<Score>(this.BASE_URL + "/api/scores/score", score, {observe: 'response'}).subscribe(resp => {
      console.log(resp);
   });
  }
}