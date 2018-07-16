import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../firebase/firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { Car } from '../../models/car.model'

/*
  Generated class for the CarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarProvider extends FirebaseProvider {

  protected __path = 'car';
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase) {
    super(storage,firebase);
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

}
