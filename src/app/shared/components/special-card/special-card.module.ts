import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpecialCardComponent } from './special-card.component';



@NgModule({
  declarations: [
    SpecialCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SpecialCardComponent
  ]
})
export class SpecialCardModule { }
