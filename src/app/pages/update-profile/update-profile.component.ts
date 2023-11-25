import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, map, shareReplay } from 'rxjs';

import { User } from 'src/app/interfaces/common/user.interface';
import { FileData } from 'src/app/interfaces/gallery/file-data';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';
import { FileUploadService } from 'src/app/services/gallery/file-upload.service';
// import { ImageCropComponent } from '../image-crop/image-crop.component';

import { OrderService } from 'src/app/services/common/order.service';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import {Order} from "../../interfaces/common/order.interface";
import {ImageCropComponent} from "../account/image-crop/image-crop.component";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
// import {Order} from "../../../interfaces/common/order.interface";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent  implements OnInit, OnDestroy {

  // DATA FORM
  dataForm?: FormGroup;
  user: User = null;
  isLoading = false;
  allOrders: Order[];

  // Image Upload
  imageChangedEvent: any = null;
  imgPlaceHolder = "https://lh3.googleusercontent.com/a/AAcHTteNwKyr5uGjFGGShk2mI1fvInjie_S4HktKXhVBbrPg=s96-c";

  pickedImage?: any;
  file: any = null;
  newFileName: string;

  imgBlob: any = null;

  // BREAKPOINTS
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 599px)'])
      .pipe(
          map(result => result.matches),
          shareReplay()
      );
  // Subscriptions
  private subReloadOne: Subscription;
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subOrderData: Subscription;
  private subReload:Subscription;

  constructor(
      private fb: FormBuilder,
      protected userDataService: UserDataService,
      private reloadService: ReloadService,
      private dialog: MatDialog,
      private fileUploadService: FileUploadService,
      private uiService: UiService,
      private breakpointObserver: BreakpointObserver,
      private orderService: OrderService,
      private router: Router,
  ) { }

  ngOnInit(): void {
    this.subReloadOne = this.reloadService.refreshData$.subscribe(() => {
      this.getLoggedInUserInfo();
    });
    this.getLoggedInUserInfo();

    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getOrdersByUser();
    })
    this.getOrdersByUser();

    // FORM INITIALIZE
    this.initialForm();

  }

  /**
   * FORM SUBMIT FUNCTION
   * initialForm()
   * onSubmit();
   */
  initialForm() {
    this.dataForm = this.fb.group({
      name: [null],
      phoneNo: [null],
      email: [null, Validators.required]
    });
  }


  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Invalid Form');
    } else {
      this.updateLoggedInUserInfo(this.dataForm.value);
    }
  }



  /**
   * HTTP REQ HANDLE
   * getLoggedInUserInfo()
   * updateLoggedInUserInfo()
   * imageUploadOnServer()
   * removeOldImageFromServer()
   * getOrdersByUser()
   */

  private getLoggedInUserInfo() {
    this.subDataOne = this.userDataService.getLoggedInUserData()
        .subscribe(res => {
          if (res) {
            this.user = res.data;
            this.dataForm.patchValue(this.user);
            this.userDataService.passUserData(this.user);
            if (this.user.profileImg) {
              this.imgPlaceHolder = this.user.profileImg;
            }
          }
        }, error => {
          console.log(error);
        });
  }

  updateLoggedInUserInfo(data: any) {
    this.isLoading = true;
    this.subDataTwo = this.userDataService.updateLoggedInUserInfo(data)
        .subscribe((res) => {
          this.uiService.success(res.message);
          // this.reloadService.needRefreshData$();
          this.isLoading = false;
          // this.route.n account

          this.router.navigate([environment.userBaseUrl]);
        }, error => {
          this.isLoading = false;
          console.log(error);
        });
  }

  private imageUploadOnServer() {
    const data: FileData = {
      fileName: this.newFileName,
      file: this.imgBlob,
      folderPath: 'admins'
    };
    this.subDataThree = this.fileUploadService.uploadSingleImage(data)
        .subscribe(res => {
          this.removeImageFiles();
          if (this.user?.profileImg) {
            this.removeOldImageFromServer(this.user?.profileImg);
          }
          this.updateLoggedInUserInfo({ profileImg: res?.url });
        }, error => {
          console.log(error);
        });
  }

  private removeOldImageFromServer(imgUrl: string) {
    this.subDataFour = this.fileUploadService.removeSingleFile(imgUrl)
        .subscribe(res => {
          console.log(res.message);
        }, error => {
          console.log(error);
        });
  }


  private getOrdersByUser() {
    const mSelect = {
      orderId: 1,
      grandTotal: 1,
      orderStatus: 1,
      updatedAt:1
    }
    const filterData: FilterData = {
      select: mSelect,
      pagination: null,
      sort: { createdAt: -1 },
      filter: {orderStatus:5}
    }

    this.subOrderData = this.orderService.getOrdersByUser(filterData).subscribe(
        (res) => {
          if (res.success) {
            this.allOrders = res.data;
          }
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
    )
  }
  get grandTotal(){
    return this.allOrders?.map((v) => v.grandTotal)?.reduce((acc,v) => acc + v,0)
  }


  /**
   * ON IMAGE PICK
   * fileChangeEvent()
   * removeImageFiles()
   */

  fileChangeEvent(event: any) {
    this.file = (event.target as HTMLInputElement).files[0];
    // File Name Modify...
    const originalNameWithoutExt = this.file.name.toLowerCase().split(' ').join('-').split('.').shift();
    const fileExtension = this.file.name.split('.').pop();
    // Generate new File Name..
    this.newFileName = `${Date.now().toString()}_${originalNameWithoutExt}.${fileExtension}`;

    const reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = () => {
      this.imgPlaceHolder = reader.result as string;
    };

    // Open Upload Dialog
    if (event.target.files[0]) {
      this.openComponentDialog(event);
    }

    // NGX Image Cropper Event..
    this.imageChangedEvent = event;
  }

  private removeImageFiles() {
    this.file = null;
    this.newFileName = null;
    this.pickedImage = null;
    this.imgBlob = null;
  }


  /**
   * OPEN COMPONENT DIALOG
   * openComponentDialog()
   */
  public openComponentDialog(data?: any) {
    const dialogRef = this.dialog.open(ImageCropComponent, {
      data,
      panelClass: ['theme-dialog'],
      autoFocus: false,
      disableClose: true,
      width: '680px',
      minHeight: '400px',
      maxHeight: '600px'
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.imgBlob) {
          this.imgBlob = dialogResult.imgBlob;
          this.imageUploadOnServer();
        }
        if (dialogResult.croppedImage) {
          this.pickedImage = dialogResult.croppedImage;
          this.imgPlaceHolder = this.pickedImage;
          if (this.pickedImage) {
            this.imageUploadOnServer();
          }
        }
      }
    });
  }

  /***
   * NG ON DESTROY
   */

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe()
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
    if(this.subReloadOne){
      this.subReloadOne.unsubscribe();
    }
    if(this.subOrderData){
      this.subOrderData.unsubscribe();
    }
    if(this.subReload){
      this.subReload.unsubscribe();
    }
  }



}
