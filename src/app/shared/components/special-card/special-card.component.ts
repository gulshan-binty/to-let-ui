import { Component, Input, OnInit } from '@angular/core';
import {SpecialsOffer} from "../../../interfaces/common/specials-offer";

@Component({
  selector: 'app-special-card',
  templateUrl: './special-card.component.html',
  styleUrls: ['./special-card.component.scss']
})
export class SpecialCardComponent implements OnInit {

  @Input() specialOffer: SpecialsOffer;

  constructor() {

  }

  ngOnInit(): void {

  }

}
