import { Component } from '@angular/core';

@Component({
  selector: 'app-job-posts',
  templateUrl: './job-posts.component.html',
  styleUrls: ['./job-posts.component.scss']
})
export class JobPostsComponent {

  hideShowPopup: boolean = false;
  // showPopup: boolean = false;

  showSearch: boolean = false;
  hideShowResponsive: boolean = false;

  onShowAll() {
    this.hideShowResponsive = !this.hideShowResponsive;
  }


  onHideShowPopup() {
    this.hideShowPopup = !this.hideShowPopup;
  }

}
