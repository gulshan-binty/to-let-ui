import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddJobsRoutingModule } from './add-jobs-routing.module';
import { AddJobsComponent } from './add-jobs.component';
import {MaterialModule} from "../../material/material.module";
import { NgxDropzoneModule } from 'ngx-dropzone';
import {QuillModule} from "ngx-quill";


@NgModule({
  declarations: [
    AddJobsComponent
  ],
  imports: [
    CommonModule,
    AddJobsRoutingModule,
    MaterialModule,
    NgxDropzoneModule,
    QuillModule,
  ]
})
export class AddJobsModule { }
