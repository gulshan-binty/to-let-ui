import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionsRoutingModule } from './promotions-routing.module';
import { PromotionsComponent } from './promotions.component';
import { MultipleAddPromotionComponent } from './multiple-add-promotion/multiple-add-promotion.component';
import { BuyingApplyingPromotionComponent } from './buying-applying-promotion/buying-applying-promotion.component';


@NgModule({
  declarations: [
    PromotionsComponent,
    MultipleAddPromotionComponent,
    BuyingApplyingPromotionComponent
  ],
  imports: [
    CommonModule,
    PromotionsRoutingModule
  ]
})
export class PromotionsModule { }
