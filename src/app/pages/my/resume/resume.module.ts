import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeComponent } from './resume.component';
import { BasicInformationComponent } from './basic-information/basic-information.component';
import { AdditionalInformationComponent } from './additional-information/additional-information.component';
import { PastEmploymentComponent } from './past-employment/past-employment.component';


@NgModule({
  declarations: [
    ResumeComponent,
    BasicInformationComponent,
    AdditionalInformationComponent,
    PastEmploymentComponent
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule
  ]
})
export class ResumeModule { }
