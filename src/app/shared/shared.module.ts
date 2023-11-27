import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OutSideClickDirective } from './directives/out-side-click.directive';
import { ConfirmDialogComponent } from './ui/confirm-dialog/confirm-dialog.component';
import {ImageLoadErrorDirective} from "./directives/image-load-error.directive";
import { CongratulationDialogComponent } from './ui/congratulation-dialog/congratulation-dialog.component';
import { FailDialogComponent } from './ui/fail-dialog/fail-dialog.component';
import {RouterLink} from "@angular/router";
import {SocialShareComponent} from "./ui/social-share/social-share.component";

@NgModule({
  declarations: [
    OutSideClickDirective,
    ConfirmDialogComponent,
    ImageLoadErrorDirective,
    ImageLoadErrorDirective,
    CongratulationDialogComponent,
    FailDialogComponent,
    SocialShareComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        RouterLink,
    ],
  exports: [
    OutSideClickDirective,
    ConfirmDialogComponent,
    ImageLoadErrorDirective,
    ImageLoadErrorDirective
  ],
  providers: []
})
export class SharedModule {
}
