import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from 'src/app/interfaces/common/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  categorySelect = new Subject<Category>();

  constructor() { }
}
