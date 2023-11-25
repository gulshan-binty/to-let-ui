import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import {FavoriteCardComponent} from "./favorite-card.component";



@NgModule({
  declarations: [
    FavoriteCardComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    FavoriteCardComponent
  ]
})
export class FavoriteCardModule { }
