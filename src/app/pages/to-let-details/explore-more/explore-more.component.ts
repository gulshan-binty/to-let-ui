import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostCountDashboard} from "../../../interfaces/common/dashboard.interface";
import {Subscription} from "rxjs";
import {HeaderService} from "../../../services/common/header.service";
import {DashboardService} from "../../../services/common/dashboard.service";

@Component({
  selector: 'app-explore-more',
  templateUrl: './explore-more.component.html',
  styleUrls: ['./explore-more.component.scss']
})
export class ExploreMoreComponent implements OnInit, OnDestroy {

  showMoreData: boolean = false;
  postCount: PostCountDashboard;

  // Subscriptions
  private subDataOne: Subscription;

  constructor(
    private _headerService: HeaderService,
    private dashboardService: DashboardService,
  ) {

  }


  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this._headerService.bService.next(false);
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }
  categoryItems:any=[
    {

    }
  ]

}
