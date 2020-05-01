import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpaceComponent } from './space/space.component';
import { QuizComponent } from './quiz/quiz.component';
import { AnswerComponent } from './answer/answer.component';
import { QuestionComponent } from './question/question.component';
import { GameComponent } from './game/game.component';
import { OptionComponent } from './option/option.component';
import { GameService } from './game.service';
import { PhaserComponent } from './phaser/phaser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    SpaceComponent,
    QuizComponent,
    AnswerComponent,
    QuestionComponent,
    GameComponent,
    OptionComponent,
    PhaserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
  
})
export class AppModule { 
}
