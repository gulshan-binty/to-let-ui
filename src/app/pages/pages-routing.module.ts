import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthStateGuard } from "../auth-guard/user-auth-state.guard";
import { UserAuthGuard } from "../auth-guard/user-auth.guard";
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'product-list',
        loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule)
      },
      // {
      //   path: 'product-details',
      //   loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule)
      // },
      {
        path: 'to-let-details',
        loadChildren: () => import('./to-let-details/to-let-details.module').then(m => m.ToLetDetailsModule)
      },
      // {
      //   path: 'job-details',
      //   loadChildren: () => import('./job-details/job-details.module').then(m => m.JobDetailsModule)
      // },
      // {
      //   path: 'sell-fast',
      //   loadChildren: () => import('./sell-fast/sell-fast.module').then(m => m.SellFastModule)
      // },
      // {
      //   path: 'membership',
      //   loadChildren: () => import('./membership/membership.module').then(m => m.MembershipModule)
      // },
      // {
      //   path: 'advertising',
      //   loadChildren: () => import('./advertising/advertising.module').then(m => m.AdvertisingModule)
      // },
      // {
      //   path: 'promotions',
      //   loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsModule)
      // },
      // {
      //   path: 'stay-safe',
      //   loadChildren: () => import('./stay-safe/stay-safe.module').then(m => m.StaySafeModule)
      // },
      // {
      //   path: 'contact-us',
      //   loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule)
      // },
   
      // {
      //   path: 'about-us',
      //   loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)
      // },
      // {
      //   path: 'careers',
      //   loadChildren: () => import('./careers/careers.module').then(m => m.CareersModule)
      // },
      // {
      //   path: 'trams-and-condition',
      //   loadChildren: () => import('./treams-and-condition/treams-and-condition.module').then(m => m.TreamsAndConditionModule)
      // },
      // {
      //   path: 'privacy-policy',
      //   loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
      // },
      // {
      //   path: 'sitemap',
      //   loadChildren: () => import('./sitemap/sitemap.module').then(m => m.SitemapModule)
      // },
      {
        path: 'post-ad',
        loadChildren: () => import('./post-ad/post-ad.module').then(m => m.PostAdModule),
        canActivate: [UserAuthGuard],
      },
    
      // {
      //   path: 'add-biodata',
      //   loadChildren: () => import('./add-biodata/add-biodata.module').then(m => m.AddBiodataModule)
      // },
      // {
      //   path: 'add-jobs',
      //   loadChildren: () => import('./add-jobs/add-jobs.module').then(m => m.AddJobsModule)
      // },
      // {
      //   path: 'metromony-details',
      //   loadChildren: () => import('./metromony-details/metromony-details.module').then(m => m.MetromonyDetailsModule),
      //   canActivate: [UserAuthGuard],
      // },
      // {
      //   path: 'my',
      //   loadChildren: () => import('./my/my.module').then(m => m.MyModule)
      // },
      {
        path: 'update-profile',
        loadChildren: () => import('./update-profile/update-profile.module').then(m => m.UpdateProfileModule)
      },
      // {
      //   path: 'faq',
      //   loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule)
      // },
      {
        path: 'management-panel',
        loadChildren: () => import('./management-panel/management-panel.module').then(m => m.ManagementPanelModule)
      },
      {
        path: 'pricing',
        loadChildren: () => import('./pricing/pricing.module').then(m => m.PricingModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./user/login/login.module').then(m => m.LoginModule),
        canActivate: [UserAuthStateGuard],
      },
      {
        path: 'pages',
        loadChildren: () => import('./additional-page-view/additional-page-view.module').then(m => m.AdditionalPageViewModule),
        data: {preload: false, delay: false}
      },
      {
        path: 'complete-registration',
        loadChildren: () => import('./user/complete-registration/complete-registration.module').then(m => m.CompleteRegistrationModule),
        canActivate: [UserAuthStateGuard],
      },
      {
        path: 'registration-success',
        loadChildren: () => import('./user/registration-success/registration-success.module').then(m => m.RegistrationSuccessModule),
        canActivate: [UserAuthStateGuard],
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        canActivate: [UserAuthGuard],
        data: { preload: true, delay: 20 },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserAuthGuard, UserAuthStateGuard]
})
export class PagesRoutingModule { }
// ,{
//   scrollPositionRestoration: 'enabled',
//     anchorScrolling: 'enabled',
//     preloadingStrategy: CustomPreloadingStrategy
// }
