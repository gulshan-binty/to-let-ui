import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-select',
  templateUrl: './job-select.component.html',
  styleUrls: ['./job-select.component.scss']
})
export class JobSelectComponent implements OnInit {
  storeRoleData: string;
  showSearch: boolean = false;

  storeJobType: string;
  showJobType: boolean = false;

  storeReqEducation: string;
  showReqEducation: boolean = false;


  ngOnInit(): void {
    document.getElementsByTagName('body')[0].addEventListener('click', () => {
      this.showSearch = false;
      this.showJobType = false;
      this.showReqEducation = false;
    });
  }

  onRoleInputFocus() {
    this.showSearch = !this.showSearch;
  }
  onSelectRoleData(data: string) {
    this.storeRoleData = data;
    this.showSearch = false;
  }


  onJobTypeInputFocus() {
    this.showJobType = !this.showJobType;
  }
  onSelectJobTypeData(data: string) {
    this.storeJobType = data;
    this.showJobType = false;
  }

  onReqEduInputFocus() {
    this.showReqEducation = !this.showReqEducation;
  }
  onSelectReqEduData(data: string) {
    this.storeReqEducation = data;
    this.showReqEducation = false;
  }


}
