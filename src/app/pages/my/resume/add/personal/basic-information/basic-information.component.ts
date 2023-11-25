import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent {
  // child to parent data binding 
  @Output() basicInformation = new EventEmitter<number>();
  num2: number = 2;


  onSendNum2() {
    this.basicInformation.emit(this.num2);
    console.log(this.num2);
  }
}
