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
import { FavoriteCardModule } from 'src/app/shared/components/favorite-card/favorite-card.module';
import { MedicineListCardModule } from 'src/app/shared/components/medicine-list-card/medicine-list-card.module';
import { OrderCardModule } from 'src/app/shared/components/order-card/order-card.module';
import { PaymentCardModule } from 'src/app/shared/components/payment-card/payment-card.module';
import { ProcessingCardModule } from 'src/app/shared/components/processing-card/processing-card.module';
import { ProductDeliveryCardModule } from 'src/app/shared/components/product-delivery-card/product-delivery-card.module';
import { SpecialCardModule } from 'src/app/shared/components/special-card/special-card.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';
import { AccountComponent } from './account.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersComponent } from './orders/orders.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { ReferAndEarnComponent } from './refer-and-earn/refer-and-earn.component';
import { RequestMedicineComponent } from './request-medicine/request-medicine.component';
import { SpecialsOffersComponent } from './specials-offers/specials-offers.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { MyBioDataComponent } from './my-bio-data/my-bio-data.component';
import { ProductCardOneModule } from 'src/app/shared/components/product-card-one/product-card-one.module';


@NgModule({
  declarations: [
    AccountComponent,
    OrdersComponent,
    AccountSidebarComponent,
    PrescriptionsComponent,
    UserAccountComponent,
    OrderListComponent,
    FavoriteComponent,
    RequestMedicineComponent,
    ReferAndEarnComponent,
    FaqsComponent,
    SpecialsOffersComponent,
    ManageAddressComponent,
    ImageCropComponent,
    GalleryComponent,
    MyBioDataComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ProductDeliveryCardModule,
    PaymentCardModule,
    ProcessingCardModule,
    MedicineListCardModule,
    SpecialCardModule,
    MatSlideToggleModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    MatMenuModule,
    FavoriteCardModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatSelectModule,
    ImageCropperModule,
    OrderCardModule,
    ProductCardOneModule
  ]
})
export class AccountModule { }
