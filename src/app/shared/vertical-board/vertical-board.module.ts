import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalBoardComponent } from './vertical-board.component';
import {BiitProgressBarModule} from "biit-ui/info";



@NgModule({
    declarations: [
        VerticalBoardComponent
    ],
    exports: [
        VerticalBoardComponent
    ],
  imports: [
    CommonModule,
    BiitProgressBarModule
  ]
})
export class VerticalBoardModule { }
