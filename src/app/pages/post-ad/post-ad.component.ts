import { Component, ViewChild } from '@angular/core';
import { CategoryPopupComponent } from 'src/app/shared/components/category-popup/category-popup.component';
import { JobPostsComponent } from 'src/app/shared/components/job-posts/job-posts.component';
import {MetrimonyPopupComponent} from "../../shared/components/metrimony-popup/metrimony-popup.component";
import {HeaderService} from "../../services/common/header.service";
import {DashboardService} from "../../services/common/dashboard.service";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/common/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.scss']
})
export class PostAdComponent {
  @ViewChild('category_popup') category_popup: CategoryPopupComponent;
  @ViewChild('job_posts') job_posts: JobPostsComponent;



  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
  ) {

  }


  onShowHideCategoryPopup() {
    this.category_popup.onHideShowPopup();
  }


  onShowHideJobPosts() {
    this.job_posts.onHideShowPopup();
  }
  /**
   * UpcomingDialogComponent
   * openDialog()
   */
  openDialog() {
    if (this.userService.getUserId()) {
      this.dialog.open(MetrimonyPopupComponent, {
        maxWidth: "1000px",
        width: "100%",
        height: "auto"
      })
    } else {
      this.router.navigate(['/login'])
    }

  }

}
