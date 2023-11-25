import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {PricePipe} from "./price.pipe";
import {DayAgoPipe} from './day-ago.pipe';



@NgModule({
  declarations: [
    PricePipe,
    DayAgoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PricePipe,
    DayAgoPipe
  ]
})
export class PipesModule {
}
