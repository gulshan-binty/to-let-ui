import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared.module';
import { ProductCardOneComponent } from './product-card-one.component';


@NgModule({
  declarations: [
    ProductCardOneComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    MatTooltipModule,
    SharedModule,
    MatIconModule
  ],
  exports: [
    ProductCardOneComponent
  ]
})
export class ProductCardOneModule {
}
