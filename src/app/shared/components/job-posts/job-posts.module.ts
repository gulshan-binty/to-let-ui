import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobPostsComponent } from './job-posts.component';



@NgModule({
  declarations: [
    JobPostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    JobPostsComponent
  ]
})
export class JobPostsModule { }
