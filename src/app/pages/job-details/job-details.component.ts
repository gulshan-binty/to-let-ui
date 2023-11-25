import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CarouselCntrlService } from 'src/app/services/common/carousel-cntrl.service';
import { Product } from "../../interfaces/common/product.interface";
import { ProductService } from "../../services/common/product.service";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  // Image Zoom & View Area
  @ViewChild('zoomViewer', { static: true }) zoomViewer;
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
          console.log('', this.product)
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
