import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobCardComponent } from './job-card.component';
import {PipesModule} from "../../pipes/pipes.module";



@NgModule({
  declarations: [
    JobCardComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        PipesModule
    ],
  exports: [
    JobCardComponent
  ]
})
export class JobCardModule { }
