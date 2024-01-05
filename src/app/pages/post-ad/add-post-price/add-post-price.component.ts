import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UiService} from '../../../services/core/ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/common/user.service';
import {StorageService} from '../../../services/core/storage.service';
import {DATABASE_KEY} from '../../../core/utils/global-variable';

@Component({
  selector: 'app-add-post-price',
  templateUrl: './add-post-price.component.html',
  styleUrls: ['./add-post-price.component.scss']
})
export class AddPostPriceComponent implements OnInit, OnDestroy {

  dataForm: FormGroup;
  isLoading = false;
  navigateFrom: string = null;
  numberData:any='01851519188'
  elementType = 'url';
  // Subscriptions
  private subRouteOne: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {

    // initialize form
    this.initialForm();

    this.subRouteOne = this.activatedRoute.queryParamMap.subscribe(qParam => {
      if (qParam.get('navigateFrom')) {
        this.navigateFrom = qParam.get('navigateFrom');
      }
    })

  }

  /**
   * form initialize function
   * initialForm()
   * onSubmit()
   */
  initialForm() {
    this.dataForm = this.fb.group({
      transactionId: [null, Validators.required],
      amount: [50, Validators.required],
    });
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.wrong('Please enter 11 digit phone number.');
      return;
      }

    // const regData = this.storageService.getDataFromSessionStorage(DATABASE_KEY.regSessionData);
    if (this.dataForm.valid) {
      this.router.navigate(['/post-ad/tolet-add'], 
      )
    }
    // } else {
    //   const data = {
    //     ...regData,
    //     ...this.dataForm.value
    //   };
    //   // this.userSignup(data);
    //   // this.userService.userSignupAndLoginSocial(
    //   //   {
    //   //     ...regData,
    //   //     ...this.dataForm.value
    //   //   },
    //   //   this.navigateFrom
    //   // );
    // }


  }

  // private userSignup(data: any) {
  //   this.isLoading = true;
  //   this.userService.userSignup(data).subscribe({
  //     next: res => {
  //       this.isLoading = false;
  //       if (res.success) {
  //         this.uiService.success(res.message);
  //         this.router.navigate(['/post-ad/tolet-add']) 
  //       } else {
  //         this.uiService.wrong(res.message);
  //       }
  //     },
  //     error: err => {
  //       this.isLoading = false;
  //       console.log(err)
  //     }

  //   })
  // }

  /**
   * ON Destroy
   */

  ngOnDestroy() {
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
  }

}
