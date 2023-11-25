import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PrescriptionOrder } from 'src/app/interfaces/common/prescription-order';
import { PrescriptionOrderService } from 'src/app/services/common/prescription-order.service';
import { Subscription } from 'rxjs';
import { ReloadService } from 'src/app/services/core/reload.service';
import { FilterData } from 'src/app/interfaces/core/filter-data';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit, OnDestroy {
  @ViewChild('galleryPop', { static: false }) galleryPop!: GalleryComponent;
  
  //Store Data
  prescriptionOrderId: string;
  allPrescriptions: PrescriptionOrder[] = [];


  //Subscriptions
  private subDataOne: Subscription;
  private subReload: Subscription;
  constructor(
    private preService: PrescriptionOrderService,
    private reloadService: ReloadService
  ) { }

  ngOnInit(): void {
    this.subReload = this.reloadService.refreshData$.subscribe(() => {
      this.getAllPrescriptions();
    })
    this.getAllPrescriptions();
  }


  /**
   * HTTP REQUEST HANDLE
   * getAllPrescriptions()
   */

  getAllPrescriptions() {
    const mSelect = {
      images: 1,
      name: 1,
    }
    const filterData: FilterData = {
      select: mSelect,
      pagination: { pageSize: 12, currentPage: 0 },
      sort: { createdAt: -1 },
      filter: null
    }

    this.subDataOne = this.preService.getAllPrescriptionOrdersByUser(filterData).subscribe((res) => {
      if (res.success) {
        this.allPrescriptions = res.data;
      }
    },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  /** 
   * Select Place Order
   */
  onShowDelPlaceOrder(data: string) {
    if (data !== this.prescriptionOrderId) {
      this.prescriptionOrderId = data;
    } else {
      this.prescriptionOrderId = data;
    }
  }

  /**
   * SHOW GALLERY
   */

  onShowPop(index: any) {
    if (index > -1) {
      this.galleryPop.onShowGallery(index);
    }
  }


  /***
   * NG ON DESTROY
   */

  ngOnDestroy(): void {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
  }

}
