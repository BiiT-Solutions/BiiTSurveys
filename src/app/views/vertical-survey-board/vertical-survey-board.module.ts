import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalSurveyBoardComponent } from './vertical-survey-board.component';
import {VerticalBoardModule} from "../../shared/vertical-board/vertical-board.module";
import {VerticalSurveyBoardRoutingModule} from "./vertical-survey-board-routing.module";
import {SubmittedModule} from "../submitted/submitted.module";



@NgModule({
  declarations: [
    VerticalSurveyBoardComponent
  ],
    imports: [
        CommonModule,
        VerticalBoardModule,
        VerticalSurveyBoardRoutingModule,
        SubmittedModule
    ]
})
export class VerticalSurveyBoardModule { }
