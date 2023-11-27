import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { ProductCardOneModule } from '../product-card-one/product-card-one.module';
import { ProductsRelatedDataComponent } from './products-related-data.component';
import {ProductCardOneLoaderModule} from "../../card-loader/product-card-one-loader/product-card-one-loader.module";



@NgModule({
  declarations: [
    ProductsRelatedDataComponent
  ],
  imports: [
    CommonModule,
    ProductCardOneModule,
    SwiperModule,
    ProductCardOneLoaderModule
  ],
  exports: [
    ProductsRelatedDataComponent
  ]
})
export class ProductsRelatedDataModule { }
