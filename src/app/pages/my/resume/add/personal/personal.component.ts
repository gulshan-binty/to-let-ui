import { Component } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent {

  num1: number = 1;
  num2: number = 0;
  num3: number = 0;

  onBasicInfo(event: number) {
    this.num1 = 4;
    this.num2 = event;
  }

  onAdditionalInfo(event: number) {
    this.num2 = 4;
    this.num3 = event;
  }

}
