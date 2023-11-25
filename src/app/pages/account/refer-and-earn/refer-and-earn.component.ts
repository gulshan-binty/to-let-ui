import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refer-and-earn',
  templateUrl: './refer-and-earn.component.html',
  styleUrls: ['./refer-and-earn.component.scss']
})
export class ReferAndEarnComponent implements OnInit {


  copyTextShow: string = 'Copy share link';

  constructor() { }

  ngOnInit(): void {

  }

  /**
   * COPY BTN FUNCTION
   * onCopyTextShow()
  */
  onCopyTextShow() {
    this.copyTextShow = 'Copied';
  }

}
