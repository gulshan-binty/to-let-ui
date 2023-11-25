import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../interfaces/common/product.interface";

@Component({
  selector: 'app-product-card-one',
  templateUrl: './product-card-one.component.html',
  styleUrls: ['./product-card-one.component.scss']
})
export class ProductCardOneComponent implements OnInit{

  @Input() data?: Product;
  constructor() {

  }
  ngOnInit(): void {
    console.log('data233',this.data);
  }

}
