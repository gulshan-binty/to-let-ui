import { Component } from '@angular/core';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent {

  showData: boolean = false;
  showData2: boolean = false;


  onShowData() {
    this.showData = !this.showData;
  }
  onShowData2() {
    this.showData2 = !this.showData2;
    this.onShowData();
  }

}
