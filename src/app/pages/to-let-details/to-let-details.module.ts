import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardOneModule } from 'src/app/shared/components/card-one/card-one.module';
import { CustomerReviewModule } from 'src/app/shared/components/customer-review/customer-review.module';
import { ExploreMoreCardTwoModule } from 'src/app/shared/components/explore-more-card-two/explore-more-card-two.module';
import { FrequintlyAskedQuestionModule } from 'src/app/shared/components/frequintly-asked-question/frequintly-asked-question.module';
import { ToLetRelatedDataModule } from 'src/app/shared/components/to-let-related-data/to-let-related-data.module';
import { ViewCardsModule } from 'src/app/shared/components/view-cards/view-cards.module';
import { SwiperModule } from 'swiper/angular';
import { ExploreMoreComponent } from './explore-more/explore-more.component';
import { ToLetDetailsRoutingModule } from './to-let-details-routing.module';
import { ToLetDetailsComponent } from './to-let-details.component';


@NgModule({
  declarations: [
    ToLetDetailsComponent,
    ExploreMoreComponent
  ],
  imports: [
    CommonModule,
    ToLetDetailsRoutingModule,
    SwiperModule,
    CardOneModule,
    ExploreMoreCardTwoModule,
    CustomerReviewModule,
    FrequintlyAskedQuestionModule,
    ViewCardsModule,
    ToLetRelatedDataModule
  ]
})
export class ToLetDetailsModule { }
