import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaymentCardComponent } from './payment-card.component';

@NgModule({
  declarations: [
    PaymentCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaymentCardComponent
  ]
})
export class PaymentCardModule { }
