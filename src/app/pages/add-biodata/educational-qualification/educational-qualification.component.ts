import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Select} from "../../../interfaces/core/select";
import {EDUCATIONMETHOD, GROUP, HEIGHT_EDUCATION, ISLAMIC_TITLE, RESULT} from "../../../core/db/all-info.db";
import {StorageService} from '../../../services/core/storage.service';
import {Product} from '../../../interfaces/common/product.interface';
import {Subscription} from 'rxjs';
import {ProductService} from '../../../services/common/product.service';
import {UiService} from '../../../services/core/ui.service';


@Component({
  selector: 'app-educational-qualification',
  templateUrl: './educational-qualification.component.html',
  styleUrls: ['./educational-qualification.component.scss']
})
export class EducationalQualificationComponent implements OnInit {

  educationMethod: Select[] = EDUCATIONMETHOD;
  heightEducation: Select[] = HEIGHT_EDUCATION;
  groupData: Select[] = GROUP;
  resultData: Select[] = RESULT;
  islamicTitles: Select[] = ISLAMIC_TITLE;

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
      yourEducationMethod: ['', Validators.required],
      highestEducation: ['', Validators.required],
      sscPassingYear: [null, Validators.required],
      sscGroup: ['', Validators.required],
      sscResult: ['', Validators.required],
      diplomaSubject: [null, Validators.required],
      diplomaInstitution: [null, Validators.required],
      diplomaPassingYear: [null, Validators.required],
      otherEducationalQualifications: [null],
      islamicEducationalTitles: [null],
    });
  }

  private setData() {
    const data = this.storageService.getDataFromSessionStorage('MATRIMONIAL_GENERAL_EDUCATION');
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
        this.storageService.storeDataToSessionStorage('MATRIMONIAL_GENERAL_EDUCATION', this.dataForm.value)

        setTimeout(() => {
          this.isLoader = false;
          console.log(this.dataForm.value);
          this.router.navigate(['/add-biodata/pledge'], {queryParamsHandling: 'merge'});
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
    const select = 'yourEducationMethod highestEducation sscPassingYear sscGroup sscResult diplomaSubject diplomaInstitution diplomaPassingYear otherEducationalQualifications islamicEducationalTitles'
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
          this.router.navigate(['/add-biodata/pledge'], {queryParamsHandling: 'merge'});
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
