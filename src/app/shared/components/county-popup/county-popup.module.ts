import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountyPopupComponent } from './county-popup.component';
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    CountyPopupComponent
  ],
    imports: [
        CommonModule,
        RouterLink
    ],
  exports: [
    CountyPopupComponent
  ]
})
export class CountyPopupModule { }
