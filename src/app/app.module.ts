import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ExampleComponent } from "./example/example.component";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleService } from './example/example.service';
import { PhaserComponent } from './phaser/phaser.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    PhaserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ExampleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
