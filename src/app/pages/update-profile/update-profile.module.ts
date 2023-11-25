import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProfileRoutingModule } from './update-profile-routing.module';
import { UpdateProfileComponent } from './update-profile.component';
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DigitOnlyModule} from "@uiowa/digit-only";
import {PaymentCardModule} from "../../shared/components/payment-card/payment-card.module";


@NgModule({
  declarations: [
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    UpdateProfileRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,

    DigitOnlyModule,
    PaymentCardModule
  ]
})
export class UpdateProfileModule { }
