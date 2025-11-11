import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyBoardComponent } from './survey-board.component';
import {CountdownTimerModule} from "../countdown-timer/countdown-timer.module";
import {BiitIconModule} from '@biit-solutions/wizardry-theme/icon';


@NgModule({
  declarations: [
    SurveyBoardComponent
  ],
  exports: [
    SurveyBoardComponent
  ],
    imports: [
        CommonModule,
        CountdownTimerModule,
        BiitIconModule
    ]
})
export class SurveyBoardModule { }
