import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { MyBioDataComponent } from './my-bio-data/my-bio-data.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersComponent } from './orders/orders.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { ReferAndEarnComponent } from './refer-and-earn/refer-and-earn.component';
import { RequestMedicineComponent } from './request-medicine/request-medicine.component';
import { SpecialsOffersComponent } from './specials-offers/specials-offers.component';
import { UserAccountComponent } from './user-account/user-account.component';

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
          {
            path: 'order-list/:orderId',
            component: OrderListComponent
          }
        ]
      },
      {
        path: 'my-account',
        component: UserAccountComponent
      },
      {
        path: 'my-bio-data',
        component: MyBioDataComponent
      },
      {
        path: 'prescriptions',
        component: PrescriptionsComponent
      },
      {
        path: 'favorite',
        component: FavoriteComponent
      },
      {
        path: 'request-medicine',
        component: RequestMedicineComponent
      },
      {
        path: 'refer-and-earn',
        component: ReferAndEarnComponent
      },
      {
        path: 'faqs',
        component: FaqsComponent
      },
      {
        path: 'specials-offers',
        component: SpecialsOffersComponent
      },
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
