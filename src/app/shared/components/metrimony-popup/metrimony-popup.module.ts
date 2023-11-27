import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetrimonyPopupComponent } from './metrimony-popup.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { RouterLink } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../../material/material.module";
import { SharedModule } from '../../shared.module';



@NgModule({
    declarations: [
        MetrimonyPopupComponent
    ],
    exports: [
        MetrimonyPopupComponent
    ],
    imports: [
        CommonModule,
        MatCheckboxModule,
        RouterLink,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ]
})
export class MetrimonyPopupModule { }
