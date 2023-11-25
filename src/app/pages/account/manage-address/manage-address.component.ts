import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/interfaces/common/address.interface';
import { Area } from 'src/app/interfaces/common/area.interface';
import { Division } from 'src/app/interfaces/common/division.interface';
import { Zone } from 'src/app/interfaces/common/zone.interface';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { AreaService } from 'src/app/services/common/area.service';
import { DivisionService } from 'src/app/services/common/division.service';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { ZoneService } from 'src/app/services/common/zone.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss']
})
export class ManageAddressComponent implements OnInit, OnDestroy {

  //Store Data
  dataForm: FormGroup;
  storeAddress: string;
  showAddressForm: boolean = false;
  addresses: Address[];

  divisions: Division[] = [];
  area: Area[] = [];
  zone: Zone[] = [];
  isLoading = false;
  selectEdittedAdress: Address | any = null;
  isSelected = false;

  //Subscriptions
  private subDivisionData: Subscription;
  private subAreaData: Subscription;
  private subZoneData: Subscription;
  private subForm: Subscription;
  private subAddressData: Subscription;
  private subReload: Subscription;
  private subUpdateAddress: Subscription;
  private subDeleteAddress: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private divisionService: DivisionService,
    private areaService: AreaService,
    private zoneService: ZoneService,
    private userDataService: UserDataService,
    private reloadService: ReloadService,
  ) { }

  ngOnInit(): void {

    this.initForm();
    this.getAllDivision();
    //Address
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getUserAddress();
    })
    this.getUserAddress();
  }

  /**
   * INITIALIZE FORM FUNCTION
   * initForm()
  */
  initForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      phone: [null, [Validators.required,Validators.maxLength(11)]],
      division: [null, Validators.required],
      area: [null, Validators.required],
      zone: [null, Validators.required],
      address: [null, [Validators.required]],
      addressType: [null],
      setDefaultAddress: [false]
    });
  }

  /**
   * FORM DATA SUBMIT FUNCTION
   * onFormSubmit()
  */
  onFormSubmit() {
    if (this.dataForm.valid) {
      let selectDivision = this.divisions.find((d) => d._id === this.dataForm.value.division);
      let selectArea = this.area.find((d) => d._id === this.dataForm.value.area);
      let selectZone = this.zone.find((d) => d._id === this.dataForm.value.zone);
      const mData = {
        ...this.dataForm.value,
        ...{ division: selectDivision },
        ...{ area: selectArea },
        ...{ zone: selectZone },
      }
      if (mData) {
        if(this.selectEdittedAdress === null){
          this.addAddress(mData);
        }else{
           this.updateAddress(this.selectEdittedAdress?._id,mData);
        }
      }
    }
    else {
      this.uiService.success('Please fill all form input');
      this.dataForm.markAllAsTouched();
    }
  }


  /***
   * HTTP REQUEST HANDLE
   * getAllDivision()
   * getAllArea()
   * getAllZone()
   * addAddress()
   * getUserAddress()
   *
   */

  private getAllDivision() {
    let mSelect = {
      name: 1,
    }
    const filter: FilterData = {
      filter: { status: 'publish' },
      select: mSelect,
      pagination: null,
      sort: { createdAt: -1 }
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

  private addAddress(data: Address) {
    this.isLoading = true;
    this.subForm = this.userDataService.addAddress(data).subscribe((res) => {
      if (res) {
        this.isLoading = false;
        this.uiService.success('Address Added');
        this.reloadService.needRefreshData$();
        this.showAddressForm = false;
      }
    },
      (err) => {
        if (err) {
          this.isLoading = false;
          console.log(err);
        }
      }
    )
  }

  private getUserAddress() {
    this.subAddressData = this.userDataService.getUserAddress().subscribe((res) => {
      if (res.success) {
        this.addresses = res.data;
      }
    },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }
  public deleteAddressById(id: string) {
    this.subDeleteAddress = this.userDataService.deleteAddressById(id).subscribe((res) => {
      if (res) {
        this.reloadService.needRefreshData$();
        this.uiService.success(res.message);
      }
    },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  public setDefualtAddress(id: string) {
    const data = {
      setDefaultAddress: true
    };
    this.subUpdateAddress = this.userDataService.editAddress(id, data).subscribe((res) => {
      if (res) {
        this.reloadService.needRefreshData$();
        this.uiService.success(res.message);
        this.removeOthorDefualtAddress(id);
      }
    },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }
 private updateAddress(id: string,data:Address) {
    this.subUpdateAddress = this.userDataService.editAddress(id, data).subscribe((res) => {
      if (res) {
        this.reloadService.needRefreshData$();
        this.uiService.success(res.message);
      }
    },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }
  private removeOthorDefualtAddress(id: string) {
    for (let i = 0; i < this.addresses.length; i++) {
      if (id !== this.addresses[i]._id) {
        const data = {
          setDefaultAddress: false
        };
        this.subUpdateAddress = this.userDataService.editAddress(this.addresses[i]._id, data).subscribe((res) => {
          if (res) {
            this.reloadService.needRefreshData$();
          }
        },
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        )
      }
    }
  }

  public onSelectEdittedAddress(address: Address) {
    if(address){
      this.selectEdittedAdress = address;
      this.isSelected = true;
      if (this.selectEdittedAdress !== null) {
        this.dataForm.patchValue(this.selectEdittedAdress);
        this.dataForm.patchValue({division:this.selectEdittedAdress?.division?._id});
        this.dataForm.patchValue({area:this.selectEdittedAdress?.area?._id});
        this.dataForm.patchValue({zone:this.selectEdittedAdress?.zone?._id});
        this.getAllArea(this.dataForm.get('division')?.value);
        this.getAllZone(this.dataForm.get('area')?.value);
        this.storeAddress = this.selectEdittedAdress?.addressType;
        this.showAddressForm = true;
      }
    }
    
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

  onChangeArea(event: any) {
    if (event) {
      this.getAllZone(this.dataForm.get('area')?.value);
    }
  }

  /**
   * ADDRESS SELECT AND SHOW ADDRESS FORM FUNCTIONS
   * onAddressSelect();
   * onShowAddressForm();
  */
  onAddressSelect(address: string) {
    this.storeAddress = address;
    this.dataForm.patchValue({addressType:address})
  }

  onShowAddressForm() {
    this.showAddressForm = true;
  }

  /**
   * SHOW AND HIDE POPUP FUNCTION
   * onHideShowPopup()
  */
  onHideShowPopup() {
    this.showAddressForm = false;
  }

  /***
   * NG ON DESTROY
   */
  ngOnDestroy(): void {
    if (this.subAddressData) {
      this.subAddressData.unsubscribe();
    }
    if (this.subAreaData) {
      this.subAreaData.unsubscribe();
    }
    if (this.subDivisionData) {
      this.subDivisionData.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe()
    }
    if (this.subZoneData) {
      this.subZoneData.unsubscribe();
    }
    if(this.subUpdateAddress){
       this.subUpdateAddress.unsubscribe();
    }
    if(this.subDeleteAddress){
      this.subDeleteAddress.unsubscribe();
    }
  }

}
