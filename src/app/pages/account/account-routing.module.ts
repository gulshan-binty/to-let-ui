import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { FaqsComponent } from './faqs/faqs.component';



import { OrdersComponent } from './orders/orders.component';


import { UserAccountComponent } from './user-account/user-account.component';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            component: OrdersComponent,
          },
         
        ]
      },
      {
        path: 'my-account',
        component: UserAccountComponent
      },
 

      // {
      //   path: 'favorite',
      //   component: FavoriteComponent
      // },
      // {
      //   path: 'request-medicine',
      //   component: RequestMedicineComponent
      // },
      // {
      //   path: 'refer-and-earn',
      //   component: ReferAndEarnComponent
      // },
      {
        path: 'faqs',
        component: FaqsComponent
      },
      {
        path: 'appointment',
        component: AppointmentHistoryComponent
      },
      // {
      //   path: 'specials-offers',
      //   component: SpecialsOffersComponent
      // },
      // {
      //   path: 'manage-address',
      //   component: ManageAddressComponent
      // }
    ],
  },
  {
    path: 'my-account',
    component: UserAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
