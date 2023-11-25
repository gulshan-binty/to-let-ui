import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellFastComponent } from './sell-fast.component';

const routes: Routes = [
  {
    path: '',
    component: SellFastComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellFastRoutingModule { }
