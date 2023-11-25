import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProcessingCardComponent } from './processing-card.component';



@NgModule({
  declarations: [
    ProcessingCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProcessingCardComponent
  ]
})
export class ProcessingCardModule { }
