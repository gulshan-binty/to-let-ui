import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetromonialCardLoaderComponent } from './metromonial-card-loader.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";



@NgModule({
  declarations: [
    MetromonialCardLoaderComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    MetromonialCardLoaderComponent
  ],
})
export class MetromonialCardLoaderModule { }
