import {Component, Input} from '@angular/core';
import {Order} from "../../../interfaces/common/order.interface";
import {OrderStatus} from "../../../enum/order.enum";
import {Select} from "../../../interfaces/core/select";
import {ORDER_STATUS} from "../../../core/utils/app-data";

@Component({
  selector: 'app-processing-card',
  templateUrl: './processing-card.component.html',
  styleUrls: ['./processing-card.component.scss']
})
export class ProcessingCardComponent {


  @Input() order: Order = null;

  public OrderStatusEnum = OrderStatus;

  public orderStatus: Select[] = ORDER_STATUS;

  constructor() {
  }

  ngOnInit(): void {
  }
}

