import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FrequintlyAskedQuestionComponent } from './frequintly-asked-question.component';
import { FrequentlyQaCardComponent } from './frequently-qa-card/frequently-qa-card.component';



@NgModule({
  declarations: [
    FrequintlyAskedQuestionComponent,
    FrequentlyQaCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FrequintlyAskedQuestionComponent
  ]
})
export class FrequintlyAskedQuestionModule { }
