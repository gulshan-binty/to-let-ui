import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MaterialModule } from 'src/app/material/material.module';


import { OrderCardModule } from 'src/app/shared/components/order-card/order-card.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';
import { AccountComponent } from './account.component';
import { FaqsComponent } from './faqs/faqs.component';

import { GalleryComponent } from './gallery/gallery.component';
import { ImageCropComponent } from './image-crop/image-crop.component';


import { OrdersComponent } from './orders/orders.component';


import { UserAccountComponent } from './user-account/user-account.component';

import {
  UserProductCardLoaderModule
} from "../../shared/card-loader/user-product-card-loader/user-product-card-loader.module";
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AccountComponent,
    OrdersComponent,
    AccountSidebarComponent,
    UserAccountComponent,



    FaqsComponent,

    ImageCropComponent,
    GalleryComponent,
    AppointmentHistoryComponent,

  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
  
    MatSlideToggleModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    MatMenuModule,

    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatSelectModule,
    ImageCropperModule,
    OrderCardModule,

    UserProductCardLoaderModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class AccountModule { }
