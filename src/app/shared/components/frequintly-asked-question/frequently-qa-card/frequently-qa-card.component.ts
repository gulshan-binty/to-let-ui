import {Component, Input} from '@angular/core';
import {Faq} from "../../../../interfaces/common/faq.interface";

@Component({
  selector: 'app-frequently-qa-card',
  templateUrl: './frequently-qa-card.component.html',
  styleUrls: ['./frequently-qa-card.component.scss']
})
export class FrequentlyQaCardComponent {

  @Input() data:Faq;
  hideShowModal:boolean = false;


  onShowModal(){
    this.hideShowModal = !this.hideShowModal;
  }

}
