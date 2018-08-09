import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../firebase/firebase';
import { Traject } from '../../models/traject.model';

/*
  Generated class for the PathVoyageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TrajetProvider extends FirebaseProvider{

  protected __path = 'trajet';
  
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }

  save(pathVoyage: Traject, key ?: string){
  	if (key) {
  		return this.push(pathVoyage,key);
  	}
  	else{
  		return this.push(pathVoyage);
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

  deleteTrajet(i: string){
    this.delete(i);
  }

}
