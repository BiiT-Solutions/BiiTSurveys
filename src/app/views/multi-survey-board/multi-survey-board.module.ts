import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSurveyBoardComponent } from './multi-survey-board.component';
import {MultiSurveyBoardRoutingModule} from "./multi-survey-board-routing.module";
import {SurveyMultiTextModule} from "../../shared/survey-multi-text/survey-multi-text.module";



@NgModule({
  declarations: [
    MultiSurveyBoardComponent
  ],
  imports: [
    CommonModule,
    MultiSurveyBoardRoutingModule,
    SurveyMultiTextModule
  ],
  exports: [
    MultiSurveyBoardComponent
  ]
})
export class MultiSurveyBoardModule { }
