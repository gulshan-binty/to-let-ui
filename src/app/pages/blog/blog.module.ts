import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlogCardTwoModule } from 'src/app/shared/components/blog-card-two/blog-card-two.module';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';


@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    BlogCardTwoModule
  ]
})
export class BlogModule { }
