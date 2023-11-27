import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from "rxjs";
import {FileUploadService} from "../../../services/gallery/file-upload.service";
import {ProductService} from "../../../services/common/product.service";
import {UiService} from "../../../services/core/ui.service";
import {FilterData} from "../../../interfaces/core/filter-data";
import {Division} from "../../../interfaces/common/division.interface";
import {Area} from "../../../interfaces/common/area.interface";
import {Zone} from "../../../interfaces/common/zone.interface";
import {DivisionService} from "../../../services/common/division.service";
import {AreaService} from "../../../services/common/area.service";
import {ZoneService} from "../../../services/common/zone.service";
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../interfaces/common/product.interface';
import {PRODUCT_STATUS} from "../../../core/utils/app-data";

@Component({
  selector: 'app-tolet-post',
  templateUrl: './tolet-post.component.html',
  styleUrls: ['./tolet-post.component.scss']
})
export class ToletPostComponent implements OnInit {

  @ViewChild('formElement') formElement: NgForm;
  dataForm!: FormGroup;

  id: string;
  product: Product;
  isLoading: boolean = false;

  //Files
  files: File[] = [];
  oldImages: string[] = [];
  fileNotPicked: boolean = false;


  divisions: Division[] = [];
  area: Area[] = [];
  zone: Zone[] = [];

  // Get Select Value
  autoSlug = true;


  // Subscriptions
  private subDataOne: Subscription;
  private productAutoSlug: Subscription;
  private subDivisionData: Subscription;
  private subAreaData: Subscription;
  private subZoneData: Subscription;
  private subReload: Subscription;

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private productService: ProductService,
    private uiService: UiService,
    private router: Router,
    private divisionService: DivisionService,
    private areaService: AreaService,
    private zoneService: ZoneService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    this.initForm();
    this.getAllDivision();

    this.subDataOne = this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      if (this.id) {
        this.getProductById(this.id);
      }
    })

    this.autoGenerateSlug();
  }


  initForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      slug: [null],
      bedroom: [null, Validators.required],
      washroom: [null],
      balcony: [null],
      measurement: [null],
      waterSystem: [null],
      floorNo: [null],
      availableFrom: [null],
      flatCategory: [null],
      flatType: [null],
      division: [null],
      area: [null],
      zone: [null],
      images: [null],
      rentPrice: [null],
      address: [null, Validators.required],
      description: [null],
      meterType: [null],
      nearestMarketDistance: [null],
      nearestMosqueDistance: [null],
      floorsInHouse: [null],
      whichFloorRented: [null],
      howManyCorridors: [null],
      postType: 'to_let',
      status: 'draft',

    });
  }

  setFormValue() {
    if (this.product) {
      this.dataForm.patchValue({
        ...this.product,
        ...{
          division: this.product.division._id,
          area: this.product.area._id,
          zone: this.product.zone._id,
        }
      });
    }

    if (this.product.images) {
      this.oldImages = this.product.images;
    }

    if (this.product.division) {
      this.getAllArea(this.product.division._id);
    }

    if (this.product.area) {
      this.getAllZone(this.product.area._id);
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


    let selectDivision = this.divisions.find((d) => d._id === this.dataForm.value.division);
    let selectArea = this.area.find((d) => d._id === this.dataForm.value.area);
    let selectZone = this.zone.find((d) => d._id === this.dataForm.value.zone);
    const mData = {
      ...this.dataForm.value,
      ...{division: selectDivision},
      ...{area: selectArea},
      ...{zone: selectZone},
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


  /***
   * ON SELECT CHANGE
   * onChangeRegion()
   * onChangeArea()
   */
  onChangeRegion(event: any) {

    console.log("event", event)
    if (event) {
      this.getAllArea(this.dataForm.get('division')?.value);
    }
  }

  onChangeArea(event: any) {
    if (event) {
      this.getAllZone(this.dataForm.get('area')?.value);
    }
  }

  /**
   * HTTP REQ HANDLE
   * getAllDivision()
   * getAllArea()
   * getAllZone()
   * addProduct()
   */



  private getAllDivision() {
    let mSelect = {
      name: 1,
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

    console.log("id-------", id)
    const select = 'name';
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


  private getAllZone(id: string) {
    const select = 'name';
    this.subZoneData = this.zoneService.getZoneByParentId(id, select).subscribe(
      (res) => {
        if (res.success) {
          this.zone = res.data;
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

    this.subDataOne = this.productService.addProduct(data).subscribe({
      next: res => {
        this.isLoading = false;
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.files = [];
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
          console.log('images', images)
          const finalData = {
            ...data,
            ...{
              images: this.id ? [...images, ...this.oldImages] : images
            }
          };
          console.log('finalData', finalData)
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


  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.productAutoSlug) {
      this.productAutoSlug.unsubscribe();
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
    if (this.subReload) {
      this.subReload.unsubscribe();
    }


  }

  protected readonly PRODUCT_STATUS = PRODUCT_STATUS;
}
