import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryPopupComponent } from './category-popup.component';



@NgModule({
  declarations: [
    CategoryPopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CategoryPopupComponent
  ]
})
export class CategoryPopupModule { }
