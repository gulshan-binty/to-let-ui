import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyMembershipComponent } from './my-membership/my-membership.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MyAccountComponent,
    MyMembershipComponent,
    MyFavoritesComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule
  ]
})
export class DashboardModule { }
