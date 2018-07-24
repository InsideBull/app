import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../firebase/firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { Car } from '../../models/car.model';
import { IonicPage, AlertController, LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the CarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarProvider extends FirebaseProvider {

  protected __path = 'car';
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }

  save(car: Car, key ?: string){
  	if (key) {
  		return this.push(car,key);
  	}
  	else{
  		return this.push(car);
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

  uploadImage(image){
    return this.upload(image);
  }

  deleteCar(i: string){
    this.delete(i);
  }
  deleteImg(url: string){
    this.deleteFile(url);
  }

}
