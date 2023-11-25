import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CareerCardComponent } from './career-card.component';



@NgModule({
  declarations: [
    CareerCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CareerCardComponent
  ]
})
export class CareerCardModule { }
