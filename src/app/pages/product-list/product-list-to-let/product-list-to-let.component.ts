import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product, ProductFilterGroup } from 'src/app/interfaces/common/product.interface';
import { FilterData, FilterGroup } from 'src/app/interfaces/core/filter-data';
import { Pagination } from 'src/app/interfaces/core/pagination';
import { ProductService } from 'src/app/services/common/product.service';
import { ReloadService } from 'src/app/services/core/reload.service';

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-product-list-to-let',
  templateUrl: './product-list-to-let.component.html',
  styleUrls: ['./product-list-to-let.component.scss']
})
export class ProductListToLetComponent implements OnInit, OnDestroy {

  allComplete: boolean = false;
  // Loading
  isLoading = true;
  // Store Data
  isLoadMore = false;
  products: Product[] = [];
  holdPrevData: Product[] = [];
  searchQuery: string = null;
  productFilterGroup: ProductFilterGroup;
  selectedViewType: string = 'grid';
  selectedCategories: string[] = [];
  selectedSubCategories: string[] = [];
  selectedBrands: string[] = [];

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 12;
  totalProductsStore = 0;

  // Sort
  sortQuery = { createdAt: -1 };
  activeSort: number = null;
  activeFilter1: number = null;
  activeFilter2: number = null;


  // Complex Filter
  categoryFilterArray: any[] = [];
  subCategoryFilterArray: any[] = [];
  brandFilterArray: any[] = [];
  ratingFilterArray: any[] = [];
  priceFilterArray: any[] = [];

  // Price
  lowValue: number = null;
  highValue: number = null;

  // FilterData
  filter: any = null;

  // Subscriptions
  private subDataOne: Subscription;
  private subRouteTwo: Subscription;

  constructor(
    private productService: ProductService,
    private reloadService: ReloadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
  }

  ngOnInit(): void {
    // GET PAGE FROM QUERY PARAM
    this.subRouteTwo = this.activatedRoute.queryParams.subscribe(qParam => {
      // Filter Query
      this.filterQueryFromQueryParam(qParam);

      // Fetch data
      this.getAllProducts();
    });
  }

  private filterQueryFromQueryParam(qParam: any) {
    if (qParam && !qParam['subCategories'] && qParam && qParam['categories']) {
      if (typeof qParam['categories'] === 'string') {
        this.selectedCategories = [qParam['categories']];
      } else {
        this.selectedCategories = qParam['categories'];
      }
      this.categoryFilterArray = this.selectedCategories.map(m => {
        return { 'category.slug': m }
      });
    }
  }

