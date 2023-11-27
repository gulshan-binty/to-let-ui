import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManagementPanelComponent} from "./management-panel.component";

const routes: Routes = [
  {
    path: '',
    component: ManagementPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementPanelRoutingModule { }
