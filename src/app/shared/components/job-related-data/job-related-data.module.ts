import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { JobCardModule } from '../job-card/job-card.module';
import { JobRelatedDataComponent } from './job-related-data.component';



@NgModule({
  declarations: [
    JobRelatedDataComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    JobCardModule
  ],
  exports: [
    JobRelatedDataComponent
  ]
})
export class JobRelatedDataModule { }
