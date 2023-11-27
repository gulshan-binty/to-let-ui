import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../interfaces/common/product.interface";
import {WishList} from "../../../interfaces/common/wish-list";
import {WishListService} from "../../../services/common/wish-list.service";
import {Subscription} from "rxjs";
import {UiService} from "../../../services/core/ui.service";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../services/common/user.service";
import {ReloadService} from "../../../services/core/reload.service";
import {Router} from "@angular/router";
import {Cart} from "../../../interfaces/common/cart.interface";

@Component({
  selector: 'app-product-card-one',
  templateUrl: './product-card-one.component.html',
  styleUrls: ['./product-card-one.component.scss']
})
export class ProductCardOneComponent implements OnInit{
  wishlists: WishList[] = [];
  wishlist: WishList = null;
  @Input() data?: Product;
  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subReloadOne: Subscription;
  private subReloadTwo: Subscription;

  constructor(
    private wishListService: WishListService,
    private userService: UserService,
    private reloadService: ReloadService,
    private uiService: UiService,
    private dialog: MatDialog,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    // WiSHLIST FUNCTION STORED
    this.subReloadTwo = this.wishListService.refreshStoredWishList$.subscribe(() => {
      this.wishlists = this.wishListService.wishListItems;
      this.checkWishList();
    });
    this.wishlists = this.wishListService.wishListItems;
    this.checkWishList();

    // WiSHLIST FUNCTION STORED
    this.subReloadTwo = this.wishListService.refreshStoredWishList$.subscribe(() => {
      this.wishlists = this.wishListService.wishListItems;
      this.checkWishList();
    });
    this.wishlists = this.wishListService.wishListItems;
    this.checkWishList();
  }


  onAddToWishList(event: MouseEvent) {
    event.stopPropagation();
    if (this.wishlist) {
      this.removeWishlistById(this.wishlist?._id);
    } else {
      const data: WishList = {
        product: this.data?._id,
        selectedQty: 1,
      };
      if (this.userService.getUserStatus()) {
        this.addToWishListDB(data);
      } else {
        this.router.navigate(['/login']);
        this.reloadService.needRefreshWishList$();
      }
    }

  }


  addToWishListDB(data: Cart) {
    this.subDataThree = this.wishListService.addToWishList(data)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshWishList$();
      }, error => {
        console.log(error);
      });
  }

  public removeWishlistById(wishlistId: string) {
    this.subDataFour = this.wishListService.deleteWishListById(wishlistId)
      .subscribe(res => {
        this.reloadService.needRefreshWishList$();
        this.uiService.success(res.message);
      }, error => {
        console.log(error);
      });
  }

  checkWishList() {
    this.wishlist = this.wishlists.find(f => (f.product as Product)?._id === this.data?._id);
  }


  /**
   * NG ON DESTROY
   */
  ngOnDestroy() {
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
    if (this.subReloadOne) {
      this.subReloadOne.unsubscribe();
    }
    if (this.subReloadTwo) {
      this.subReloadTwo.unsubscribe();
    }
  }


}
