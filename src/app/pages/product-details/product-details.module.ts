import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardOneModule } from 'src/app/shared/components/card-one/card-one.module';
import { CustomerReviewModule } from 'src/app/shared/components/customer-review/customer-review.module';
import { ExploreMoreCardTwoModule } from 'src/app/shared/components/explore-more-card-two/explore-more-card-two.module';
import { FrequintlyAskedQuestionModule } from 'src/app/shared/components/frequintly-asked-question/frequintly-asked-question.module';
import { ProductsRelatedDataModule } from 'src/app/shared/components/products-related-data/products-related-data.module';
import { ViewCardsModule } from 'src/app/shared/components/view-cards/view-cards.module';
import { SwiperModule } from 'swiper/angular';
import { ExploreMoreComponent } from './explore-more/explore-more.component';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import {PipesModule} from "../../shared/pipes/pipes.module";
import {NgxImageZoomModule} from "ngx-image-zoom";
import {SharedModule} from "../../shared/shared.module";
import {
  ProductCardOneLoaderModule
} from "../../shared/card-loader/product-card-one-loader/product-card-one-loader.module";
import { RelatedProductsComponent } from './related-products/related-products.component';
import {ProductCardOneModule} from "../../shared/components/product-card-one/product-card-one.module";


@NgModule({
  declarations: [
    ProductDetailsComponent,
    ExploreMoreComponent,
    RelatedProductsComponent
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    SwiperModule,
    CardOneModule,
    ExploreMoreCardTwoModule,
    CustomerReviewModule,
    FrequintlyAskedQuestionModule,
    ViewCardsModule,
    ProductsRelatedDataModule,
    PipesModule,
    SharedModule,
    NgxImageZoomModule,
    ProductCardOneLoaderModule,
    ProductCardOneModule,
    SwiperModule,
  ]
})
export class ProductDetailsModule { }
