import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UiService } from 'src/app/services/core/ui.service';

@Component({
  selector: 'app-request-medicine',
  templateUrl: './request-medicine.component.html',
  styleUrls: ['./request-medicine.component.scss']
})
export class RequestMedicineComponent implements OnInit {
  
  //Store variables
  dataFrom: FormGroup;

  constructor(
    private fb: FormBuilder,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.initForm();

  }


  /**
   * INITIALIZE FORM FUNCTION
   * initForm()
  */
  initForm() {
    this.dataFrom = this.fb.group(
      {
        medName: [null, Validators.required],
        medStrength: [null, Validators.required],
        medMedicineForm: [null, Validators.required],
        medCompany: [null, Validators.required],
      }
    );
  }

  /**
   * FORM SUBMIT FUNCTION
   * onFormSubmit()
  */
  onFormSubmit() {
    if (this.dataFrom.valid) {
      console.log(this.dataFrom.value);
      this.uiService.success('Thanks for medicine request');
    }
    else {
      this.uiService.wrong('Please provide your all data.');
    }
  }

}
