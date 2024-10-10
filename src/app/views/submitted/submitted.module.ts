import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedComponent } from './submitted.component';
import {BiitIconModule} from "biit-ui/icon";
import {BiitButtonModule} from "biit-ui/button";



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
