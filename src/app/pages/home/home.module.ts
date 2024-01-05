import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CountUpModule } from 'ngx-countup';
import { MaterialModule } from 'src/app/material/material.module';

import { SwiperModule } from 'swiper/angular';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import {ProfileCardModule} from "../../shared/components/profile-card/profile-card.module";
import { SharedModule } from 'src/app/shared/shared.module';
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

    ProfileCardModule,
    SharedModule
  ]
})
export class HomeModule {
}
