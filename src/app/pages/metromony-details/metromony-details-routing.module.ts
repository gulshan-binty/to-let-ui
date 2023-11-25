import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MetromonyDetailsComponent} from "./metromony-details.component";

const routes: Routes = [
  {
    path: ':id',
    component: MetromonyDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetromonyDetailsRoutingModule { }
