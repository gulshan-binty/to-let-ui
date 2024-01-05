import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';


// import { FrequintlyAskedQuestionModule } from 'src/app/shared/components/frequintly-asked-question/frequintly-asked-question.module';
// import { JobCardModule } from 'src/app/shared/components/job-card/job-card.module';
// import { JobRelatedDataModule } from 'src/app/shared/components/job-related-data/job-related-data.module';

// import { ProductCardOneModule } from 'src/app/shared/components/product-card-one/product-card-one.module';
// import { ProductsRelatedDataModule } from 'src/app/shared/components/products-related-data/products-related-data.module';
import { ToLetCardModule } from 'src/app/shared/components/to-let-card/to-let-card.module';



import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListToLetComponent } from './product-list-to-let/product-list-to-let.component';
import { ProductListComponent } from './product-list.component';




@NgModule({
  declarations: [
    ProductListComponent,
 
    ProductListToLetComponent
  ],
    imports: [
        CommonModule,
        ProductListRoutingModule,
        MaterialModule,
        MatSliderModule,
    
    

        // FrequintlyAskedQuestionModule,
        RouterModule,
        // JobCardModule,
        ToLetCardModule,
        // ProductCardOneModule,
        // ProductsRelatedDataModule,
 
        // JobRelatedDataModule,
  
     
    ]
})
export class ProductListModule { }
