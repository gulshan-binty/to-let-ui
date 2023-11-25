import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreamsAndConditionRoutingModule } from './treams-and-condition-routing.module';
import { TreamsAndConditionComponent } from './treams-and-condition.component';


@NgModule({
  declarations: [
    TreamsAndConditionComponent
  ],
  imports: [
    CommonModule,
    TreamsAndConditionRoutingModule
  ]
})
export class TreamsAndConditionModule { }
