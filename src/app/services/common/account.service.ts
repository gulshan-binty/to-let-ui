import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountShow = new BehaviorSubject<boolean>(true);
  orderBackShow = new BehaviorSubject<boolean>(true);

  constructor() { }
}
