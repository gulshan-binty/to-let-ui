import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/common/user.interface';
import { AccountService } from 'src/app/services/common/account.service';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { UserService } from 'src/app/services/common/user.service';
import { ReloadService } from 'src/app/services/core/reload.service';

import { ShopInformation } from 'src/app/interfaces/common/shop-information.interface';
import { ShopInformationService } from 'src/app/services/common/shop-information.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.scss']
})
export class AccountSidebarComponent implements OnInit, OnDestroy {

  //Store Data

  user: User;
  imagePlaceholder: string = '/assets/images/jpg/dummy-image.jpg';
  // shopInfo: ShopInformation | any;
  isOpen = false;

  //Subscriptions
  private subUserData: Subscription;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private userDataService: UserDataService,
    private reloadService: ReloadService,
    private accountService: AccountService,
    private shopService: ShopInformationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.subUserData = this.reloadService.refreshData$.subscribe(() => {
      this.getLoggedInUserInfo();
    })
    this.getLoggedInUserInfo();

    // this.getShopInformation();

    this.activatedRoute.queryParamMap.subscribe((res) => {
      if (res.get('dialogOpen') !== null) {
        if (res.get('dialogOpen') === 'true') {
          this.isOpen = true;
        } else {
          this.dialog.closeAll();
        }
      } else {
        this.dialog.closeAll();
      }
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.router.navigate([], { queryParams: { dialogOpen: null }, queryParamsHandling: 'merge' });
    });
  }

  /**
   * HTTP REQ HANDLE
   * getLoggedInUserInfo()
   */
  private getLoggedInUserInfo() {
    this.subUserData = this.userDataService.getLoggedInUserData()
      .subscribe(res => {
        if (res) {
          this.user = res.data;
          if (this.user?.profileImg) {
            this.imagePlaceholder = this.user?.profileImg;
          }
        }
      }, error => {
        console.log(error);
      });
  }

  // private getShopInformation() {
  //   this.subUserData = this.shopService.getShopInformation().subscribe((res) => {
  //     if (res.success) {
  //       this.shopInfo = res.data;
  //     }
  //   },
  //     (err) => {
  //       console.log(err);
  //     }
  //   )
  // }

  /**
   * Dialog View
   * openDialog()
   */


  //Log Out
  userLogOut() {
    this.userService.userLogOut();
    this.accountService.accountShow.next(true);
  }

  onShowProfile() {
    this.accountService.accountShow.next(true);
  }

  /**
   * NG ON DESTROY
   */

  ngOnDestroy(): void {
    if (this.subUserData) {
      this.subUserData.unsubscribe();
    }
  }

}
