import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpaceComponent } from './space/space.component';
import { QuizComponent } from './quiz/quiz.component';
import { AnswerComponent } from './answer/answer.component';
import { QuestionComponent } from './question/question.component';
import { GameComponent } from './game/game.component';
import { OptionComponent } from './option/option.component';
import { GameService } from './services/game.service';
import { UserService} from './services/user.service';
import { PhaserComponent } from './phaser/phaser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SpaceComponent,
    QuizComponent,
    AnswerComponent,
    QuestionComponent,
    GameComponent,
    OptionComponent,
    PhaserComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [GameService, UserService],
  bootstrap: [AppComponent]
  
})
export class AppModule { 
}
