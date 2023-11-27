import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-card-one-loader',
  templateUrl: './product-card-one-loader.component.html',
  styleUrls: ['./product-card-one-loader.component.scss']
})
export class ProductCardOneLoaderComponent {
  @Input() type: string = 'grid';
  constructor() { }

  ngOnInit(): void {
  }
}
