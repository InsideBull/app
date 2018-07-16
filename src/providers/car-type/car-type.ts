import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../firebase/firebase';
import { AngularFireStorage } from 'angularfire2/storage';

/*
  Generated class for the CarTypeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class CarTypeProvider extends FirebaseProvider {

  	protected __path = 'cartype';
    constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase) {
  		super(storage,firebase);
  	}

  	fetch(key: string){
  		return this.getOneById(key);
  	}

  	fetcAll(){
  		return this.getAll();
  	}

  }
