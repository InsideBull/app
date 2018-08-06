import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchCarPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'searchCar',
})
export class SearchCarPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      return it.matricule.toLowerCase().includes(terms) || it.cartype.type.toLowerCase().includes(terms);
    });
  }
}
