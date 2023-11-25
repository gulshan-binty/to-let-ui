import {Division} from './division.interface';
import {Area} from './area.interface';
import {Zone} from './zone.interface';

export interface Address {
  _id?: string;
  addressType?: string;
  city?: string;
  phone?: string;
  address?: string;
  name?: string;
  division?: Division;
  setDefaultAddress?:boolean;
  area?: Area;
  zone?: Zone;
}
