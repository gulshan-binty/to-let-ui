import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { EMPTY, Subscription, debounceTime, distinctUntilChanged, pluck, switchMap } from "rxjs";
import { CountryService } from 'src/app/services/common/country.service';
import { HeaderService } from 'src/app/services/common/header.service';

import { Product } from "../../interfaces/common/product.interface";
import { FilterData } from "../../interfaces/core/filter-data";
import { Pagination } from "../../interfaces/core/pagination";
import { ProductService } from "../../services/common/product.service";
import { ReloadService } from "../../services/core/reload.service";
import {UserService} from '../../services/common/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  txt = 'Are you looking for a safe apartment to rent or a good tenant?';
  selectCategoryName: string = 'All Ads';

  filter: any;

  showMobileMenu: boolean = false;
  headerServe: boolean;
  // SEARCH AREA
  searchProducts: Product[] = [];
  // SEARCH AREA
  overlay = false;
  isOpen = false;
  isFocused = false;
  isLoading = false;
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('searchInputMobile') searchInputMobile: ElementRef;
  // Placeholder Animation
  timeOutOngoing: any;
  char = 0;
  private subForm: Subscription;
  private subDataOne: Subscription;

  selectedPostType: string = 'All Ads';

  constructor(
    public router: Router,
    private _headerService: HeaderService,
    private reloadService: ReloadService,
    private productService: ProductService,
    private _countryService: CountryService,
    private dialog: MatDialog,
    public userService: UserService,
  ) {
    this._headerService.bService.subscribe(
      (res: any) => {
        this.headerServe = res;
      }
    );

    this._countryService.categorySelect.subscribe(res => {
      this.selectCategoryName = res.name;
    });
  }

  ngOnInit(): void {
    this.reloadService.refreshMobileSearch$.subscribe(() => {
      this.searchQuery = null;

    });



  }

  receiveData(data: { name: string; value: string }) {
    if (data) {
      this.selectedPostType = data.name;
      this.filter = {...this.filter, ...{postType: data.value}}
      this.searchProducts = [];
    }

  }

  ngAfterViewInit(): void {
    this.searchAnim();
    const formValue = this.searchForm.valueChanges;

    this.subForm = formValue
      .pipe(
        pluck('searchTerm'),
        debounceTime(150),
        distinctUntilChanged(),
        switchMap((data) => {
          this.searchQuery = data.trim();
          if (this.searchQuery === '' || this.searchQuery === null) {
            this.overlay = false;
            this.searchProducts = [];
            this.searchQuery = null;
            return EMPTY;
          }
          this.isLoading = true;
          const pagination: Pagination = {
            pageSize: 12,
            currentPage: 0,
          };
          // Select
          const mSelect = {
         name: 1,
      slug: 1,
      images: 1,
      description: 1,
      rentPrice: 1,
      address: 1,
      area: 1,
      status: 1,
      postType: 1,
      createdAt: 1,
      updatedAt: 1,
          };

          const filterData: FilterData = {
            pagination: pagination,
            filter: {...this.filter, ...{ status: 'publish' }},
            select: mSelect,
            sort: { createdAt: -1 },
          };
          return this.productService.getAllProducts(
            filterData,
            this.searchQuery
          );
        })
      )
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.searchProducts = res.data;

          if (this.searchProducts.length > 0) {
            this.isOpen = true;
            this.overlay = true;
          }
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
        }
      );
  }

  handleFocus(event: FocusEvent): void {
    this.searchInput.nativeElement.focus();

    if (this.isFocused) {
      return;
    }
    if (this.searchProducts.length > 0) {
      this.setPanelState(event);
    }
    this.isFocused = true;
  }

  private setPanelState(event: FocusEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen = false;
    this.handleOpen();
  }

  handleOpen(): void {
    if (this.isOpen || (this.isOpen && !this.isLoading)) {
      return;
    }
    if (this.searchProducts.length > 0) {
      this.isOpen = true;
      this.overlay = true;
    }
  }

  onSelectItem(data: Product): void {
    this.searchInput.nativeElement.value = '';
    this.router.navigate(['/to-let-details', data?.slug]);
    this.handleCloseAndClear();

  }
  handleOutsideClick(): void {
    this.searchInput.nativeElement.value = '';
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
    this.overlay = false;
    this.isFocused = false;
  }

  onClickHeader(): void {
    this.searchInput.nativeElement.value = '';
    this.handleCloseOnly();
  }

  handleCloseOnly(): void {
    if (!this.isOpen) {
      this.isFocused = false;
      return;
    }
    this.isOpen = false;
    this.overlay = false;
    this.isFocused = false;
  }

  handleCloseAndClear(): void {
    if (!this.isOpen) {
      this.isFocused = false;
      return;
    }
    this.isOpen = false;
    this.overlay = false;
    this.searchProducts = [];
    this.isFocused = false;
  }

  /**
   * ON SEARCH CHANGE
   * onChangeInput()
  */
  // onChangeInput(event: string) {
  //   const data = event ? event.trim() : null;
  //   if (data) {
  //     this.router.navigate(['/product-list'], {
  //       queryParams: { search: data },
  //       queryParamsHandling: 'merge',
  //     });
  //   } else {
  //     this.router.navigate(['/product-list'], {
  //       queryParams: { search: null },
  //       queryParamsHandling: 'merge',
  //     });
  //   }
  // }

  onSearchNavigate() {
    let inputVal = (this.searchInput.nativeElement as HTMLInputElement).value;
    let convertedSearchQuery = '';
    for (let i = 0; i < inputVal?.length; i++) {
      if (inputVal[i] === " ") {
        convertedSearchQuery += '-';
      } else {
        convertedSearchQuery += inputVal[i];
      }
    }
    if (convertedSearchQuery) {
      this.router.navigate(['/', 'product-list'], { queryParams: { searchQuery: convertedSearchQuery }, queryParamsHandling: 'merge' });
      this.searchInput.nativeElement.value = "";
      this.isOpen = false;
      this.reloadService.needRefreshSearch$(true);
    }
  }

  /**
   * SEARCH PLACEHOLDER ANIMATION
  */
  private searchAnim() {
    const target = this.searchInput?.nativeElement as HTMLInputElement;
    const target2 = this.searchInputMobile
      ? (this.searchInputMobile?.nativeElement as HTMLInputElement)
      : null;
    target.placeholder = '|';
    this.typeIt(target);
    if (target2) {
      target2.placeholder = '|';
      this.typeIt(target2);
    }
  }

  private typeIt(target: HTMLInputElement) {
    const humanize = Math.round(Math.random() * (300 - 30)) + 30;
    this.timeOutOngoing = setTimeout(() => {
      this.char++;
      const type = this.txt.substring(0, this.char);
      target.placeholder = type + '|';
      this.typeIt(target);
      if (this.char === this.txt.length) {
        // target.placeholder = txt.slice(0, -1);
        target.placeholder = '|';
        this.char = 0;
        // clearTimeout(timeOut);
      }
    }, humanize);
  }

  onClickSearchArea(event: MouseEvent): void {
    event.stopPropagation();
  }

  public onSubmit() {
    console.log('On submit');
  }

  onShowMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  getImagePlaceholder(type:'to_let') {
    switch(type) {
      case 'to_let': {
        return '/assets/images/placeholder/to-let.png';
      }
   
      default: {
        return '/assets/images/placeholder/products.png';
      }
    }
  }

  ngOnDestroy() {
    if (this.subForm) {
      this.subForm.unsubscribe();
    }

    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }

}


