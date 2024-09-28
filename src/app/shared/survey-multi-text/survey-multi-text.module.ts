import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyMultiTextComponent } from './survey-multi-text.component';



@NgModule({
  declarations: [
    SurveyMultiTextComponent
  ],
  exports: [
    SurveyMultiTextComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SurveyMultiTextModule { }
