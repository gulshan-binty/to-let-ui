import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobSelectComponent } from './job-select/job-select.component';
import { PostAdComponent } from './post-ad.component';
import { PostJobOverseasComponent } from './post-job-overseas/post-job-overseas.component';
import { ProductAddDetailsComponent } from './product-add-details/product-add-details.component';
import { ToletPostComponent } from './tolet-post/tolet-post.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PostAdComponent,
        pathMatch: 'full'
      },
      {
        path: 'post-job',
        component: PostJobOverseasComponent
      },
      {
        path: 'edit-job/:id',
        component: PostJobOverseasComponent
      },
      {
        path: 'product-add',
        component: ProductAddDetailsComponent
      },

      {
        path: 'edit-product/:id',
        component: ProductAddDetailsComponent
      },
      {
        path: 'tolet-add',
        component: ToletPostComponent
      },
      {
        path: 'edit-tolet/:id',
        component: ToletPostComponent
      },
      {
        path: 'select-job',
        component: JobSelectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostAdRoutingModule { }
