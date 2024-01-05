import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillEditorComponent } from "ngx-quill";

import { DropZoneModule } from 'src/app/shared/components/drop-zone/drop-zone.module';
// import { JobPostsModule } from 'src/app/shared/components/job-posts/job-posts.module';

import { PostAdRoutingModule } from './post-ad-routing.module';
import { PostAdComponent } from './post-ad.component';

import { ToletPostComponent } from './tolet-post/tolet-post.component';
import {MaterialModule} from "../../material/material.module";
import {DigitOnlyModule} from "@uiowa/digit-only";
import { AddPostPriceComponent } from './add-post-price/add-post-price.component';

@NgModule({
  declarations: [
    PostAdComponent,
    
    ToletPostComponent,
         AddPostPriceComponent,
  ],
  imports: [
    CommonModule,
    PostAdRoutingModule,
 
    // JobPostsModule,
    DropZoneModule,
    QuillEditorComponent,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DigitOnlyModule
  ]
})
export class PostAdModule { }
