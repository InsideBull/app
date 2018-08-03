import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { FirebaseProvider } from '../firebase/firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { PriceTrajet } from '../../models/price-trajet';

/*
  Generated class for the PriceTrajetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PriceTrajetProvider extends FirebaseProvider{

  protected __path = 'price-trajet';
  
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }

  save(price: PriceTrajet, key ?: string){
  	if (key) {
  		return this.push(price,key);
  	}
  	else{
  		return this.push(price);
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

  deletePriceTrajet(i: string){
    this.delete(i);
  }

}
