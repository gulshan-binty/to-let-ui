import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropDownModule } from './../../shared/components/drop-down/drop-down.module';

import { SitemapRoutingModule } from './sitemap-routing.module';
import { SitemapComponent } from './sitemap.component';


@NgModule({
  declarations: [
    SitemapComponent
  ],
  imports: [
    CommonModule,
    SitemapRoutingModule,
    DropDownModule
  ]
})
export class SitemapModule { }
