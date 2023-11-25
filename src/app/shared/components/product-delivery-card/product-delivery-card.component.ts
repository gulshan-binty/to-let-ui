import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// import { Order } from 'src/app/interfaces/common/order';
import { OrderService } from 'src/app/services/common/order.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';
import {Order} from "../../../interfaces/common/order.interface";

@Component({
  selector: 'app-product-delivery-card',
  templateUrl: './product-delivery-card.component.html',
  styleUrls: ['./product-delivery-card.component.scss']
})
export class ProductDeliveryCardComponent implements OnInit {

  @Input() deliveryData: Order;

  //Subscriptions
  private subDataOne: Subscription;

  constructor(

  ) { }

  ngOnInit(): void {

  }

}
