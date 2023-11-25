import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DATABASE_KEY } from 'src/app/core/utils/global-variable';
import { WishList } from 'src/app/interfaces/common/wish-list';
import { ReloadService } from 'src/app/services/core/reload.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponsePayload } from 'src/app/interfaces/core/response-payload.interface';
import { environment } from 'src/environments/environment';

const API_CART = environment.apiBaseLink + '/api/wishList/';

@Injectable({
  providedIn: 'root'
})
export class WishListService implements OnInit {

  // REFRESH LOCAL STORED CART
  private refreshStoredWishList = new Subject<void>();

  // STORE WISH-LIST DATA
  private wishLists: WishList[] = [];

  constructor(
    private reloadService: ReloadService,
    private httpClient:HttpClient
  ) { }

  ngOnInit(): void {

  }

  /**
   * REFRESH LOCAL STORED CART FUNCTION
   * refreshStoredWishList$()
   * needRefreshStoredWishList$()
  */
  get refreshStoredWishList$() {
    return this.refreshStoredWishList;
  }

  needRefreshStoredWishList$() {
    this.refreshStoredWishList.next();
  }



    /**
  * addToWishList
  * getWishListByUserId
  * deleteWishListById
  * updateWishListById
  * updateWishListQty
  */

    addToWishList(data: WishList) {
      return this.httpClient.post<ResponsePayload>
        (API_CART + 'add-to-wish-list', data);
    }

    addToWishListMultiple(data: WishList[]) {
      return this.httpClient.post<ResponsePayload>
        (API_CART + 'add-to-wish-list-multiple', data);
    }

    getWishListByUser() {
      return this.httpClient.get<{ data: WishList[], count: number, success: boolean }>(API_CART + 'get-wish-lists-by-user');
    }

    deleteWishListById(id: string, checkUsage?: boolean) {
      let params = new HttpParams();
      if (checkUsage) {
        params = params.append('checkUsage', checkUsage);
      }
      return this.httpClient.delete<ResponsePayload>(API_CART + 'delete/' + id, { params });
    }

    updateWishListById(id: string, data: WishList) {
      return this.httpClient.put<{ message: string, success: boolean }>(API_CART + 'update/' + id, data);
    }

    updateWishListQty(id: string, data: { selectedQty: number, type: string }) {
      return this.httpClient.put<{ message: string, success: boolean }>(API_CART + 'update-qty/' + id, data);
    }

  /**
   * Wishlist LOCAL STORAGE
   * addWishListItemToLocalStorage()
   * getWishListItemFromLocalStorage()
   * deleteWishListItemFromLocalStorage()
   * deleteAllWishListFromLocal()
  */
  addWishListItemToLocalStorage(wishListItem: WishList) {
    const items = JSON.parse(localStorage.getItem(DATABASE_KEY.userWishList));
    let wishLists = [];
    if (!items) {
      wishLists = [];
      wishLists.push(wishListItem);
    } else {
      wishLists = items;
      const fIndex = wishLists.findIndex((o) => o.product === wishListItem.product);
      if (fIndex === -1) {
        wishLists.push(wishListItem);
      } else {
        wishLists.splice(fIndex, 1);
      }
    }
    localStorage.setItem(DATABASE_KEY.userWishList, JSON.stringify(wishLists));
  }

  getWishListItemFromLocalStorage(): WishList[] {
    const wishLists = localStorage.getItem(DATABASE_KEY.userWishList);
    if (wishLists === null) {
      return [];
    }
    return JSON.parse(wishLists) as WishList[];
  }

  deleteWishListItemFromLocalStorage(id: string) {
    const items = JSON.parse(localStorage.getItem(DATABASE_KEY.userWishList));
    const filtered = items.filter(el => el.product !== id);
    localStorage.setItem(DATABASE_KEY.userWishList, JSON.stringify(filtered));
  }

  deleteAllWishListFromLocal(refresh?: boolean) {
    localStorage.removeItem(DATABASE_KEY.userWishList);
    this.reloadService.needRefreshWishList1$(refresh ? refresh : false);
  }

  /**
   * CART STORE & GET LOCALLY
   * updateWishListList()
   * wishListItems()
  */
  public updateWishListList(data: WishList[]) {
    this.wishLists = data;
    this.needRefreshStoredWishList$();
  }

  public get wishListItems() {
    return [...this.wishLists]
  }

}
