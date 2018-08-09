
import { Injectable } from '@angular/core';
import { FirebaseProvider } from '../firebase/firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { QRCodeValidation } from '../../models/qrcode-validation.model';
import {LoadingController } from 'ionic-angular';

/*
  Generated class for the QrcodeValidationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrcodeValidationProvider extends FirebaseProvider {

  protected __path = 'validation';
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }

  save(qrcv: QRCodeValidation, key ?: string){
  	if (key) {
  		return this.push(qrcv,key);
  	}
  	else{
  		return this.push(qrcv);
  	}
  }

  fetch(key: string){
    return this.getOneById(key);
  }

}
