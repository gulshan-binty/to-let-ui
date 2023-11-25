import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { CardOneModule } from '../card-one/card-one.module';
import { MatrimonialRelatedDataComponent } from './matrimonial-related-data.component';



@NgModule({
  declarations: [
    MatrimonialRelatedDataComponent
  ],
  imports: [
    CommonModule,
    CardOneModule,
    SwiperModule
  ],
  exports: [
    MatrimonialRelatedDataComponent
  ]
})
export class MatrimonialRelatedDataModule { }
