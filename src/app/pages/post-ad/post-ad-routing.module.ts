import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostAdComponent } from './post-ad.component';

import { ToletPostComponent } from './tolet-post/tolet-post.component';
import { AddPostPriceComponent } from './add-post-price/add-post-price.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PostAdComponent,
        pathMatch: 'full'
      },
    
      // {
      //   path: 'post-job',
      //   component: PostJobOverseasComponent
      // },
      // {
      //   path: 'edit-job/:id',
      //   component: PostJobOverseasComponent
      // },
      // {
      //   path: 'product-add',
      //   component: ProductAddDetailsComponent
      // },

      // {
      //   path: 'edit-product/:id',
      //   component: ProductAddDetailsComponent
      // },
      {
        path: 'tolet-add',
        component: ToletPostComponent
      },
      {
        path: 'edit-tolet/:id',
        component: ToletPostComponent
      },
      {
        path: 'add-post-price',
        component: AddPostPriceComponent
      },
      // {
      //   path: 'select-job',
      //   component: JobSelectComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostAdRoutingModule { }
