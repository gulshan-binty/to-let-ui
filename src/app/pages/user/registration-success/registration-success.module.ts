import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationSuccessRoutingModule } from './registration-success-routing.module';
import { RegistrationSuccessComponent } from './registration-success.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    RegistrationSuccessComponent
  ],
  imports: [
    CommonModule,
    RegistrationSuccessRoutingModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class RegistrationSuccessModule { }
