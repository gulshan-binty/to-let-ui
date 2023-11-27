import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CarouselCntrlService } from 'src/app/services/common/carousel-cntrl.service';
import {ProductService} from "../../services/common/product.service";
import {Subscription} from "rxjs";
import {Product} from "../../interfaces/common/product.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  // Image Zoom & View Area
  @ViewChild('zoomViewer', {static: true}) zoomViewer;
  product?: Product;
  image: any;
  zoomImage: string;
  slug?: string;
  private subDataFive: Subscription;
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


  public selectImage(data: any) {
    this.image = data;
  }

  private getProductById() {
    this.subDataFive = this.productService.getProductBySlug(this.slug)
      .subscribe(res => {
        if (res.success) {
          this.product = res.data;
          this.setDefaultImage();
          console.log('555555',this.product)
        }
      }, error => {
        console.log(error);
      });
  }

  private setDefaultImage() {
    this.image = this.product?.images && this.product?.images?.length > 0 ? this.product?.images[0] : '/assets/images/placeholder/test.png';
    this.zoomImage = this.image;
  }



  ngOnDestroy() {
  }




}
