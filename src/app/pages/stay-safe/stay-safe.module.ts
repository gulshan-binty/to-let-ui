import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaySafeRoutingModule } from './stay-safe-routing.module';
import { StaySafeComponent } from './stay-safe.component';


@NgModule({
  declarations: [
    StaySafeComponent
  ],
  imports: [
    CommonModule,
    StaySafeRoutingModule
  ]
})
export class StaySafeModule { }
