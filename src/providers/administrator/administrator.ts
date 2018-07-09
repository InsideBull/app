import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../firebase/firebase';
import { Administrator } from '../../models/administrator.model';


/*
  Generated class for the AdministratorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdministratorProvider extends FirebaseProvider {

  constructor(public firebase: AngularFireDatabase) {
    super(firebase);
  }

  save(admin: Administrator, key ?: string){
  	if (key) {
  		return this.push(admin,key);
  	}
  	else{
  		return this.push(admin);
  	}
  }

}
