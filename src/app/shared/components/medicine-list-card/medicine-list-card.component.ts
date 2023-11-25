import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medicine-list-card',
  templateUrl: './medicine-list-card.component.html',
  styleUrls: ['./medicine-list-card.component.scss']
})
export class MedicineListCardComponent {

  @Input() medData: any;

  ngOnInit(){
  }

}
