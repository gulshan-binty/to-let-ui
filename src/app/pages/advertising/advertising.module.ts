import { MaterialModule } from 'src/app/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisingRoutingModule } from './advertising-routing.module';
import { AdvertisingComponent } from './advertising.component';
import { AdvertisingProductComponent } from './advertising-product/advertising-product.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    AdvertisingComponent,
    AdvertisingProductComponent
  ],
  imports: [
    CommonModule,
    AdvertisingRoutingModule,
    MaterialModule,
    MatTabsModule
  ]
})
export class AdvertisingModule { }
