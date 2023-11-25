import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  private refreshData = new Subject<void>();
  private refreshWishList = new Subject<void>();
  private refreshWishList1 = new BehaviorSubject<boolean>(false);
  private refreshCart = new BehaviorSubject<boolean>(false);
  private refreshMobileSearch = new Subject<void>();
  private refreshSearch = new BehaviorSubject<boolean>(false);
  private refresPlay = new Subject<boolean>();
  /**
   * REFRESH MOBILE SEARCH
   */
  get refreshMobileSearch$() {
    return this.refreshMobileSearch;
  }

  needRefreshSearch$(data?: boolean) {
    if (data && data === true) {
      this.refreshSearch.next(data);
    } else {
      this.refreshSearch.next(false);
    }
  }

  /**
   * REFRESH GLOBAL DATA
   */
  get refreshData$() {
    return this.refreshData;
  }
  needRefreshData$() {
    this.refreshData.next();
  }

  /**
   * REFRESH GLOBAL DATA
   */
  get refreshWishList$() {
    return this.refreshWishList;
  }
  needRefreshWishList$() {
    this.refreshWishList$.next();
  }

  needRefreshWishList1$(data?: boolean) {
    if (data && data === true) {
      this.refreshWishList1.next(data);
    } else {
      this.refreshWishList1.next(false);
    }
  }



  /**
   * REFRES AUTO PLAY GALLERY SLIDE
   */

  get refreshAutoplay$() {
    return this.refresPlay;
  }

  needRefreshAutoPlay$(a: any) {
    this.refresPlay.next(a);
  }
  /**
   * CART
   */
  get refreshCart$() {
    return this.refreshCart;
  }

  needRefreshCart$(data?: boolean) {
    if (data && data === true) {
      this.refreshCart.next(data);
    } else {
      this.refreshCart.next(false);
    }
  }

}
