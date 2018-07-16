import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../firebase/firebase';
import { Station } from '../../models/station.model';
import { AngularFireStorage } from 'angularfire2/storage';
import { IonicPage, AlertController, LoadingController, ToastController } from 'ionic-angular';


/*
  Generated class for the CooperativeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StationProvider extends FirebaseProvider  {

  protected __path = 'station';
  
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }

  save(station: Station, key ?: string){
  	if (key) {
  		return this.push(Station,key);
  	}
  	else{
  		return this.push(Station);
  	}
  }

  fetch(key: string){
  	return this.getOneById(key);
  }

  fetcAll(){
  	return this.getAll();
  }


}
