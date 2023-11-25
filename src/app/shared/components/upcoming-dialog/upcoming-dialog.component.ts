import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {Division} from "../../../interfaces/common/division.interface";
import {Area} from "../../../interfaces/common/area.interface";
import {DivisionService} from "../../../services/common/division.service";
import {AreaService} from "../../../services/common/area.service";
import {Subscription} from "rxjs";
import {FilterData} from "../../../interfaces/core/filter-data";

@Component({
  selector: 'app-upcoming-dialog',
  templateUrl: './upcoming-dialog.component.html',
  styleUrls: ['./upcoming-dialog.component.scss']
})
export class UpcomingDialogComponent implements OnInit {

  dataFrom!: FormGroup;

  // Select store
  storeCategoryData: string = '';
  divisions: Division[] = [];
  area: Area[] = [];

  // store Category
  categoryData: any[] = [];

  showSearch: string = '';
  //Subscriptions
  private subDivisionData: Subscription;
  private subAreaData: Subscription;

  constructor(
    private dialogRef: MatDialogRef<UpcomingDialogComponent>,
    private fb: FormBuilder,
    private divisionService: DivisionService,
    private areaService: AreaService,
  ) { }

  ngOnInit(): void {
    document.getElementsByTagName('body')[0].addEventListener('click', () => {
      this.showSearch = '';
    });

    this.initForm();

    this.getAllDivision();
  }

  onInputFocus(data: string) {
    this.showSearch = data;

    if (data === 'category') {
      this.categoryData = this.dummyValue;
    }
  }

  onSelectAllData(data: string, field: string) {
    if (field === 'category') {
      this.storeCategoryData = data.toLowerCase();
    }
    this.showSearch = '';
  }

  onPassValue(data: HTMLInputElement, field: string) {
    if (field === 'category') {
      this.categoryData = this.dummyValue.filter(item => !item.value.toLowerCase().indexOf(data.value.toLowerCase()));
    }
  }

  initForm() {
    this.dataFrom = this.fb.group({
      "storeCategoryData": [this.storeCategoryData],
      division:[null],
      area: [null],
    });
  }

  onFormSubmit() {

    if (this.dataFrom.valid) {
      let selectDivision = this.divisions.find((d) => d._id === this.dataFrom.value.division);
      let selectArea = this.area.find((d) => d._id === this.dataFrom.value.area);
      const mData = {
        ...this.dataFrom.value,
        ...{ division: selectDivision },
        ...{ area: selectArea },

      }
      console.log(mData);
    }

  }

  onClickClose() {
    this.dialogRef.close();
  }

  /***
   * HTTP REQUEST HANDLE
   * getAllDivision()
   * getAllArea()
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


  /***
   * ON SELECT CHANGE
   * onChangeRegion()
   * onChangeArea()
   */
  onChangeRegion(event: any) {
    if (event) {
      this.getAllArea(this.dataFrom.get('division')?.value);
    }
  }


  dummyValue: any[] = [
    {
      id: '1', value: 'Amra',
    },
    {
      id: '2', value: 'Acer',
    },
    {
      id: '3', value: 'AEKU',
    },
    {
      id: '4', value: 'Apple',
    },
    {
      id: '5', value: 'Asus',
    },
    {
      id: '6', value: 'Samsung',
    },
  ];

}
