import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {MaterialModule} from "../../../material/material.module";
import {DigitOnlyModule} from '@uiowa/digit-only';
import {LoginRoutingModule} from "./login-routing.module";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DigitOnlyModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
