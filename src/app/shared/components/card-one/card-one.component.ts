import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../interfaces/common/product.interface";

@Component({
  selector: 'app-card-one',
  templateUrl: './card-one.component.html',
  styleUrls: ['./card-one.component.scss']
})
export class CardOneComponent  implements OnInit{
  @Input() data?: Product;
  constructor() {

  }
  ngOnInit(): void {
    console.log('data', this.data)
  }
}
