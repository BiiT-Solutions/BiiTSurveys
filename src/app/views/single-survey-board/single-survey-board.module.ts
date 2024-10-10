import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSurveyBoardComponent } from './single-survey-board.component';
import {SurveyBoardModule} from "../../shared/survey-board/survey-board.module";
import {SingleSurveyBoardRoutingModule} from "./single-survey-board-routing.module";
import {VerticalBoardModule} from "../../shared/vertical-board/vertical-board.module";



@NgModule({
  declarations: [
    SingleSurveyBoardComponent
  ],
    imports: [
        CommonModule,
        SurveyBoardModule,
        SingleSurveyBoardRoutingModule,
        VerticalBoardModule
    ], exports: [
    SingleSurveyBoardComponent
  ]
})
export class SingleSurveyBoardModule { }
