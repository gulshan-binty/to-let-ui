import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DISCOUNT_TYPES, PRODUCT_STATUS} from 'src/app/core/utils/app-data';
import {Category} from 'src/app/interfaces/common/category.interface';
import {Product} from 'src/app/interfaces/common/product.interface';
import {SubCategory} from 'src/app/interfaces/common/sub-category.interface';
import {FilterData} from 'src/app/interfaces/gallery/filter-data';
import {CategoryService} from 'src/app/services/common/category.service';
import {ProductService} from 'src/app/services/common/product.service';
import {SubCategoryService} from 'src/app/services/common/sub-category.service';
import {UiService} from 'src/app/services/core/ui.service';
import {FileUploadService} from 'src/app/services/gallery/file-upload.service';

@Component({
  selector: 'app-product-add-details',
  templateUrl: './product-add-details.component.html',
  styleUrls: ['./product-add-details.component.scss']
})
export class ProductAddDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('formElement') formElement!: NgForm;
  //Store variables
  dataForm!: FormGroup;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  id: string;
  product: Product;
  autoSlug = true;
  isLoading: boolean = false;
  selectedType: string;

  //Files
  files: File[] = [];
  oldImages: string[] = [];
  fileNotPicked: boolean = false;


  //Core field data
  productStatus = PRODUCT_STATUS;
  discountType = DISCOUNT_TYPES


  //Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subAutoSlug: Subscription;

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private uiService: UiService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    this.initForm();
    this.autoGenerateSlug();
    //BASE DATA
    this.getAllCategory();

    this.subDataOne = this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      if (this.id) {
        this.getProductById(this.id);
      }
    })


  }


  initForm() {
    this.dataForm = this.fb.group({
      images: [null],
      name: [null, Validators.required],
      slug: [null, Validators.required],
      category: [null, Validators.required],
      subCategory: [null],
      tags: [null],
      salePrice: [null, Validators.required],
      discountType: [null],
      discountAmount: [null],
      sku: [null],
      status: ['draft', Validators.required],
      description: [null],
      waterSystem: [null],
      productType: [null],
      howLongUsed: [null],
      postType: ['products'],

    });
  }

  setFormValue() {
    this.dataForm.patchValue(this.product);
    if (this.product.category) {
      this.dataForm.patchValue({
        category: this.product?.category?._id
      })
      this.getSubCategory(this.product.category._id);
    }
    if (this.product.subCategory) {
      this.dataForm.patchValue({
        subCategory: this.product?.subCategory?._id
      })
    }

    if (this.product.images) {
      this.oldImages = this.product.images;
    }
  }


  productCategory(event: any) {
    this.selectedType = event.target.value;
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

    let mData = null;
    let category = this.categories.find((m) => m._id === this.dataForm.get('category').value);

    let subCategory = null;

    if (this.dataForm.get('subCategory').value) {
      subCategory = this.subCategories.find((m) => m._id === this.dataForm.get('subCategory').value)
    }

    mData = {
      ...this.dataForm.value,
      ...{
        category: {
          _id: category?._id,
          name: category?.name
        }
      },
      ...{
        subCategory: subCategory ? {
          _id: subCategory?._id,
          name: subCategory?.name
        } : null
      }
    }

    this.isLoading = true;
    if (this.id) {
      if (this.files.length) {
        this.uploadImageServer(mData);
      } else {
        this.updateProduct(mData);
      }

    } else {
      if (this.files.length) {
        this.uploadImageServer(mData);
      } else {
        this.addProduct(mData);
      }

    }

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


  /***
   * HTTP REQUEST HANDLE
   * getAllCategory()
   * getAllSubCategory()
   * getAllTags()
   */
  private getAllCategory() {
    const mSelect = {
      name: 1,
    }
    const filterData: FilterData = {
      select: mSelect,
      filter: {postType: 'products'},
      pagination: null,
      sort: {name: 1}
    }

    this.subDataTwo = this.categoryService.getAllCategory(filterData).subscribe(res => {
        if (res.success) {
          this.categories = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  private getSubCategory(id: string) {
    const mSelect = "name createdAt";
    this.subDataThree = this.subCategoryService.getSubCategoriesByCategoryId(id, mSelect).subscribe((res) => {
        if (res.success) {
          this.subCategories = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  private addProduct(data: any) {
    this.subDataFour = this.productService.addProductByUser(data).subscribe(res => {
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.files = [];
          this.isLoading = false;
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    )
  }

  private updateProduct(data) {
    this.subDataFive = this.productService.updateProductByUser(this.id, data).subscribe(res => {
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
    this.subDataFour = this.productService.getProductById(id).subscribe(res => {
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
   * SELECT CHANGE
   * onChangeCategory()
   */

  onChangeCategory(id: string) {
    this.getSubCategory(id);
  }

  /**
   * LOGICAL PART
   * autoGenerateSlug()
   */
  autoGenerateSlug() {
    if (this.autoSlug) {
      this.subAutoSlug = this.dataForm.get('name').valueChanges
        .pipe(
        ).subscribe(d => {
          const res = d?.trim().replace(/\s+/g, '-').toLowerCase();
          this.dataForm.patchValue({
            slug: res
          });
        });
    } else {
      if (this.subAutoSlug) {
        this.subAutoSlug?.unsubscribe();
      }

    }
  }

  /**
   * NG ON DESTROY
   */

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
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
    if (this.subDataFive) {
      this.subDataFour.unsubscribe();
    }

    if (this.subAutoSlug) {
      this.subAutoSlug?.unsubscribe();
    }
  }


}
