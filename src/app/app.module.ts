import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule} from './shared/AngularMaterial/material'

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';

import { StarshipsService } from './shared/services/starships.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [StarshipsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
