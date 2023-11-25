import { Component } from '@angular/core';

@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.component.html',
  styleUrls: ['./category-popup.component.scss']
})
export class CategoryPopupComponent {
  hideShowPopup: boolean = false;
  // showPopup: boolean = false;

  showSearch: boolean = false;
  hideShowResponsive: boolean = false;

  onInputFocus() {
    this.showSearch = !this.showSearch;
  }

  onShowAll() {
    this.hideShowResponsive = !this.hideShowResponsive;
  }


  onHideShowPopup() {
    this.hideShowPopup = !this.hideShowPopup;
  }
}
