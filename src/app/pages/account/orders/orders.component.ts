import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FilterData} from 'src/app/interfaces/core/filter-data';
import {ReloadService} from 'src/app/services/core/reload.service';
import {Order} from "../../../interfaces/common/order.interface";
import {Product} from 'src/app/interfaces/common/product.interface';
import {ProductService} from 'src/app/services/common/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  //Store Data
  allOrders: Order[];
  selectedStatus: number = 0;
  allProducts: Product[] = [];
  filter = null;
  // Loading
  isLoading = true;
  //Subscriptions
  private subOrderData: Subscription;
  private subReload: Subscription;
  private subDataOne: Subscription;

  constructor(
    private reloadService: ReloadService,
    private productService: ProductService
  ) {

  }

  ngOnInit() {
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getAllProductsByUser();
    })

    /**
     * BASE DATA GET
     */
    this.getAllProductsByUser();
  }


  /**
   * HTTP REQUEST HANDLE GET ALL ORDER BY USER
   *  getOrdersByUser();
   * cancelOrderById()
   * filterOrderList()
   */


  filterOrderList(selectedStatus: number, data?: { postType: 'matrimonial' | 'job_post' | 'products' | 'to_let' }) {
    if (selectedStatus >= 0) {
      this.selectedStatus = selectedStatus;
      this.filter = data;
      this.getAllProductsByUser();
    }
  }

  private getAllProductsByUser() {
    const mSelect = {
      postType: 1,
      name: 1,
      images: 1,
      salePrice: 1,
      discountType: 1,
      discountAmount: 1,
      salaryTo: 1,
      salaryFrom: 1,
      bioDataType: 1,
      createdAt: 1,
      updatedAt: 1,
    }
    const filterData: FilterData = {
      select: mSelect,
      filter: this.filter,
      sort: {createdAt: -1},
      pagination: null
    }

    this.subDataOne = this.productService.getAllProductsByUser(filterData)
      .subscribe(res => {
          this.isLoading = false;
          this.allProducts = res.data;
          console.log('this.allProducts', this.allProducts)
        },
        (err) => {
          if (err) {
            this.isLoading = false;
            console.log(err);
          }
        }
      )
  }

  /**
   * ON DESTROY SUBSCRIPTION
   */
  ngOnDestroy(): void {

    if (this.subOrderData) {
      this.subOrderData.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
  }

}
