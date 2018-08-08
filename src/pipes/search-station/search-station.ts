import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchStationPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'searchStation',
})
export class SearchStationPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      return it.name.toLowerCase().includes(terms) || it.location.toLowerCase().includes(terms) || it.city.toLowerCase().includes(terms);
    });
  }
}
