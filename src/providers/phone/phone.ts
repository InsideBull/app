import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
/*
  Generated class for the PhoneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class PhoneProvider {

    constructor(private callNumber: CallNumber, private sms: SMS) {
    }

  sendSMS(phoneNumber: string, message: string){
    this.sms.send(phoneNumber, message).then(()=>{
        console.log("Calling...");
    }).catch((err)=>{
        alert(JSON.stringify(err));
    });
  }

  call(phoneNumber: string){
    this.callNumber.callNumber(phoneNumber, true).then(()=>{
        console.log("Sent!");
    }).catch((err)=>{
        alert(JSON.stringify(err));
    });
  }

  }
