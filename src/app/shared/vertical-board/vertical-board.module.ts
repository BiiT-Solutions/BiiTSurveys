import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalBoardComponent } from './vertical-board.component';
import {BiitProgressBarModule} from "@biit-solutions/wizardry-theme/info";
import {TranslocoRootModule} from "@biit-solutions/wizardry-theme/i18n";



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
