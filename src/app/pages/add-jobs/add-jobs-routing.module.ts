import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddJobsComponent} from "./add-jobs.component";

const routes: Routes = [
  {
    path: '',
    component: AddJobsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddJobsRoutingModule { }
