import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SnackbarNotificationComponent} from "../../shared/ui/snackbar-notification/snackbar-notification.component";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    public snackBar: MatSnackBar,
  ) { }


  /**
   * SNACKBAR
  */
  success(msg) {

    this.snackBar.openFromComponent(SnackbarNotificationComponent, {
      data: msg,
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['notification', 'success-snackbar']
    });
  }

  warn(msg) {
    this.snackBar.openFromComponent(SnackbarNotificationComponent, {
      data: msg,
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['notification', 'warn-snackbar']
    });
  }

  wrong(msg) {
    this.snackBar.openFromComponent(SnackbarNotificationComponent, {
      data: msg,
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['notification', 'wrong-snackbar']
    });
  }



}
