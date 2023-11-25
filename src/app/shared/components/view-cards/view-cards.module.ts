import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardOneModule } from 'src/app/shared/components/card-one/card-one.module';
import { SwiperModule } from 'swiper/angular';
import { ViewCardsComponent } from './view-cards.component';



@NgModule({
  declarations: [
    ViewCardsComponent
  ],
  imports: [
    CommonModule,
    CardOneModule,
    SwiperModule
  ],
  exports: [
    ViewCardsComponent
  ]
})
export class ViewCardsModule { }
