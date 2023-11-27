import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementPanelRoutingModule } from './management-panel-routing.module';
import { ManagementPanelComponent } from './management-panel.component';
import {ProfileCardModule} from "../../shared/components/profile-card/profile-card.module";


@NgModule({
  declarations: [
    ManagementPanelComponent
  ],
  imports: [
    CommonModule,
    ManagementPanelRoutingModule,
    ProfileCardModule
  ]
})
export class ManagementPanelModule { }
