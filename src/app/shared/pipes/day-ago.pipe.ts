import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {UtilsService} from '../../services/core/utils.service';


@Pipe({
  name: 'dayAgo'
})
export class DayAgoPipe implements PipeTransform {

  constructor(protected utilsService: UtilsService) {
  }

  public transform(value: any): string {
    return this.utilsService.getDateToDayAgo(value);
  }


}
