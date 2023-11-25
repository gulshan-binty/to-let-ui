import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// import { WishList } from 'src/app/interfaces/common/wish-list';
// import { WishListService } from 'src/app/services/common/wish-list.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';
import {WishList} from "../../../interfaces/common/wish-list";
import {WishListService} from "../../../services/common/wish-list.service";

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {

  @Input() data: WishList;

  //Subscription
  private subReloadOne: Subscription;
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;


  constructor(
    private wishlistService: WishListService,
    private uiService: UiService,
    private reloadService: ReloadService,

  ) {

  }

  ngOnInit(): void {


  }

  /**
   * HTTP REQUEST HANDLE
   * addToCartDB()
   * getCartByUser()
   * removeWishlistById
   */

  public removeWishlistById(wishlistId: string) {
    this.subDataThree = this.wishlistService.deleteWishListById(wishlistId)
      .subscribe(res => {
        this.reloadService.needRefreshWishList$();
        this.uiService.success(res.message);
      }, error => {
        console.log(error);
      });
    this.reloadService.needRefreshData$();
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
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
  }

}


