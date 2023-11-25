import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { UpcomingDialogComponent } from './upcoming-dialog.component';



@NgModule({
  declarations: [
    UpcomingDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class UpcomingDialogModule { }
