import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoPageService } from 'src/app/services/common/seo-page.service';
import { AdditionalPageService } from '../../services/core/additional-page.service';
import { SeoPage } from 'src/app/interfaces/common/seo-page.interface';
import {CanonicalService} from "../../services/core/canonical.service";

@Component({
  selector: 'app-extra-page-view',
  templateUrl: './additional-page-view.component.html',
  styleUrls: ['./additional-page-view.component.scss']
})
export class AdditionalPageViewComponent implements OnInit, OnDestroy {

  slug: string = null;
  pageInfo: any = '';
  msg = '';

  // Store Data
  seoPage: SeoPage;

  //Subscription
  private subRouteOne: Subscription;
  private subReloadOne: Subscription;
  private subSeoDataOne: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private additionalPageService: AdditionalPageService,
    private title: Title,
    private meta: Meta,
    private seoPageService: SeoPageService,
    private canonicalService: CanonicalService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.subReloadOne = this.activatedRoute.paramMap.subscribe(param => {
      this.slug = param.get('pageSlug');
      this.getPageInfo();
    });

    // Base Data
    // this.getSeoPageByPageWithCache();
  }

/**
 * HTTP REQ HANDLE
 * getSeoPageByPageWithCache()
*/
  // private getSeoPageByPageWithCache() {
  //   const select = 'name image seoDescription keyWord pageName'
  //   this.subSeoDataOne = this.seoPageService.getSeoPageByPageWithCache('about_us', select)
  //     .subscribe({
  //       next: res => {
  //         this.seoPage = res;
  //         if (this.seoPage) {
  //           this.updateMetaData();
  //         }
  //       },
  //       error: err => {
  //         console.log(err);
  //       }
  //     })
  // }

  /**
   * SEO DATA UPDATE
   * updateMetaData()
  */
  private updateMetaData() {
    // Title
    this.title.setTitle(this.seoPage?.name);

    // Meta
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'theme-color', content: '#00a0db' });
    this.meta.updateTag({ name: 'copyright', content: 'digihaat.com.bd' });
    this.meta.updateTag({ name: 'author', content: 'digihaat.com.bd' });
    this.meta.updateTag({ name: 'description', content: this.seoPage?.seoDescription });
    this.meta.updateTag({ name: 'keywords', content: this.seoPage?.keyWord });

    // Open Graph(og:)
    this.meta.updateTag({ property: 'og:title', content: this.seoPage?.name });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: `https://digihaat.com.bd${this.router.url}` }); this.meta.updateTag({ property: 'og:image', content: this.seoPage?.image });
    // this.meta.updateTag({property: 'og:image:type', content: 'image/jpeg'});
    this.meta.updateTag({ property: 'og:image:width', content: '300' });
    this.meta.updateTag({ property: 'og:image:height', content: '300' });
    this.meta.updateTag({ property: 'og:description', content: this.seoPage?.seoDescription });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
    this.meta.updateTag({ property: 'og:site_name', content: 'digihaat.com.bd' });

    // Twitter
    this.meta.updateTag({ name: 'twitter:title', content: this.seoPage?.name });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@digihaat' });
    this.meta.updateTag({ name: 'twitter:creator', content: '@digihaat' });
    this.meta.updateTag({ name: 'twitter:description', content: this.seoPage?.seoDescription });

    // Microsoft
    this.meta.updateTag({ name: 'msapplication-TileImage', content: this.seoPage?.image });

    // Canonical
    this.canonicalService.setCanonicalURL();

  }

  /**
   * HTTP REQ HANDLE
   * @private
   */

  private getPageInfo() {
    this.subRouteOne = this.additionalPageService.getAdditionalPageBySlug(this.slug)
      .subscribe(res => {
        this.pageInfo = res.data;
        console.log('this.pageInfo',this.pageInfo)
        if (!this.pageInfo) {
          this.msg = '<h2>Coming Soon!</h2>'
        }
      }, error => {
        console.log(error);
      });
  }

  /**
   * NG DESTROY
   */
  ngOnDestroy() {
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe()
    }
    if (this.subReloadOne) {
      this.subReloadOne.unsubscribe()
    }
    if (this.subSeoDataOne) {
      this.subSeoDataOne.unsubscribe();
    }
  }

}
