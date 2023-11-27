import {Component, OnInit} from '@angular/core';
import {Product} from "../../../interfaces/common/product.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../../services/core/storage.service";
import {ProductService} from "../../../services/common/product.service";
import {UiService} from "../../../services/core/ui.service";

@Component({
  selector: 'app-marriage-info',
  templateUrl: './marriage-info.component.html',
  styleUrls: ['./marriage-info.component.scss']
})
export class MarriageInfoComponent implements OnInit {
  id: string;
  private product: Product;
  dataForm: FormGroup;
  isLoader: boolean = false;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {
    this.initialForm();

    this.subDataOne = this.activatedRoute.queryParamMap.subscribe(qParamMap => {
      this.id = qParamMap.get('id');
      if (this.id) {
        this.getProductById();
      } else {
        this.setData();
      }
    })
  }



  /**
   * FORM METHODS
   * initialForm()
   * setData()
   * setFormData()
   * onFormSubmit()
   * onGoBack()
   */


  initialForm() {
    this.dataForm = this.fb.group({
      sarSami: [null],
      chakriSami: [null],
      porasonaSami: [null],
      montobboSami: [null],
      sontanSami: [null],
      obhibabokSami: [null],
      pottshaSami: [null],
      sarNoSami: [null],
    });
  }

  private setData() {
    const data = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_MARRIAGE');
    if (data) {
      this.dataForm.setValue(data);
    }
  }

  private setFormData() {
    if (this.product) {
      this.dataForm.patchValue(this.product);
    }
  }

  onFormSubmit() {
    if (this.dataForm.valid) {
      this.isLoader = true;
      if (this.id) {
        this.updateProductByUser();
      } else {
        this.storageService.storeDataToSessionStorage('MATRIMONIAL_GENERAL_MARRIAGE', this.dataForm.value)

        setTimeout(() => {
          this.isLoader = false;
          console.log(this.dataForm.value);
          this.router.navigate(['/add-biodata/contact'], {queryParamsHandling: 'merge'});
        }, 500);
      }

    }
    else {
      this.dataForm.markAllAsTouched();
    }
  }

  // For form back button
  onGoBack() {
    history.back();
  }

  /**
   * HTTP REQ HANDLE
   * getProductById()
   * updateProductByUser()
   */
  private getProductById() {
    const select = 'sarNoSami sarSami chakriSami porasonaSami montobboSami sontanSami obhibabokSami pottshaSami'
    this.subDataOne = this.productService.getProductById(this.id, select).subscribe({
      next: res => {
        if (res.success) {
          this.product = res.data;
          this.setFormData();
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  private updateProductByUser() {
    this.subDataTwo = this.productService.updateProductByUser(this.id, this.dataForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.uiService.success(res.message);
          this.isLoader = false;
          this.router.navigate(['/add-biodata/contact'], {queryParamsHandling: 'merge'});
        }
      },
      error: err => {
        this.isLoader = false;
        console.log(err)
      }
    })

  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
  }

}
