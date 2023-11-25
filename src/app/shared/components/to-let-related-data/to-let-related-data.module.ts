import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { ToLetCardModule } from '../to-let-card/to-let-card.module';
import { ToLetRelatedDataComponent } from './to-let-related-data.component';



@NgModule({
  declarations: [
    ToLetRelatedDataComponent
  ],
  imports: [
    CommonModule,
    ToLetCardModule,
    SwiperModule
  ],
  exports: [
    ToLetRelatedDataComponent
  ]
})
export class ToLetRelatedDataModule { }
