import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderCardComponent } from './order-card.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import {PipesModule} from '../../pipes/pipes.module';



@NgModule({
  declarations: [
    OrderCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    OrderCardComponent
  ]
})
export class OrderCardModule { }
