import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreamsAndConditionComponent } from './treams-and-condition.component';

const routes: Routes = [
  {
    path: '',
    component: TreamsAndConditionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreamsAndConditionRoutingModule { }
