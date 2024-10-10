import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalBoardComponent } from './vertical-board.component';
import {BiitProgressBarModule} from "biit-ui/info";
import {TranslocoRootModule} from "biit-ui/i18n";



@NgModule({
    declarations: [
        VerticalBoardComponent
    ],
    exports: [
        VerticalBoardComponent
    ],
    imports: [
        CommonModule,
        BiitProgressBarModule,
        TranslocoRootModule
    ]
})
export class VerticalBoardModule { }
