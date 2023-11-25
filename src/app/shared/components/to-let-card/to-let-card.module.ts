import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToLetCardComponent } from './to-let-card.component';
import {PipesModule} from "../../pipes/pipes.module";



@NgModule({
  declarations: [
    ToLetCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    ToLetCardComponent
  ]
})
export class ToLetCardModule { }
