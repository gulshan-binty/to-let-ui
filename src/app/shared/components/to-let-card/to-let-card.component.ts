import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../interfaces/common/product.interface";
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/common/product.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { UiService } from 'src/app/services/core/ui.service';

@Component({
  selector: 'app-to-let-card',
  templateUrl: './to-let-card.component.html',
  styleUrls: ['./to-let-card.component.scss']
})
export class ToLetCardComponent implements OnInit{
  @Input() data?: Product;
  constructor(
    private productService: ProductService,
    private reloadService: ReloadService,
    private dialog: MatDialog,
    private uiServices: UiService
  ) {

  }
  ngOnInit(): void {

  }

  getJobType(type: 'to_let') {
    switch(type) {

      case 'to_let': {
        return 'To Let';
      }

      default: {
        return 'Products';
      }
    }
  }



}