  /**
   * FILTERING
   */
  filterData(value: any, index: number, type: string) {
    switch (type) {
      case 'category': {
        this.filter = { ...this.filter, ...{ 'category._id': value } };
        this.activeFilter1 = index;
        break;
      }
      default: {
        break;
      }
    }
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], { queryParams: { page: 1 } });
    } else {
      this.getAllProducts();
    }
  }


  /**
   * HTTP REQ HANDLE
   * getAllProducts()
   * getAllCategories()
   * getAllBrands()
   */

  private getAllProducts(loadMore?: boolean) {
    const pagination: Pagination = {
      pageSize: Number(this.productsPerPage),
      currentPage: Number(this.currentPage) - 1
    };

    // Select
    const mSelect = {
      name: 1,
      slug: 1,
      images: 1,
      category: 1,
      subCategory: 1,
      brand: 1,
      costPrice: 1,
      salePrice: 1,
      discountType: 1,
      discountAmount: 1,
      hasVariations: 1,
      vacancy: 1,
      educational: 1,
      experience: 1,
      salary: 1,
      jobRole: 1,
      jobType: 1,
      description: 1,
      rentPrice: 1,
      address: 1,
      area: 1,
      status: 1,
      videoUrl: 1,
      ratingTotal: 1,
      ratingCount: 1,
      postType: 1,
      birthDay: 1,
      height: 1,
      complexion: 1,
      weight: 1,
      bioDataType: 1,
    }

    const mGroup: FilterGroup = {
      isGroup: true,
      category: true,
      subCategory: true,
      brand: true,
    }

    // Compleax Filter Array Based on Selections
    const comFilter: any[] = [];
    if (this.categoryFilterArray.length) {
      comFilter.push(
        { $or: this.categoryFilterArray }
      );
    }

    if (this.subCategoryFilterArray.length) {
      comFilter.push(
        { $or: this.subCategoryFilterArray }
      );
    }

    if (this.brandFilterArray.length) {
      comFilter.push(
        { $or: this.brandFilterArray }
      );
    }

    if (this.ratingFilterArray.length) {
      comFilter.push(
        { $or: this.ratingFilterArray }
      );
    }

    if (this.priceFilterArray.length) {
      comFilter.push(
        { $or: this.priceFilterArray }
      );
    }

    // console.log('comFilter', comFilter);
    let mFilter;
    if (comFilter.length) {
      mFilter = {
        ...this.filter,
        ...{
          $or: comFilter
        }
      }
    } else {
      mFilter = this.filter;
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: { ...mFilter, status: 'publish',postType: "to_let" },
      filterGroup: loadMore ? null : mGroup,
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.productService.getAllProducts(filterData, this.searchQuery)
      .subscribe(res => {

        this.isLoading = false;
        this.isLoadMore = false;
        if (loadMore) {
          this.products = [...this.products, ...res.data];
          console.log(" this.productsfghfg", this.products)

        } else {
          this.products = res.data;
          console.log(" this.products", this.products)

        }

        this.totalProducts = res.count;

        if (!loadMore) {
          if (!this.productFilterGroup) {
            this.productFilterGroup = res.filterGroup;
          }
          if (this.productFilterGroup) {
            if (this.selectedCategories.length) {
              this.checkCategoryFilter();
            }
          }
        }


      }, error => {
        this.isLoading = false;
        console.log(error);
      });
  }


  /**
   * COMPLEX FILTER METHODS
   * onCheckChange()
   * onPriceRangeChange()
   */
  onCheckChange(event: MatCheckboxChange, type: string, index: number) {
    switch (type) {
      case 'category': {
        const data = this.productFilterGroup.categories[index];
        if (event.checked) {
          this.categoryFilterArray.push({ 'category.slug': data.slug });
        } else {
          const fIndex = this.categoryFilterArray.findIndex(f => f['category.slug'] === data.slug);
          this.categoryFilterArray.splice(fIndex, 1);
        }
        // Create Query Params
        const categories = this.categoryFilterArray.map(m => m['category.slug']);
        this.router.navigate(
          ['/product-list'],
          { queryParams: { categories: categories }, queryParamsHandling: 'merge' }
        );

        break;
      }

      case 'rating': {
        // const data = this.fuelTypesData[index];
        // if (event.checked) {
        //   this.fuelTypesFilterArray.push({fuelTypes: data.value})
        // } else {
        //   const fIndex = this.fuelTypesFilterArray.findIndex(f => f.fuelTypes === data.value);
        //   this.fuelTypesFilterArray.splice(fIndex, 1);
        // }
        break;
      }
      default: {
        break;
      }
    }

  }
  /**
   * RESET FILTER
   * resetCategoryFilter()
   * resetSubCategoryFilter()
   * resetBrandFilter()
   */

  resetCategoryFilter() {
    this.selectedCategories = [];
    this.categoryFilterArray = [];
    this.productFilterGroup.categories.forEach((cat, i) => {
      this.productFilterGroup.categories[i].select = false;
    });
    this.router.navigate(
      ['/products'],
      { queryParams: { categories: [] }, queryParamsHandling: 'merge' }
    );
  }

  /**
   * CHECK BOX CHECKER
   * checkCategoryFilter()
   * checkSubCategoryFilter()
   * checkBrandFilter()
   */
  checkCategoryFilter() {
    this.productFilterGroup.categories.forEach((cat, i) => {
      const fIndex = this.selectedCategories.findIndex(f => f === cat.slug);
      if (fIndex !== -1) {
        this.productFilterGroup.categories[i].select = true;
      }
    });
  }






  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }


  menu1?: number;
  onShowMenu(num: number) {

    if (this.menu1 === num) {
      this.menu1 = 0;
    }
    else {
      this.menu1 = num;
    }
  }


  featureMenu2: number = 1;
  onShowFeatureMenu(num: number) {
    if (this.featureMenu2 === num) {
      this.featureMenu2 = 0;
    }
    else {
      this.featureMenu2 = num;
    }
  }


  filterArea: boolean = false;
  onHideFilterArea() {
    this.filterArea = !this.filterArea;

  }





  onLoadMore() {
    if (this.totalProducts > this.products.length) {
      this.isLoadMore = true;
      this.currentPage += 1;
      this.getAllProducts(true);
    }
  }



ngOnDestroy() {

  }


  task: Task = {
    name: 'Mahindra (18)',
    completed: false,

    subtasks: [
      { name: 'Marazzo (6)', completed: false, },
      { name: 'Xuv500 (4)', completed: false, },
      { name: 'Thar (3)', completed: false, },
    ],
  };

  task2: Task = {
    name: 'Maruti Suzuki (72)',
    completed: false,

    subtasks: [
      { name: 'Marazzo (6)', completed: false, },
      { name: 'Xuv500 (4)', completed: false, },
      { name: 'Thar (3)', completed: false, },
    ],
  };

  seasons: string[] = ['2020 & above (121)', '2018 & above (222)', '2016 & above (256)', '2014 & above (269)', '2012 & above (274)'];

  kmSDriven: string[] = ['30,000 kms or less (52)', '30,000 kms or less (52)', '50,000 kms or less (92)', '75,000 kms or less (117)', '1,00,000 kms or less (127)'];

  colorSelect: any[] = [
    {
      id: '1',
      colorCode: '#c0c0c0'
    },
    {
      id: '2',
      colorCode: '#000'
    },
    {
      id: '3',
      colorCode: '#9932cc'
    },
    {
      id: '4',
      colorCode: '#800080'
    },
    {
      id: '5',
      colorCode: '#1e6fd8'
    },
    {
      id: '6',
      colorCode: '#2daf41'
    },
    {
      id: '7',
      colorCode: '#dbcaa9'
    },
    {
      id: '8',
      colorCode: '#ffff35'
    },
    {
      id: '8',
      colorCode: '#f22f37'
    },
    {
      id: '9',
      colorCode: '#dd0000'
    },
  ]

  allSelect: any[] = [
    {
      id: '1',
      name: 'Child safety locks (264)'
    },
    {
      id: '2',
      name: 'Central locking (259)'
    },
    {
      id: '3',
      name: 'Power steering (251)'
    },
    {
      id: '4',
      name: 'Integrated (in-dash) music system (228)'
    },
    {
      id: '5',
      name: 'Power windows (177)'
    },
    {
      id: '6',
      name: 'Rear AC vent (121)'
    },
    {
      id: '7',
      name: 'Rear parking sensor (128)'
    },
    {
      id: '8',
      name: 'Rear camera (143)'
    },
    {
      id: '9',
      name: 'GPS navigation system (138)'
    },
    {
      id: '10',
      name: 'Airbags (201)'
    },
    {
      id: '11',
      name: 'ABS (235)'
    },
  ]


  allPrice: any[] = [
    {
      id: '1',
      name: '2000000 (264)'
    },
    {
      id: '2',
      name: '400000 (259)'
    },
    {
      id: '3',
      name: '5000000 (251)'
    },
    {
      id: '4',
      name: '4000000 (228)'
    },
    {
      id: '5',
      name: 'Power windows (177)'
    },
    {
      id: '6',
      name: 'Rear AC vent (121)'
    },
    {
      id: '7',
      name: 'Rear parking sensor (128)'
    },
    {
      id: '8',
      name: 'Rear camera (143)'
    },
    {
      id: '9',
      name: 'GPS navigation system (138)'
    },
    {
      id: '10',
      name: 'Airbags (201)'
    },
    {
      id: '11',
      name: 'ABS (235)'
    },
  ]

}



