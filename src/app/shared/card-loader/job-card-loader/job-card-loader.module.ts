import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCardLoaderComponent } from './job-card-loader.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";



@NgModule({
  declarations: [
    JobCardLoaderComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    JobCardLoaderComponent
  ],
})
export class JobCardLoaderModule { }
