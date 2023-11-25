import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillEditorComponent } from "ngx-quill";
import { CategoryPopupModule } from 'src/app/shared/components/category-popup/category-popup.module';
import { DropZoneModule } from 'src/app/shared/components/drop-zone/drop-zone.module';
import { JobPostsModule } from 'src/app/shared/components/job-posts/job-posts.module';
import { JobSelectComponent } from './job-select/job-select.component';
import { PostAdRoutingModule } from './post-ad-routing.module';
import { PostAdComponent } from './post-ad.component';
import { PostJobOverseasComponent } from './post-job-overseas/post-job-overseas.component';
import { ProductAddDetailsComponent } from './product-add-details/product-add-details.component';
import { ToletPostComponent } from './tolet-post/tolet-post.component';
import {MaterialModule} from "../../material/material.module";
import {DigitOnlyModule} from "@uiowa/digit-only";

@NgModule({
  declarations: [
    PostAdComponent,
    PostJobOverseasComponent,
    ProductAddDetailsComponent,
    JobSelectComponent,
    ToletPostComponent,
  ],
  imports: [
    CommonModule,
    PostAdRoutingModule,
    CategoryPopupModule,
    JobPostsModule,
    DropZoneModule,
    QuillEditorComponent,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DigitOnlyModule
  ]
})
export class PostAdModule { }
