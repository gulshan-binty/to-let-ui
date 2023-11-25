import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasicInformationComponent } from './basic-information/basic-information.component';

import { AdditionalInformationComponent } from './additional-information/additional-information.component';
import { PastEmployementComponent } from './past-employement/past-employement.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './personal.component';


@NgModule({
  declarations: [
    PersonalComponent,
    BasicInformationComponent,
    AdditionalInformationComponent,
    PastEmployementComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule
  ]
})
export class PersonalModule { }
