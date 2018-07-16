import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../firebase/firebase';
import { Voyage } from '../../models/voyage.model';
import { AngularFireStorage } from 'angularfire2/storage';
import { IonicPage, AlertController, LoadingController, ToastController } from 'ionic-angular';


/*
  Generated class for the CooperativeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VoyageProvider extends FirebaseProvider  {

  protected __path = 'voyage';
  
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }

  save(voyage: Voyage, key ?: string){
  	if (key) {
  		return this.push(voyage,key);
  	}
  	else{
  		return this.push(voyage);
  	}
  }

  fetch(key: string){
  	return this.getOneById(key);
  }

  fetcAll(){
  	return this.getAll();
  }


}
