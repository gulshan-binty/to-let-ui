import { Component } from '@angular/core';

@Component({
  selector: 'app-multiple-add-promotion',
  templateUrl: './multiple-add-promotion.component.html',
  styleUrls: ['./multiple-add-promotion.component.scss']
})
export class MultipleAddPromotionComponent {
  isValid:number = 1;

  onValidChange(data:number){
    this.isValid = data;
  }
}
