import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/common/account.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accountShow: boolean = true;
  backOrder:boolean = true;

  constructor(
    private _accountShowService: AccountService
  ) {
    this._accountShowService.accountShow.subscribe((res) => {
      this.accountShow = res;
    });

    this._accountShowService.orderBackShow.subscribe((res) => {
      this.backOrder = res;
    });

  }

  ngOnInit(): void {
    this._accountShowService.accountShow.next(true);
  }

  onShoeSideBar() {
    this._accountShowService.accountShow.next(false);
  }

}
