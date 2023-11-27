import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalPageViewComponent } from './additional-page-view.component';
import {RouterModule, Routes} from '@angular/router';
import {PipesModule} from '../../shared/pipes/pipes.module';
import {SafeHtmlCustomPipe} from "../../shared/pipes/safe-html.pipe";

const routes: Routes = [
  {path: '', redirectTo: 'pages/about-us', pathMatch: "full"},
  {path: ':pageSlug', component: AdditionalPageViewComponent}
];

@NgModule({
  declarations: [AdditionalPageViewComponent, SafeHtmlCustomPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PipesModule
  ]
})
export class AdditionalPageViewModule { }
