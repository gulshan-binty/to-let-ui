import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../interfaces/common/category.interface";
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Product} from "../../interfaces/common/product.interface";
import {GalleryService} from "../../services/gallery/gallery.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Division} from "../../interfaces/common/division.interface";
import {AreaService} from "../../services/common/area.service";
import {Subscription} from "rxjs";
import {CategoryService} from "../../services/common/category.service";
import {DivisionService} from "../../services/common/division.service";
import {ZoneService} from "../../services/common/zone.service";
import {UiService} from "../../services/core/ui.service";
import {Area} from "../../interfaces/common/area.interface";
import {ProductService} from "../../services/common/product.service";
import {Gallery} from "../../interfaces/gallery/gallery.interface";
import {Select} from "../../interfaces/core/select";
import {FileUploadService} from "../../services/gallery/file-upload.service";
import {ReloadService} from "../../services/core/reload.service";
import {FilterData} from "../../interfaces/core/filter-data";

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.scss']
})
export class AddJobsComponent implements OnInit {
  @ViewChild('formElement') formElement: NgForm;



  //Store Data
  product: Product;

  categorys: Category[] = [];

  divisions: Division[] = [];
  area: Area[] = [];

  id?: string;

  acceptTerms: boolean = false;

  // Image
  files: File[] | any = [];
  pickedImage: any[] = [];
  oldImages: string[] = [];
  removeImages: string[] = [];

  //Form Variables
  dataForm!: FormGroup;
  dayHoursArray?: FormArray;

  showCreate: boolean = false;
  showAll: boolean = false;


  onSelectedCategory: string = 's'
  onSelectedType: string = ';df';


  // FilterData
  filter: any = null;

  // Loading
  isLoading: boolean =false;

  // all Days
  allDays: Select[] = [
    {value: 'Monday', viewValue: 'Monday'},
    {value: 'Tuesday', viewValue: 'Tuesday'},
    {value: 'Wednesday', viewValue: 'Wednesday'},
    {value: 'Thursday', viewValue: 'Thursday'},
    {value: 'Friday', viewValue: 'Friday'},
    {value: 'Saturday', viewValue: 'Saturday'},
    {value: 'Sunday', viewValue: 'Sunday'},
  ]

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subDataSeven: Subscription;
  private subForm: Subscription;
  private subDivisionData: Subscription;
  private subAreaData: Subscription;
  private subZoneData: Subscription;
  private subParamp: Subscription;

  constructor(
    private uiService: UiService,
    private divisionService: DivisionService,
    private areaService: AreaService,
    private zoneService: ZoneService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private galleryService: GalleryService,
    private reloadService: ReloadService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.subParamp = this.activatedRoute.queryParamMap.subscribe((res) => {
      this.id = res.get('id');
      if (this.id) {
        this.showCreate= true;
        this.showAll= true;
        this.getSingleProductById(this.id);
      }
    });
    this.initForm();
    // Base Data
    this.getAllCategory();
    this.getAllDivision();
  }


  /***
   * FORM HANDLE
   * initForm()
   * onSubmit()
   */

  initForm() {
    this.dataForm = this.fb.group({
      description: [null],
      pricing: [null],
      category: [null, Validators.required],
      type: [null, Validators.required],
      bodyType: [null],
      name: [null],
      hairColor: [null],
      intimateHair: [null],
      orientation: [null],
      division: [null],
      brand: [null],
      tags: [null],
      openingHours: [null],
      title: [null, Validators.required],
      age: [null],
      height: [null],
      weight: [null],
      runningOut: [null],
      acceptsPeople: [null],
      size: [null],
      specialHours: [null],
      zipCode: [null],
      address: [null],
      phone: [null],
      whatsApp: [null],
      email: [null],
      homePage: [null],
      images: [null],
      area: [null],
      zone: [null],
      videoUrl: [null],
      status: 'publish',
      dayHours: this.fb.array([]),

    });
    this.dayHoursArray = this.dataForm.get('dayHours') as FormArray;
  }

  // Form Array
  onAddNewFormArrayObject(formControl: string) {
    const f = this.fb.group({
      day: [null, Validators.required],
      startHour: [null, Validators.required],
      endHour: [null, Validators.required],
    });
    (this.dataForm?.get(formControl) as FormArray).push(f);
  }

  removeFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'dayHours': {
        formDataArray = this.dayHoursArray;
        break;
      }
      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
  }


  onSubmit() {
    if (!this.acceptTerms) {
      this.uiService.wrong('Please accept terms and conditions');
      return;
    }
    if (this.dataForm.invalid) {
      this.uiService.warn('Invali form');
      this.dataForm.markAllAsTouched();
    } else {
      let selectCategory = this.categorys.find((d) => d._id === this.dataForm.value.category);
      let selectDivision = this.divisions.find((d) => d._id === this.dataForm.value.division);
      let selectArea = this.area.find((d) => d._id === this.dataForm.value.area);
      const mData = {
        ...this.dataForm.value,
        ...{category: selectCategory},
        ...{division: selectDivision},
        ...{area: selectArea},
      }



      this.isLoading = true;
      // Main Function
      if (this.product) {
        if (this.files && this.files.length) {
          this.updateProductWithImage(mData);
        } else {
          this.updateUserProductById(this.id, mData);
        }
      } else {
        if (this.files && this.files.length) {
          this.addProductWithImage(mData);
        } else {
          this.addProductByUser(mData);
        }
      }

    }
  }


  /**
   * IMAGE DRUG & DROP
   */
  onSelect(event: { addedFiles: any; }) {
    this.files.push(...event.addedFiles);
    this.onUploadImages();
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }


  private addProductWithImage(data: any) {
    this.subDataFive = this.fileUploadService
      .uploadMultiImageOriginal(this.files)
      .subscribe((res) => {
        const images = res.map((m) => m.url);
        const mData = {...data, ...{images: images}};
        this.addProductByUser(mData);
      });
  }

  private updateProductWithImage(data: any) {
    this.subDataSix = this.fileUploadService
      .uploadMultiImageOriginal(this.files)
      .subscribe((res) => {
        const images = res.map((m) => m.url);
        const mData = {...data, ...{images: [...this.oldImages, ...images]}};
        this.updateUserProductById(this.id, mData  );
      });
  }


  removeSelectImage(index: number) {
    if (this.files && this.files.length) {
      this.files.splice(index - this.oldImages.length, 1);
      this.pickedImage.splice(index, 1);
    } else {
      this.oldImages.splice(index, 1);
      this.pickedImage.splice(index, 1);
    }
  }

  removeOldImage(index: number) {
    this.removeImages.push(this.oldImages[index]);
    this.oldImages.splice(index, 1);
    this.dataForm.patchValue({images: this.oldImages});
  }

  /**
   * ON IMAGE UPLOAD
   */
  onUploadImages() {
    if (!this.files || this.files.length <= 0) {
      this.uiService.warn('No Image selected!');
      return;
    }
    this.fileUploadService.uploadMultiImageOriginalV2(this.files, null)
      .subscribe({
        next: (res) => {
          const data: Gallery[] = res.map(m => {
            return {
              url: m.url,
              name: m.name,
              size: m.size,
              folder: 'user-product',
              type: 'image'
            } as Gallery;
          });

          this.addImagesToGallery(data);

        }, error: (error) => {
          console.log(error);
        }
      });
  }

  /**
   * HTTP REQ HANDLE
   */

  private addImagesToGallery(data: Gallery[]) {
    this.galleryService.insertManyGallery(data)
      .subscribe({
        next: (res) => {
          let images = res.data.map((d) => d.url);
          this.dataForm.patchValue({images: images});
          this.reloadService.needRefreshData$();
        }, error: (error) => {
          console.log(error);
        }
      });
  }

  /**
   * HTTP REQ HANDLE
   * getAllType()
   * getAllCategory();
   * getAllHairColor();
   * getAllIntimateHair();
   * getAllOrientation();
   * getAllDivision();
   * getAllArea();
   * getAllZone();
   * getAllBodyType();
   * addProductByUser();
   */

  private getAllCategory() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1,
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: {name: 1},
    };

    this.subDataTwo = this.categoryService
      .getAllCategory(filter, null)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.categorys = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }






  private getAllDivision() {
    let mSelect = {
      name: 1,
      slug: 1,
    }
    const filter: FilterData = {
      filter: {status: 'publish'},
      select: mSelect,
      pagination: null,
      sort: {createdAt: -1}
    }

    this.subDivisionData = this.divisionService.getAllDivisions(filter).subscribe(
      (res) => {
        if (res.success) {
          this.divisions = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  private getAllArea(id: string) {
    const select = 'name slug';
    this.subAreaData = this.areaService.getAreaByParentId(id, select).subscribe(
      (res) => {
        if (res.success) {
          this.area = res.data;
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }





  getSingleProductById(id: string) {
    this.subDataOne = this.productService.getProductById(id).subscribe(res => {
        if (res.success) {
          this.product = res.data;
          if (this.product) {
            this.dataForm.patchValue(this.product);
            this.dataForm.patchValue({category: this.product?.category?._id});
            this.getAllArea(this.dataForm.get('division')?.value);
            if (this.product.images && this.product.images.length) {
              this.oldImages = this.product.images;
              console.log(" this.oldImages", this.oldImages)
            }

          }
        }
      },
      err => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  private addProductByUser(data: Product) {
    this.subDataOne = this.productService.addProductByUser(data).subscribe(
      (res) => {
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.isLoading = false;
          this.router.navigate(['/account/my-list'])
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  private updateUserProductById(id: string, data: Product) {
    this.subDataOne = this.productService.updateUserProductById(id, data).subscribe(
      (res) => {
        if (res.success) {
          this.uiService.success(res.message);
          this.isLoading = false;
          this.router.navigate(['/account/my-list'])
        }
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }


  /***
   * ON SELECT CHANGE
   * onChangeRegion()
   * onChangeArea()
   */
  onChangeRegion(event: any) {
    if (event) {
      this.getAllArea(this.dataForm.get('division')?.value);
    }
  }



  onShowCreate(data) {
    if(data){
      this.showCreate = true;
    }
  }

  onCategoryChange(val: string) {
    if (val) {
      this.showAll = true;
      this.onSelectedCategory = val;
    }
  }

  onTypeChange(val: string) {
    if (val) {
      this.showCreate = true;
      this.onSelectedType = val;
    }
  }

  onCheckTerms() {
    this.acceptTerms = !this.acceptTerms;
  }

  /**
   * ON DESTROY
   */
  ngOnDestroy() {
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
      this.subDataFive.unsubscribe();
    }
    if (this.subDataSix) {
      this.subDataSix.unsubscribe();
    }
    if (this.subDataSeven) {
      this.subDataSeven.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }

    if (this.subDivisionData) {
      this.subDivisionData.unsubscribe();
    }
    if (this.subAreaData) {
      this.subAreaData.unsubscribe();
    }
    if (this.subZoneData) {
      this.subZoneData.unsubscribe();
    }
    if (this.subParamp) {
      this.subParamp.unsubscribe();
    }

  }
}
