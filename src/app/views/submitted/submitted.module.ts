import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedComponent } from './submitted.component';
import {BiitIconModule} from "@biit-solutions/wizardry-theme/icon";
import {BiitButtonModule} from "@biit-solutions/wizardry-theme/button";



@NgModule({
  declarations: [
    SubmittedComponent
  ],
  exports: [
    SubmittedComponent
  ],
  imports: [
    CommonModule,
    BiitIconModule,
    BiitButtonModule
  ]
})
export class SubmittedModule { }
