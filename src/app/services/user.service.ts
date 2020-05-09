import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Score } from '../model/score';

@Injectable()
export class UserService {
  BASE_URL = "http://localhost:8081"

  constructor(private http: HttpClient) { }

  getScores(){
    return this.http.get(this.BASE_URL + "/api/scores");
  }

  postScore(scr: Score){
    const bodyString = JSON.stringify(scr);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.BASE_URL + "/api/scores/score", bodyString, httpOptions);
  }
}