import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-customer-review-card',
  templateUrl: './customer-review-card.component.html',
  styleUrls: ['./customer-review-card.component.scss']
})
export class CustomerReviewCardComponent {
@Input() data:any;

}
