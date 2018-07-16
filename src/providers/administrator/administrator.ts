import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../firebase/firebase';
import { Administrator } from '../../models/administrator.model';
import { AngularFireStorage } from 'angularfire2/storage';
import { IonicPage, AlertController, LoadingController, ToastController } from 'ionic-angular';


/*
  Generated class for the AdministratorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdministratorProvider extends FirebaseProvider {

  protected __path = 'administrator';
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }

  save(admin: Administrator, key ?: string){
  	if (key) {
  		return this.push(admin,key);
  	}
  	else{
  		return this.push(admin);
  	}
  }

  fetch(key: string){
    return this.getOneById(key);
  }

}
