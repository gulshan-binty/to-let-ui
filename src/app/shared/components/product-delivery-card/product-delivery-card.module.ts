import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ProductDeliveryCardComponent } from './product-delivery-card.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    ProductDeliveryCardComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    ProductDeliveryCardComponent
  ]
})
export class ProductDeliveryCardModule { }
