import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';





import { SwiperModule } from 'swiper/angular';

import { ToLetDetailsRoutingModule } from './to-let-details-routing.module';
import { ToLetDetailsComponent } from './to-let-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
@NgModule({
  declarations: [
    ToLetDetailsComponent,

  ],
  imports: [
    CommonModule,
    ToLetDetailsRoutingModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
      MatInputModule,
      NgxMatTimepickerModule,
      FormsModule,
      ReactiveFormsModule,

      NgxMatDatetimePickerModule,
  ]
})
export class ToLetDetailsModule { }
