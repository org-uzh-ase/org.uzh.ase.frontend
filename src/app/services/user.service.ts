import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Score } from '../model/score';

@Injectable()
/**
 * Service responsible for making calls to the User Microservice. For more information see https://app.swaggerhub.com/apis-docs/ltoedt/ASE/0.1
 */
export class UserService {
  /**
   * Base URL of the server 
   */
  url = ""

  constructor(private http: HttpClient) { }

  /**
   * Request scores from the Score service
   */
  getScores(){
    return this.http.get(this.url + ":8081" + "/api/scores");
  }

  /**
   * Upload score of the current game.
   * @param scr How much score did the user reach 
   */
  postScore(scr: Score){
    const bodyString = JSON.stringify(scr);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.url + ":8081" + "/api/scores/score", bodyString, httpOptions);
  }
}