import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarouselCntrlService } from 'src/app/services/common/carousel-cntrl.service';
import { Product } from '../../interfaces/common/product.interface';
import { ProductService } from '../../services/common/product.service';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { User } from 'src/app/interfaces/common/user.interface';

@Component({
  selector: 'app-to-let-details',
  templateUrl: './to-let-details.component.html',
  styleUrls: ['./to-let-details.component.scss'],
})
export class ToLetDetailsComponent implements OnInit, OnDestroy {
  // Image Zoom & View Area
  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  product?: Product;
  image: any;
  zoomImage: string;
  slug?: string;
  requestAppointments = [];
  user: User;
  private subDataFive: Subscription;
  constructor(
    private carousel: CarouselCntrlService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.slug = param.get('slug');
      if (this.slug) {
        this.getProductById();
      }
    });

    this.requestAppointments =
      JSON.parse(localStorage.getItem('requestAppointments')) || [];
    this.getLoggedInUserInfo();
  }

  private getLoggedInUserInfo() {
    this.userDataService.getLoggedInUserData().subscribe(
      (res) => {
        if (res) {
          this.user = res.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onRequestAppointment() {
    this.requestAppointments.push({
      id: this.requestAppointments.length + 1,
      name: this.product.name,
      email: this.product.email,
      phone: this.product.phone,
      userNumber: this.user.phoneNo,
      ownerNumber: this.product.phone,
      product: this.product,
      submissionDate: new Date(),
    });
    localStorage.setItem(
      'requestAppointments',
      JSON.stringify(this.requestAppointments)
    );
  }

  public selectImage(data: any) {
    this.image = data;
  }

  private getProductById() {
    this.subDataFive = this.productService
      .getProductBySlug(this.slug)
      .subscribe(
        (res) => {
          if (res.success) {
            this.product = res.data;
            this.setDefaultImage();
            console.log('4444', this.product);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private setDefaultImage() {
    this.image =
      this.product?.images && this.product?.images?.length > 0
        ? this.product?.images[0]
        : '/assets/images/placeholder/test.png';
    this.zoomImage = this.image;
  }

  ngOnDestroy() {}
}
