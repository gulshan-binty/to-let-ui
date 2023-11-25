import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.scss']
})
export class AdditionalInformationComponent {
  // child to parent data binding 
  @Output() additionalInformation = new EventEmitter<number>();
  num3: number = 3;


  onSendNum3() {
    this.additionalInformation.emit(this.num3);
  }
}
