import { Component } from '@angular/core';

@Component({
  selector: 'app-frequently-qa-card',
  templateUrl: './frequently-qa-card.component.html',
  styleUrls: ['./frequently-qa-card.component.scss']
})
export class FrequentlyQaCardComponent {

  hideShowModal:boolean = false;


  onShowModal(){
    this.hideShowModal = !this.hideShowModal;
  }

}
