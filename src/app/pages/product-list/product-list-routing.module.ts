import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListJobComponent } from './product-list-job/product-list-job.component';
import { ProductListMatrimonialComponent } from './product-list-matrimonial/product-list-matrimonial.component';
import { ProductListProductComponent } from './product-list-product/product-list-product.component';
import { ProductListToLetComponent } from './product-list-to-let/product-list-to-let.component';
import { ProductListComponent } from './product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    children: [
      {
        path: '',
        redirectTo: "matrimonial-list",
        pathMatch: "full"
      },
      {
        path: "matrimonial-list",
        component: ProductListMatrimonialComponent
      },
      {
        path: "products",
        component: ProductListProductComponent
      },
      {
        path: "job-list",
        component: ProductListJobComponent
      },
      {
        path: "to-let-list",
        component: ProductListToLetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule { }
