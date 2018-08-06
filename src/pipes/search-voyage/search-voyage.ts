import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchVoyagePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'searchVoyage',
})
export class SearchVoyagePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      return it.startstation.city.toLowerCase().includes(terms) || it.arrivalstation.city.toLowerCase().includes(terms) || it.date.toLowerCase().includes(terms);
    });
  }
}
