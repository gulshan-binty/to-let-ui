import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {PostCountDashboard} from '../../../interfaces/common/dashboard.interface';
import {DashboardService} from '../../../services/common/dashboard.service';

@Component({
  selector: 'app-county-popup',
  templateUrl: './county-popup.component.html',
  styleUrls: ['./county-popup.component.scss']
})
export class CountyPopupComponent implements OnInit, OnDestroy {

  postCount: PostCountDashboard;
  hideShowPopup: boolean = false;

  @Output() dataEvent = new EventEmitter<{name: string; value: string}>();


  // Subscriptions
  private subDataOne: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {

  }

  ngOnInit() {
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

  onHidePopup(type: 'matrimonial' | 'job_post' | 'products' | 'to_let') {
    switch(type) {
      case 'matrimonial': {
        this.onHideShowPopup();
        this.dataEvent.emit({name: 'Matrimonial', value: type}, );
        break;
      }
      case 'job_post': {
        this.onHideShowPopup();
        this.dataEvent.emit({name: 'Job Post', value: type}, );
        break;
      }
      case 'to_let': {
        this.onHideShowPopup();
        this.dataEvent.emit({name: 'To-Let', value: type}, );
        break;
      }
      case 'products': {
        this.onHideShowPopup();
        this.dataEvent.emit({name: 'Products', value: type}, );
        break;
      }
      default: {
        this.onHideShowPopup();
        this.dataEvent.emit(null);
        break;
      }
    }
  }


  onHideShowPopup() {
    this.hideShowPopup = !this.hideShowPopup;

    if (!this.hideShowPopup) {
      this.router.navigate([]);
    }
  }

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }

}
