import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BookingClassTypeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingClassTypeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BookingClassTypeProvider Provider');
  }

}
