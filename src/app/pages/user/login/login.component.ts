import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {OtpService} from "../../../services/common/otp.service";
import {SeoPageService} from "../../../services/common/seo-page.service";
import {UserService} from "../../../services/common/user.service";
import {ReloadService} from "../../../services/core/reload.service";
import {UiService} from "../../../services/core/ui.service";
import {StorageService} from '../../../services/core/storage.service';
import {DATABASE_KEY} from '../../../core/utils/global-variable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  dataForm: FormGroup;
  hidePopup: boolean = true;

  isOtpSent: boolean = false;
  isOtpValid: boolean = false;

  public sendVerificationCode = false;
  countDown = 0;
  isCountDownEnd = false;
  timeInstance = null;

  isLoading = false;
  navigateFrom: string = null;

  onShowMenu() {
    this.hidePopup = true;
  }

  onHideMenu() {
    this.hidePopup = false;
    history.back();
  }

  // Subscriptions
  private subRouteOne: Subscription;
  private subOtpGenerate: Subscription;
  private subOtpValidate: Subscription;
  private subDataOne: Subscription;


  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public otpService: OtpService,
    public userService: UserService,
    private reloadService: ReloadService,
    private title: Title,
    private meta: Meta,
    private seoPageService: SeoPageService,
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
   */
  initialForm() {
    this.dataForm = this.fb.group({
      phoneNo: [null, [Validators.minLength(11), Validators.maxLength(11), Validators.required]],
      code: [null],
    });
  }


  /**
   * Form submit function
   * onSubmit()
   */
  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.wrong('Please enter 11 digit phone number.');
      return;
    }
    if (!this.isOtpSent) {
      this.generateOtpWithPhoneNo(this.dataForm.value.phoneNo);
    } else {
      this.validateOtpWithPhoneNo(this.dataForm.value)
    }

  }

  resendOtp() {
    if (this.dataForm.invalid) {
      this.uiService.wrong('Please enter 11 digit phone number.');
      return;
    }
    this.generateOtpWithPhoneNo(this.dataForm.value.phoneNo);
  }


  /**
   * HTTP REQ HANDLE
   * generateOtpWithPhoneNo()
   * validateOtpWithPhoneNo()
   */

  generateOtpWithPhoneNo(phoneNo: string) {
    this.isLoading = true;
    this.countTime(60);
    this.subOtpGenerate = this.otpService.generateOtpWithPhoneNo(phoneNo)
      .subscribe({
        next: ((res) => {
          if (res.success) {
            this.isOtpSent = true;
            this.uiService.success(res.message);
            this.isLoading = false;
            this.sendVerificationCode = true;
          } else {
            this.isOtpSent = false;
            this.uiService.warn(res.message);
          }
        }),
        error: ((error) => {
          this.isOtpSent = false;
          this.isLoading = false;
          console.log(error);
        })
      });
  }

  validateOtpWithPhoneNo(data: { phoneNo: string, code: string }) {
    this.isLoading = true;
    this.subOtpValidate = this.otpService.validateOtpWithPhoneNo(data)
      .subscribe({
        next: ((res) => {
          if (res.success) {
            this.isOtpValid = true;
            this.sendVerificationCode = false;
            const regData = {
              phoneNo: data.phoneNo,
              username: data.phoneNo,
              registrationType: 'phone',
              hasAccess: false,
            }
            this.checkUserForRegistration(regData);
          } else {
            this.isOtpValid = false;
            this.isLoading = false;
            this.uiService.warn(res.message);
          }
        }),
        error: ((error) => {
          this.isOtpValid = false;
          this.isLoading = false;
          console.log(error);
        })
      });
  }

  private checkUserForRegistration(data: any) {
    this.userService.checkUserForRegistration(data.phoneNo)
      .subscribe({
        next: res => {
          if (res.success) {
            this.isLoading = false;
            this.userService.userSignupAndLoginSocial(
              data,
              this.navigateFrom
            );
          } else {
            this.isLoading = false;
            this.storageService.storeDataToSessionStorage(DATABASE_KEY.regSessionData, data);
            this.router.navigate(['/complete-registration'], {
              queryParams: {navigateFrom: this.navigateFrom},
              queryParamsHandling: 'merge'
            })
          }
        },
        error: err => {
          this.isLoading = false;
          console.log(err)
        }
      })
  }


  // CountDown...
  countTime(time?) {
    const count = (num) => () => {
      this.countDown = num;
      num = num === 0 ? 0 : num - 1;
      if (num <= 0) {
        clearInterval(this.timeInstance);
        this.countDown = 0;
        this.isCountDownEnd = true;
      }
    };
    this.timeInstance = setInterval(count(time), 1000);
  }


  /**
   * ON Destroy
   */

  ngOnDestroy() {
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
    if (this.subOtpGenerate) {
      this.subOtpGenerate.unsubscribe();
    }
    if (this.subOtpValidate) {
      this.subOtpValidate.unsubscribe();
    }
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }

}
