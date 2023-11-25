import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  showDropDown: number;

  constructor() {

  }

  ngOnInit(): void {

  }

  /**
   * DROP DOWN SHOW AND HIDE
   * onShowNumber()
  */
  onShowNumber(num: number) {
    if (this.showDropDown === num) {
      this.showDropDown = 0;
    }
    else {
      this.showDropDown = num;
    }
  }

}

