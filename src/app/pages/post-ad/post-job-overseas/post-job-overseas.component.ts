import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from "rxjs";
import {ProductService} from "../../../services/common/product.service";
import {FileUploadService} from "../../../services/gallery/file-upload.service";
import {UiService} from "../../../services/core/ui.service";
import {Product} from '../../../interfaces/common/product.interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-post-job-overseas',
  templateUrl: './post-job-overseas.component.html',
  styleUrls: ['./post-job-overseas.component.scss']
})
export class PostJobOverseasComponent implements OnInit {

  @ViewChild('formElement') formElement: NgForm;
  dataForm!: FormGroup;

  id: string;
  product: Product;
  isLoading: boolean = false;

  //Files
  files: File[] = [];
  oldImages: string[] = [];
  fileNotPicked: boolean = false;

  // Get Select Value
  category: string = '';
  autoSlug = true;

  // Subscriptions
  private subDataOne: Subscription;
  private productAutoSlug: Subscription;

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private productService: ProductService,
    private uiService: UiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    this.initForm();

    this.autoGenerateSlug();

    this.subDataOne = this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      if (this.id) {
        this.getProductById(this.id);
      }
    })
  }


  initForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      slug: [null],
      jobType: [null],
      jobRole: [null, Validators.required],
      salaryTo: [null],
      salaryFrom: [null],
      requiredEducation: [null],
      experience: [null],
      companyName: [null],
      jobPostBy: [null],
      vacancy: [null, Validators.required],
      deadline: [null],
      images: [null],
      address: [null, Validators.required],
      description: [null],
      postType: 'job_post',
      status: 'publish',

    });
  }

  setFormValue() {
    this.dataForm.patchValue(this.product);

    if (this.product.images) {
      this.oldImages = this.product.images;
    }
  }

  onFormSubmit() {

    // Check Form Validation
    if (this.dataForm.invalid) {
      this.dataForm.markAllAsTouched();
      this.uiService.warn('Please filed all the required field');
      return;
    }

    // Check File
    if (!this.files.length && !this.id) {
      this.uiService.warn('Please select product image');
      this.fileNotPicked = true;
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }

    this.isLoading = true;
    if (this.id) {
      if (this.files.length) {
        this.uploadImageServer(this.dataForm.value);
      } else {
        this.updateProduct(this.dataForm.value);
      }

    } else {
      if (this.files.length) {
        this.uploadImageServer(this.dataForm.value);
      } else {
        this.addProduct(this.dataForm.value);
      }

    }
  }


  /**
   * LOGICAL PART
   * autoGenerateSlug()
   */
  autoGenerateSlug() {
    if (this.autoSlug === true) {
      this.productAutoSlug = this.dataForm.get('name').valueChanges
        .pipe(
        ).subscribe(d => {
          const res = d?.trim().replace(/\s+/g, '-').toLowerCase();
          this.dataForm.patchValue({
            slug: res
          });
        });
    } else {
      if (!this.productAutoSlug) {
        return;
      }
      this.productAutoSlug?.unsubscribe();
    }
  }

  /**
   * HTTP REQ HANDLE
   * addProduct()
   */

  private addProduct(data: any) {

    this.subDataOne = this.productService.addProduct(data).subscribe({
      next: res => {
        this.isLoading = false;
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.files = [];
          this.oldImages = []
          console.log("this.oldImages",this.oldImages)
          this.isLoading = false;

        } else {
          this.uiService.warn(res.message);
        }
      },
      error: error => {
        this.isLoading = false;
        console.log(error);
      }
    });
  }

  private updateProduct(data) {
    this.productService.updateProductByUser(this.id, data).subscribe(res => {
        if (res.success) {
          this.uiService.success(res.message);
          this.isLoading = false;
          this.router.navigate(['/account/orders']);
        }
      },
      (err) => {
        this.isLoading = false;
        if (err) {
          console.log(err);
        }
      }
    )
  }

  private getProductById(id) {
    this.productService.getProductById(id).subscribe(res => {
        if (res.success) {
          this.product = res.data;
          this.setFormValue();
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  /**
   * IMAGE DRUG & DROP
   */
  onSelect(event: any[]) {
    this.files = event;
    this.fileNotPicked = false;
  }

  onDeleteOldImage(event: any) {
    this.oldImages = event;
  }

  /***
   * FILE UPLOAD FUNCTIONALITY
   * uploadFile()
   */

  uploadImageServer(data: any) {
    this.subDataOne = this.fileUploadService.uploadMultiImageOriginal(this.files)
      .subscribe({
        next: res => {
          const images = res.map((d) => d.url);
          const finalData = {
            ...data,
            ...{
              images: this.id ? [...images, ...this.oldImages] : images
            }
          };
          if (this.id) {
            this.updateProduct(finalData);
          } else {
            this.addProduct(finalData);
          }

        },
        error: err => {
          this.isLoading = false;
          this.uiService.wrong('Failed! Upload Image Failed, Try again.');
          console.log(err);
        }
      })

  }


}
