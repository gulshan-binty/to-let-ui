import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../interfaces/common/product.interface";
import {Subscription} from "rxjs";
import {CarouselCntrlService} from "../../services/common/carousel-cntrl.service";
import {ProductService} from "../../services/common/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-metromony-details',
  templateUrl: './metromony-details.component.html',
  styleUrls: ['./metromony-details.component.scss']
})
export class MetromonyDetailsComponent implements OnInit, OnDestroy {
  // Image Zoom & View Area
  @ViewChild('zoomViewer', {static: true}) zoomViewer;
  product?: Product;
  image: any;
  zoomImage: string;
  id?: string;
  private subDataFive: Subscription;
  constructor(
    private carousel: CarouselCntrlService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getProductById();
      }
    });
  }


  public selectImage(data: any) {
    this.image = data;
  }

  private getProductById() {
    this.subDataFive = this.productService.getProductById(this.id)
      .subscribe(res => {
        if (res.success) {
          this.product = res.data;
          this.setDefaultImage();
        }
      }, error => {
        console.log(error);
      });
  }

  private setDefaultImage() {
    this.image = this.product.images && this.product.images.length > 0 ? this.product.images[0] : '/assets/images/placeholder/test.png';
    this.zoomImage = this.image;
  }



  ngOnDestroy() {
  }




}
