import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompleteRegistrationRoutingModule } from './complete-registration-routing.module';
import { CompleteRegistrationComponent } from './complete-registration.component';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";


@NgModule({
  declarations: [
    CompleteRegistrationComponent
  ],
  imports: [
    CommonModule,
    CompleteRegistrationRoutingModule,
    DigitOnlyModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class CompleteRegistrationModule { }
