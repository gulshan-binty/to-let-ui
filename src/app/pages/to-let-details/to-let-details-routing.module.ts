import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToLetDetailsComponent } from './to-let-details.component';

const routes: Routes = [
  {
    path: ':slug',
    component: ToLetDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToLetDetailsRoutingModule { }
