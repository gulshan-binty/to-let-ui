import { Component, ViewChild } from '@angular/core';
import { CategoryPopupComponent } from 'src/app/shared/components/category-popup/category-popup.component';
import { JobPostsComponent } from 'src/app/shared/components/job-posts/job-posts.component';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.scss']
})
export class PostAdComponent {
  @ViewChild('category_popup') category_popup: CategoryPopupComponent;
  @ViewChild('job_posts') job_posts: JobPostsComponent;


  onShowHideCategoryPopup() {
    this.category_popup.onHideShowPopup();
  }


  onShowHideJobPosts() {
    this.job_posts.onHideShowPopup();
  }



}
