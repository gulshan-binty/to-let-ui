import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalInformationComponent } from './additional-information/additional-information.component';
import { BasicInformationComponent } from './basic-information/basic-information.component';
import { PastEmploymentComponent } from './past-employment/past-employment.component';
import { ResumeComponent } from './resume.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ResumeComponent
      },
      {
        path: 'add',
        loadChildren: () => import('./add/add.module').then(m => m.AddModule)
      },
      {
        path: 'basic-information',
        component: BasicInformationComponent
      },
      {
        path: 'additional-information',
        component: AdditionalInformationComponent
      },
      {
        path: 'past-employment',
        component: PastEmploymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumeRoutingModule { }
