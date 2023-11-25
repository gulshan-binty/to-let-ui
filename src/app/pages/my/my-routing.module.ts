import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyComponent } from './my.component';

const routes: Routes = [
  {
    path: '',
    component: MyComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'phone-number',
        loadChildren: () => import('./phone-number/phone-number.module').then(m => m.PhoneNumberModule)
      },
      {
        path: 'resume',
        loadChildren: () => import('./resume/resume.module').then(m => m.ResumeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRoutingModule { }
