import {Pagination} from "./pagination";

export interface FilterGroup {
  isGroup?: boolean;
  category?: boolean;
  subCategory?: boolean;
  brand?: boolean;
}

export interface FilterData {
  filter?: any,
  pagination?: Pagination,
  paginationProduct?: Pagination;
  filterGroup?: FilterGroup;
  select?: any;
  sort?: any;
}
