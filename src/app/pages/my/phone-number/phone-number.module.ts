import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneNumberRoutingModule } from './phone-number-routing.module';
import { PhoneNumberComponent } from './phone-number.component';


@NgModule({
  declarations: [
    PhoneNumberComponent
  ],
  imports: [
    CommonModule,
    PhoneNumberRoutingModule
  ]
})
export class PhoneNumberModule { }
