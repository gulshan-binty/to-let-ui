import { Component } from '@angular/core';
import { SPECIAL_OFFERS } from 'src/app/core/db/specials-offers.db';
import { SpecialsOffer } from 'src/app/interfaces/common/specials-offer';

@Component({
  selector: 'app-specials-offers',
  templateUrl: './specials-offers.component.html',
  styleUrls: ['./specials-offers.component.scss']
})
export class SpecialsOffersComponent {

  specialOffers: SpecialsOffer[] = SPECIAL_OFFERS;

}
