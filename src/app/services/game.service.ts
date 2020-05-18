import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable()
/**Service responsible for making calls to the Quiz Microservice. For more information see https://app.swaggerhub.com/apis-docs/ltoedt/ASE/0.1*/
export class GameService {
  url = ""

  constructor(private http: HttpClient) { }

  getQuiz(level: integer){
    return this.http.get(this.url + ":8080" + "/api/quizzes/quiz?level=" + level)
    .pipe(
      retry(3)
    );
  }
}
