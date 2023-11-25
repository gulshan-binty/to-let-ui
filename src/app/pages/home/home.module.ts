import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CountUpModule } from 'ngx-countup';
import { MaterialModule } from 'src/app/material/material.module';
import { CountyPopupModule } from 'src/app/shared/components/county-popup/county-popup.module';
import { SwiperModule } from 'swiper/angular';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SwiperModule,
    MaterialModule,
    CountUpModule,
    CountyPopupModule
  ]
})
export class HomeModule {
}
