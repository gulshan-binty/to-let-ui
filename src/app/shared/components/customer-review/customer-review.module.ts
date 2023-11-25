import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { CustomerReviewCardModule } from '../customer-review-card/customer-review-card.module';
import { CustomerReviewComponent } from './customer-review.component';



@NgModule({
  declarations: [
    CustomerReviewComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    CustomerReviewCardModule
  ],
  exports: [
    CustomerReviewComponent,
  ]
})
export class CustomerReviewModule { }
