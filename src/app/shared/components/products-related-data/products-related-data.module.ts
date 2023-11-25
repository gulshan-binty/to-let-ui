import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { ProductCardOneModule } from '../product-card-one/product-card-one.module';
import { ProductsRelatedDataComponent } from './products-related-data.component';



@NgModule({
  declarations: [
    ProductsRelatedDataComponent
  ],
  imports: [
    CommonModule,
    ProductCardOneModule,
    SwiperModule,
  ],
  exports: [
    ProductsRelatedDataComponent
  ]
})
export class ProductsRelatedDataModule { }
