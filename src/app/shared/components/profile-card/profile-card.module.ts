import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from './profile-card.component';



@NgModule({
    declarations: [
        ProfileCardComponent
    ],
    exports: [
        ProfileCardComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ProfileCardModule { }
