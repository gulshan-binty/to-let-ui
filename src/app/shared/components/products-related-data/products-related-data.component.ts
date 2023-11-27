import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../interfaces/common/product.interface";
import {Subscription} from "rxjs";
import {CarouselCntrlService} from "../../../services/common/carousel-cntrl.service";
import {ProductService} from "../../../services/common/product.service";
import {ActivatedRoute} from "@angular/router";
import {Pagination} from "../../../interfaces/core/pagination";
import {FilterData} from "../../../interfaces/core/filter-data";

@Component({
  selector: 'app-products-related-data',
  templateUrl: './products-related-data.component.html',
  styleUrls: ['./products-related-data.component.scss']
})
export class ProductsRelatedDataComponent implements OnInit, OnDestroy {
  product?: Product;
  image: any;
  slug?: string;
  isLoading = true;
  relatedProducts?: Product[];
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  constructor(
    private carousel: CarouselCntrlService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.slug = param.get('slug');
      if (this.slug) {
        this.getProductById();
      }
    });
  }


  private getProductById() {
    this.subDataFive = this.productService.getProductBySlug(this.slug)
      .subscribe(res => {
        if (res.success) {
          this.product = res.data;
          this.getRelatedProducts();
        }
      }, error => {
        console.log(error);
      });
  }



  private getRelatedProducts() {
    const pagination: Pagination = {
      pageSize: 10,
      currentPage: 0
    };

    const mSelect = {
      name: 1,
      images: 1,
      prices: 1,
      tags: 1,
      slug: 1,
      genericName: 1,
    }
    const filterData: FilterData = {
      pagination: pagination,
      filter: {
        'category._id': this.product?.category?._id
      },
      select: mSelect,
      sort: {createdAt: 1}
    }

    this.subDataSix = this.productService.getAllProducts(filterData, null)
      .subscribe({
        next: (res => {
          if (res.data && res.data.length) {
            this.isLoading = false;
            this.relatedProducts = res.data.filter(f => f._id !== this.product?._id);
          }

        }),
        error: (error => {
          this.isLoading = false;
          console.log(error);
        })
      });
  }



  /**
   * NG ON DESTROY
   */
  ngOnDestroy(): void {
    if (this.subDataFive) {
      this.subDataFive.unsubscribe();
    }
    if (this.subDataSix) {
      this.subDataSix.unsubscribe();
    }
  }
}
