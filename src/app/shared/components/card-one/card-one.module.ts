import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardOneComponent } from './card-one.component';



@NgModule({
  declarations: [
    CardOneComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CardOneComponent
  ]
})
export class CardOneModule { }
