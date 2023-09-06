import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSurveyBoardComponent } from './single-survey-board.component';
import {SurveyBoardModule} from "../../shared/survey-board/survey-board.module";
import {SingleSurveyBoardRoutingModule} from "./single-survey-board-routing.module";



@NgModule({
  declarations: [
    SingleSurveyBoardComponent
  ],
  imports: [
    CommonModule,
    SurveyBoardModule,
    SingleSurveyBoardRoutingModule
  ], exports: [
    SingleSurveyBoardComponent
  ]
})
export class SingleSurveyBoardModule { }
