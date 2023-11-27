import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProductCardLoaderComponent } from './user-product-card-loader.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";



@NgModule({
  declarations: [
    UserProductCardLoaderComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    UserProductCardLoaderComponent
  ],
})
export class UserProductCardLoaderModule { }
