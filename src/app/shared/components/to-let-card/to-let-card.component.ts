import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../interfaces/common/product.interface";

@Component({
  selector: 'app-to-let-card',
  templateUrl: './to-let-card.component.html',
  styleUrls: ['./to-let-card.component.scss']
})
export class ToLetCardComponent implements OnInit{
  @Input() data?: Product;
  constructor() {

  }
  ngOnInit(): void {

  }

  getJobType(type: 'matrimonial' | 'job_post' | 'products' | 'to_let') {
    switch(type) {
      case 'products': {
        return 'Products';
      }
      case 'job_post': {
        return 'Job';
      }
      case 'to_let': {
        return 'To Let';
      }
      case 'matrimonial': {
        return 'Matrimonial';
      }
      default: {
        return 'Products';
      }
    }
  }



}
