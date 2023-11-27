import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { MatDialogRef } from "@angular/material/dialog";
import { UiService } from 'src/app/services/core/ui.service';
import { ReloadService } from 'src/app/services/core/reload.service';

@Component({
  selector: 'app-metrimony-popup',
  templateUrl: './metrimony-popup.component.html',
  styleUrls: ['./metrimony-popup.component.scss']
})
export class MetrimonyPopupComponent implements OnInit, OnDestroy {
  @ViewChild('formElement') formElement: NgForm;
  @ViewChild('formElement1') formElement1: NgForm;
  @ViewChild('el') el: ElementRef;
  //Store Data
  maleDataForm!: FormGroup;
  femaleDataForm!: FormGroup;
  acceptTermsCondition: boolean;

  totalFemaleShariNumber = 0;


  id: string;
  selectedCategory: string;


  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private matDialogRef: MatDialogRef<MetrimonyPopupComponent>,
    private reloadService: ReloadService

  ) {

  }

  ngOnInit(): void {
    this.onInitMaleForm();
    this.onInitFemaleForm();
  }

  /**
   * MALE CONTROLL FORM METHODS
   * onInitMaleForm()
   * onSubmitMaleForm()
   */
  private onInitMaleForm() {
    this.maleDataForm = this.fb.group({
      namaz: [null, Validators.required],
      movementOrSocial: [null, Validators.required],
      halalIncome: [null, Validators.required],
      wifeCustody: [null, Validators.required],
      badHavvit: [null, Validators.required],
      mahramMaintain: [null, Validators.required],
      sunnahBeard: [null, Validators.required]
    })
  }

  public onSubmitMaleForm() {
    if (!this.acceptTermsCondition || this.acceptTermsCondition == null || this.acceptTermsCondition == undefined) {
      let el = this.el.nativeElement as HTMLDivElement;
      this.acceptTermsCondition = false;
      this.uiService.warn('Please Accept Terms & Conditions');
      el.scrollTo(0, 0)
      return;
    }

    if (this.maleDataForm.invalid) {
      this.uiService.warn('Please Answer all questions Yes or No');
      return;
    } else {
      if (this.totalMaleMarks >= 75) {
        this.reloadService.needRefreshDialog$(true);

      } else {
        this.reloadService.needRefreshDialog$(false);
      }
      this.formElement.resetForm();
      this.matDialogRef.close();
    }

  }


  /**
 * Female CONTROLL FORM METHODS
 * onInitFemaleForm()
 * onSubmitFemaleForm()
 */
  private onInitFemaleForm() {
    this.femaleDataForm = this.fb.group({
      namaz: [null, Validators.required],
      shariMaintain: this.fb.group({
        typeOfClothing: [null],
        zilbarKhimaNiqab: [null],
        faceCovered: [null],
        handOrFootCover: [null],
        eyesCovered: [null],
        blackColorDress: [null],
        otherColorDress: [null]
      }),
      mahramMaintain: [null, Validators.required]
    })
  }

  public onSubmitFemaleForm() {

    if (!this.acceptTermsCondition || this.acceptTermsCondition == null || this.acceptTermsCondition == undefined) {
      let el = this.el.nativeElement as HTMLDivElement;
      this.acceptTermsCondition = false;
      this.uiService.warn('Please Accept Terms & Conditions');
      el.scrollTo(0, 0)
      return;
    }


    if (this.femaleDataForm.invalid) {
      this.uiService.warn('Please Answer all questions Yes or No');
      return;

    } else {
      this.calculateFemaleShariNumber();

      if (this.totalFemaleMarks >= 75) {
        this.reloadService.needRefreshDialog$(true);
      } else {
        this.reloadService.needRefreshDialog$(false);
      }

      this.formElement1.resetForm();
      this.matDialogRef.close();

    }

  }

  onFemaleShariGroupValuePatch(event: any, controllName: string, patchValue: number) {
    if (event.checked === true) {
      (this.femaleDataForm.get('shariMaintain') as FormGroup).get(controllName).patchValue(patchValue);
    } else {
      (this.femaleDataForm.get('shariMaintain') as FormGroup).get(controllName).patchValue(null);
    }
  }

  //Calculate Number 

  private calculateFemaleShariNumber() {
    this.totalFemaleShariNumber = 0;
    for (const field in (this.femaleDataForm.get('shariMaintain') as FormGroup).controls) {
      if ((this.femaleDataForm.get('shariMaintain') as FormGroup).get(field).value !== null) {
        this.totalFemaleShariNumber = this.totalFemaleShariNumber + parseInt((this.femaleDataForm.get('shariMaintain') as FormGroup).get(field).value);
      }
    }
  }

  private get totalFemaleMarks() {
    return parseInt(this.femaleDataForm.value.namaz) + this.totalFemaleShariNumber + parseInt(this.femaleDataForm.value.mahramMaintain);
  }

  private get totalMaleMarks() {
    let totalMalePassedMark = 0;
    for (let field in this.maleDataForm.controls) {
      totalMalePassedMark = totalMalePassedMark + (parseInt(this.maleDataForm.get(field).value));
    }
    return totalMalePassedMark;

  }



  onCategory(event: any) {
    this.selectedCategory = event.target.value;
  }

  onGoBack() {
    history.back();
  }




  /**
   * On Destroy
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
  }
}
