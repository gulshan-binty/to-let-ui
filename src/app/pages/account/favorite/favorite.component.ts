import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WishList } from 'src/app/interfaces/common/wish-list';
import { WishListService } from 'src/app/services/common/wish-list.service';
import { ReloadService } from 'src/app/services/core/reload.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {

  //Store Data
  wishlists: WishList[];

  //Subscription
  private subReloadOne: Subscription;
  private subDataOne: Subscription;


  constructor(
    private wishlistService: WishListService,
    private reloadService: ReloadService,

  ) {

  }

  ngOnInit(): void {

    /**
     * REALOAD WISH AND CART
     */
    this.subReloadOne = this.reloadService.refreshWishList$.subscribe(() => {
      this.getWishListByUser();
    });
    

    /**
     * GET BASE DATA
     */
    this.getWishListByUser();

  }


  /**
   * HTTP REQUEST HANDLE 
   * getWishListByUser()
   */
  private getWishListByUser() {
    this.subDataOne = this.wishlistService.getWishListByUser()
      .subscribe(res => {
        this.wishlists = res.data;
      }, error => {
        console.log(error);
      });
  }

  /**
   * NG ON DESTROY
   */
  ngOnDestroy(): void {
    if (this.subReloadOne) {
      this.subReloadOne.unsubscribe();
    }
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }

}
