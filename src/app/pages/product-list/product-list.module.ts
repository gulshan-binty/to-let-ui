import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { CardOneModule } from 'src/app/shared/components/card-one/card-one.module';
import { CustomerReviewModule } from 'src/app/shared/components/customer-review/customer-review.module';
import { FrequintlyAskedQuestionModule } from 'src/app/shared/components/frequintly-asked-question/frequintly-asked-question.module';
import { JobCardModule } from 'src/app/shared/components/job-card/job-card.module';
import { JobRelatedDataModule } from 'src/app/shared/components/job-related-data/job-related-data.module';
import { MatrimonialRelatedDataModule } from 'src/app/shared/components/matrimonial-related-data/matrimonial-related-data.module';
import { ProductCardOneModule } from 'src/app/shared/components/product-card-one/product-card-one.module';
import { ProductsRelatedDataModule } from 'src/app/shared/components/products-related-data/products-related-data.module';
import { ToLetCardModule } from 'src/app/shared/components/to-let-card/to-let-card.module';
import { ToLetRelatedDataModule } from 'src/app/shared/components/to-let-related-data/to-let-related-data.module';
import { ViewCardsModule } from 'src/app/shared/components/view-cards/view-cards.module';
import { ProductListJobComponent } from './product-list-job/product-list-job.component';
import { ProductListMatrimonialComponent } from './product-list-matrimonial/product-list-matrimonial.component';
import { ProductListProductComponent } from './product-list-product/product-list-product.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListToLetComponent } from './product-list-to-let/product-list-to-let.component';
import { ProductListComponent } from './product-list.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductListMatrimonialComponent,
    ProductListProductComponent,
    ProductListJobComponent,
    ProductListToLetComponent
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    MaterialModule,
    MatSliderModule,
    CardOneModule,
    ViewCardsModule,
    CustomerReviewModule,
    FrequintlyAskedQuestionModule,
    RouterModule,
    JobCardModule,
    ToLetCardModule,
    ProductCardOneModule,

    ProductsRelatedDataModule,
    MatrimonialRelatedDataModule,
    JobRelatedDataModule,
    ToLetRelatedDataModule
  ]
})
export class ProductListModule { }
