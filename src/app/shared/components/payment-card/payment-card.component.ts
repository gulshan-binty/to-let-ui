import { Component, Input } from '@angular/core';
import {Order} from "../../../interfaces/common/order.interface";

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss']
})
export class PaymentCardComponent {

  @Input() paymentData: Order;

}
