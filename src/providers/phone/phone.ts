import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PhoneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhoneProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PhoneProvider Provider');
  }


  sendSMS(number: number, message: string){

  }

  call(number:number){

  }

}
