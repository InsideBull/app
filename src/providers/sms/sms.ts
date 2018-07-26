import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';

/*
  Generated class for the SmsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SmsProvider {

  SMS: any;
  phoneNumber: number; 
  message: String;

  constructor(public http: HttpClient, public platform: Platform) {
  }

  sendSMS()
  {

    this.platform.ready().then((readySource) => {

    if(this.SMS) this.SMS.sendSMS(this.phoneNumber,this.message,()=>{
    console.log("Sent");
    }, Error=>{
        console.log("Not sent");
      });
    });
     
  }

}
