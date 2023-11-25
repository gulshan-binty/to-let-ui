import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MedicineListCardComponent } from './medicine-list-card.component';



@NgModule({
  declarations: [
    MedicineListCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MedicineListCardComponent
  ]
})
export class MedicineListCardModule { }
