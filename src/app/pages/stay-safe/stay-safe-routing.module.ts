import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaySafeComponent } from './stay-safe.component';

const routes: Routes = [
  {
    path: '',
    component: StaySafeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaySafeRoutingModule { }
