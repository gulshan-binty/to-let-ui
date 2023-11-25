import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomerReviewCardComponent } from './customer-review-card.component';



@NgModule({
  declarations: [
    CustomerReviewCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomerReviewCardComponent
  ]
})
export class CustomerReviewCardModule { }
