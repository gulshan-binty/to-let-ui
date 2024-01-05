import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProfileRoutingModule } from './update-profile-routing.module';
import { UpdateProfileComponent } from './update-profile.component';
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DigitOnlyModule} from "@uiowa/digit-only";



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

  ]
})
export class UpdateProfileModule { }
