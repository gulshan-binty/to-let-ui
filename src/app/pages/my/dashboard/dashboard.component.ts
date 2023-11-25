import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  showHideToggle: boolean = false;

  onShowHide() {
    this.showHideToggle = !this.showHideToggle;
    console.log('hello');
  }

}
