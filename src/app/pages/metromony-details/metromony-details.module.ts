import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatrimonialRelatedDataModule } from 'src/app/shared/components/matrimonial-related-data/matrimonial-related-data.module';
import { MetromonyDetailsRoutingModule } from './metromony-details-routing.module';
import { MetromonyDetailsComponent } from './metromony-details.component';


@NgModule({
  declarations: [
    MetromonyDetailsComponent
  ],
  imports: [
    CommonModule,
    MetromonyDetailsRoutingModule,
    MatrimonialRelatedDataModule
  ]
})
export class MetromonyDetailsModule { }
