import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyBoardComponent } from './survey-board.component';
import {CountdownTimerModule} from "../countdown-timer/countdown-timer.module";


@NgModule({
  declarations: [
    SurveyBoardComponent
  ],
  exports: [
    SurveyBoardComponent
  ],
  imports: [
    CommonModule,
    CountdownTimerModule
  ]
})
export class SurveyBoardModule { }
