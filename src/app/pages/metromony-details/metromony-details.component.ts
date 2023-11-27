import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../interfaces/common/product.interface";
import {Subscription} from "rxjs";
import {CarouselCntrlService} from "../../services/common/carousel-cntrl.service";
import {ProductService} from "../../services/common/product.service";
import {ActivatedRoute} from "@angular/router";
import {UtilsService} from "../../services/core/utils.service";
import {ContactRequest} from "../../interfaces/common/contact-request.interface";
import {ReloadService} from "../../services/core/reload.service";
import {ContactRequestService} from "../../services/common/contact-request.service";
import {UiService} from "../../services/core/ui.service";
import {UserService} from "../../services/common/user.service";
import {SocialShareComponent} from "../../shared/ui/social-share/social-share.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-metromony-details',
  templateUrl: './metromony-details.component.html',
  styleUrls: ['./metromony-details.component.scss']
})
export class MetromonyDetailsComponent implements OnInit, OnDestroy {
  // Image Zoom & View Area
  @ViewChild('zoomViewer', {static: true}) zoomViewer;
  product?: Product;
  requestData?: ContactRequest;
  image: any;
  zoomImage: string;
  id?: string;
  userId?: string;
  private subDataFive: Subscription;
  private subDataOne: Subscription;

  constructor(
    private carousel: CarouselCntrlService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    public utilsService: UtilsService,
    public reloadService: ReloadService,
    private dialog: MatDialog,
    private contactRequestService: ContactRequestService,
    private uiService: UiService,
    private userService: UserService,
  ) {
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getProductById();

      }
    });

    this.userId = this.userService.getUserId()

  }


  public selectImage(data: any) {
    this.image = data;
  }


  /**
   * HTTP REQ HANDLE
   * getProductById()
   * getContactRequestUserById()
   * addContactRequest()
   */
  private getProductById() {
    this.subDataFive = this.productService.getProductById(this.id)
      .subscribe(res => {
        if (res.success) {
          this.product = res.data;
          this.setDefaultImage();
          this.getContactRequestUserById();
        }
      }, error => {
        console.log(error);
      });
  }


  private getContactRequestUserById() {
    this.subDataOne = this.contactRequestService.getContactRequestUserById(this.product?._id)
      .subscribe({
        next: (res => {
          this.requestData = res.data;
          console.log("getContactRequestUserById--", this.requestData)
          console.log(" this.userId--", this.userId)

        }),
        error: (error => {
          console.log(error);
        })
      });
  }

  private addContactRequest(data: any) {
    this.subDataOne = this.contactRequestService.addContactRequest(data)
      .subscribe({
        next: (res => {
          if (res.success === true) {
            this.uiService.success(res.message);
            this.reloadService.needRefreshData$();
          } else {
            this.uiService.warn(res.message);
          }

        }),
        error: (error => {
          console.log(error);
        })
      });
  }

// Contact request function
  contactRequest() {
    const mData = {
      product: this.product._id,
      status: false,
      requestDate: this.utilsService.getDateString(new Date()),
    }
    this.addContactRequest(mData);
  }


  private setDefaultImage() {
    this.image = this.product.images && this.product.images.length > 0 ? this.product.images[0] : '/assets/images/placeholder/test.png';
    this.zoomImage = this.image;
  }


  openDialog() {
    this.dialog.open(SocialShareComponent, {
      data: this.product,
      maxWidth: "480px",
      width: "100%",
      height: "auto",
      panelClass: ['social-share', 'social-dialog']
    })
  }


  ngOnDestroy() {

    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }

    if (this.subDataFive) {
      this.subDataFive.unsubscribe();
    }
  }


}
