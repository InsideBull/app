import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../firebase/firebase';
import { Station } from '../../models/station.model';
import { AngularFireStorage } from 'angularfire2/storage';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class StationProvider extends FirebaseProvider  {

  protected __path = 'station';
  
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }

  save(station: Station, key ?: string){
  	if (key) {
  		return this.push(station,key);
  	}
  	else{
  		return this.push(station);
  	}
  }
 
  fetch(key: string){
  	return this.getOneById(key);
  }

  fetcAll(){
  	return this.getAll();
  }
  deleteStation(i: string){
    this.delete(i);
  }


}
