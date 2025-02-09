import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationSuccessComponent} from './registration-success.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationSuccessRoutingModule { }
