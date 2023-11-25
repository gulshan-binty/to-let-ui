import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardOneModule } from 'src/app/shared/components/card-one/card-one.module';
import { CustomerReviewModule } from 'src/app/shared/components/customer-review/customer-review.module';
import { ExploreMoreCardTwoModule } from 'src/app/shared/components/explore-more-card-two/explore-more-card-two.module';
import { FrequintlyAskedQuestionModule } from 'src/app/shared/components/frequintly-asked-question/frequintly-asked-question.module';
import { JobRelatedDataModule } from 'src/app/shared/components/job-related-data/job-related-data.module';
import { ViewCardsModule } from 'src/app/shared/components/view-cards/view-cards.module';
import { SwiperModule } from 'swiper/angular';
import { ExploreMoreComponent } from './explore-more/explore-more.component';
import { JobDetailsComponentRoutingModule } from './job-details-routing.module';
import { JobDetailsComponent } from './job-details.component';


@NgModule({
  declarations: [
    JobDetailsComponent,
    ExploreMoreComponent
  ],
  imports: [
    CommonModule,
    JobDetailsComponentRoutingModule,
    SwiperModule,
    CardOneModule,
    ExploreMoreCardTwoModule,
    CustomerReviewModule,
    FrequintlyAskedQuestionModule,
    ViewCardsModule,
    JobRelatedDataModule
  ]
})
export class JobDetailsModule { }
