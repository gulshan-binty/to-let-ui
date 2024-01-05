import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { DashboardService } from '../../services/common/dashboard.service';
import { PostCountDashboard } from '../../interfaces/common/dashboard.interface';
import { HeaderService } from '../../services/common/header.service';
import { MatDialog } from "@angular/material/dialog";
import { CongratulationDialogComponent } from 'src/app/shared/ui/congratulation-dialog/congratulation-dialog.component';
import { ReloadService } from 'src/app/services/core/reload.service';
import { FailDialogComponent } from 'src/app/shared/ui/fail-dialog/fail-dialog.component';
import {UsersService} from "../../services/common/users.service";
import {UserService} from "../../services/common/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  showMoreData: boolean = false;
  postCount: PostCountDashboard;

  // Subscriptions
  private subDataOne: Subscription;

  constructor(
    private _headerService: HeaderService,
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private reloadService:ReloadService,
    private userService:UserService,
    private router: Router,
  ) {

  }


  ngOnInit(): void {

    this.subDataOne = this.reloadService.refreshDialog$.subscribe((res) => {
         if(res === true ){
            this.openPassedDialog();
         }else{
          this.openFailDialog();
         }
    })





    this._headerService.bService.next(true);
    this.getPostCount();

  }

  /**
   * HTTP REQ HANDLE
   * getPostCount()
   */

  private getPostCount() {
    this.subDataOne = this.dashboardService
      .getPostCountWithCache()
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.postCount = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onShowMore() {
    this.showMoreData = !this.showMoreData;
  }


  /**
   * UpcomingDialogComponent
   * openDialog()
   * openPassedDialog()
   */



  openPassedDialog() {
    this.dialog.open(CongratulationDialogComponent, {
      maxWidth: "500px",
      width: '100%',
      height: 'auto'
    })
  }

  openFailDialog() {
    this.dialog.open(FailDialogComponent, {
      maxWidth: "500px",
      width: '100%',
      height: 'auto'
    })
  }

  ngOnDestroy(): void {
    this._headerService.bService.next(false);
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }

}
