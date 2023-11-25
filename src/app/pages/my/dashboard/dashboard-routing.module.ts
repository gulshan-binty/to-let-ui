import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { MyMembershipComponent } from './my-membership/my-membership.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-account',
        pathMatch: 'full'
      },
      {
        path: 'my-account',
        component: MyAccountComponent
      },
      {
        path: 'membership',
        component: MyMembershipComponent
      },
      {
        path: 'favorite-ads',
        component: MyFavoritesComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
