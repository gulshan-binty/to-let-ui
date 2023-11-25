import { Component } from '@angular/core';
import { CarouselCntrlService } from 'src/app/services/common/carousel-cntrl.service';

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.scss']
})
export class ViewCardsComponent {


  constructor(private swiperCtrl: CarouselCntrlService) {

  }

  
}
