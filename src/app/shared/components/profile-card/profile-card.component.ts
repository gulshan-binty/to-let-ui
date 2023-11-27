import {Management} from "../../../interfaces/common/management.interface";
import {Component, OnInit, ViewChild} from "@angular/core";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {ManagementService} from "../../../services/common/management.service";
import {UiService} from "../../../services/core/ui.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";
import {ReloadService} from "../../../services/core/reload.service";
import {UtilsService} from "../../../services/core/utils.service";
import {FilterData} from "../../../interfaces/core/filter-data";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent  implements OnInit {
  // Admin Base Data
  adminId: string;
  role: string;
  maleData:any;
  femaleData:any;
  muftyData:any;


  // Store Data
  toggleMenu: boolean = false;
  managements: Management[] = [];
  holdPrevData: Management[] = [];
  managementCount = 0;
  id?: string;

  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // Date
  today = new Date();
  dataFormDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  // Search Area
  @ViewChild('searchForm') searchForm: NgForm;
  searchQuery = null;
  searchManagement: Management[] = [];


  // Pagination
  currentPage = 1;
  totalManagements = 0;
  ManagementsPerPage = 5;
  totalManagementsStore = 0;

  // FilterData
  filter: any = null;
  sortQuery: any = null;
  activeFilter1: number = null;
  activeFilter2: number = null;
  activeSort: number;
  number = [{ num: '10' }, { num: '25' }, { num: '50' }, { num: '100' }];

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subForm: Subscription;
  private subRouteOne: Subscription;
  private subReload: Subscription;

  constructor(
    private managementService: ManagementService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private reloadService: ReloadService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Reload Data
    this.subReload =  this.reloadService.refreshData$.subscribe(() => {
      this.getAllManagement();
    });

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParamMap.subscribe((qParam) => {
      if (qParam && qParam.get('page')) {
        this.currentPage = Number(qParam.get('page'));
      } else {
        this.currentPage = 1;
      }
      this.getAllManagement();
    });

  }




  /**
   * CHECK ADMIN PERMISSION
   * getAdminBaseData()
   * checkAddPermission()
   * checkDeletePermission()
   * checkEditPermission()
   */

  /**
   * Pagination
   * onPageChanged()
   */

  public onPageChanged(event: any) {
    this.router.navigate([], {queryParams: {page: event}});
  }



  /**
   * HTTP REQ HANDLE
   * getAllManagement()
   * deleteMultipleManagementById()
   */

  private getAllManagement() {
    // Select
    const mSelect = {
      name: 1,
      image: 1,
      mobileImage: 1,
      createdAt: 1,
      managementType: 1,
      designation: 1,
      phone: 1,
      email: 1,
      url: 1,
      priority:1
    };

    const filter: FilterData = {
      filter: null,
      pagination: null,
      select: mSelect,
      sort: { priority: -1 },
    };

    this.subDataOne = this.managementService.getAllManagement(filter, null).subscribe({
      next: (res) => {
        if (res.success) {
          this.managements = res.data;

          this.maleData = res.data.filter(f => f.managementType === 'male_management');
          this.femaleData = res.data.filter(f => f.managementType === 'female_management');
          this.muftyData = res.data.filter(f => f.managementType === 'mufty_management');

          console.log("add",this.managements)
          this.managementCount = res.count;
          this.holdPrevData = this.managements;
          this.totalManagementsStore = this.managementCount;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }





  /**
   * ON DESTROY
   * ngOnDestroy()
   */

  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }

    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }

    if (this.subForm) {
      this.subForm.unsubscribe();
    }

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }

    if (this.subReload) {
      this.subReload.unsubscribe();
    }
  }
}
