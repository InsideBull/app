import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../firebase/firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { Trip } from '../../models/trip.model';
import { IonicPage, AlertController, LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the TripProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TripProvider extends FirebaseProvider {

  protected __path = 'trip';
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }

  save(trip: Trip, key ?: string){
  	if (key) {
  		return this.push(trip,key);
  	}
  	else{
  		return this.push(trip);
  	}
  }

  customPath(path:string){
    this.setPath(path)
  }

  fetch(key: string){
    return this.getOneById(key);
  }

  fetcAll(){
    return this.getAll();
  }


}
