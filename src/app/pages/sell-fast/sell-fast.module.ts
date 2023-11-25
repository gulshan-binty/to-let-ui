import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellFastRoutingModule } from './sell-fast-routing.module';
import { SellFastComponent } from './sell-fast.component';


@NgModule({
  declarations: [
    SellFastComponent
  ],
  imports: [
    CommonModule,
    SellFastRoutingModule
  ]
})
export class SellFastModule { }
