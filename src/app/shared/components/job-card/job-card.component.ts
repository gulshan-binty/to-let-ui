import {Component, Input} from '@angular/core';
import {Product} from "../../../interfaces/common/product.interface";

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent {
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
