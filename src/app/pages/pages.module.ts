import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderModule } from '../core/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {PipesModule} from "../shared/pipes/pipes.module";


@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FooterModule,
    HeaderModule,
    PipesModule
  ]
})
export class PagesModule { }
