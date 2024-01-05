import {User} from './user.interface';
import {Category} from './category.interface';
import {SubCategory} from './sub-category.interface';
import {Tag} from './tag.interface';
import {Division} from './division.interface';
import {Area} from './area.interface';
import {Zone} from './zone.interface';

export interface Product {
  _id?: string;
  postType?: 'to_let';
  name?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  costPrice?: number;
  salePrice?: number;
  discountType?: number;
  discountAmount?: number;
  images?: string[];
  quantity?: number;
  viewCount?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeyword?: string;
  user?: User;
  category?: Category;
  subCategory?: SubCategory;
  tags?: Tag[];
  status?: 'publish' | 'draft';
  videoUrl?: string;
  waterSystem?: boolean;
  meterType?: string;
  nearestMarketDistance?: string;
  nearestMosqueDistance?: string;
  floorsInHouse?: string;
  whichFloorRented?: string;
  productType?: string;
  howManyCorridors?: string;
  howLongUsed?: string;


  // To Let
  balcony?: string;
  bedroom?: string;
  bathroom?: string;
  availableFrom?: string;
  floorNo?: string;
  flatCategory?: string;
  flatType?: string;
  address?: string;
  division?: Division;
  area?: Area;
  zone?: Zone;
  rentPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
  email?:string;
  phone?:string}



export interface ProductFilterGroup {
  categories: GroupCategory[];
}

interface GroupCategory {
  _id: {
    category: string
  },
  name: string;
  slug: string;
  total: number;
  select?: boolean;
}

// export interface ProductSpecification {
//   name?: string;
//   value?: string;
//   type?: string;
// }

// export interface ProductFeature {
//   name?: string;
//   value?: string;
// }


// export interface PriceData {
//   _id: string;
//   costPrice: number;
//   salePrice: number;
//   discountType?: number;
//   discountAmount?: number;
//   quantity: number;
//   soldQuantity?: number;
//   unit: string;
//   name: string;
//   unitValue:any
// }
