import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OutSideClickDirective } from './directives/out-side-click.directive';
import { ConfirmDialogComponent } from './ui/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    OutSideClickDirective,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [
    OutSideClickDirective,
    ConfirmDialogComponent
  ],
  providers: []
})
export class SharedModule {
}
