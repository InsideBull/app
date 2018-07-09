import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../firebase/firebase';
import { Cooperative } from '../../models/cooperative.model';


/*
  Generated class for the CooperativeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CooperativeProvider extends FirebaseProvider  {

  protected __path = 'cooperative'
  constructor(public firebase: AngularFireDatabase) {
    super(firebase);
  }

  save(cooperative: Cooperative, key ?: string){
  	if (key) {
  		return this.push(cooperative,key);
  	}
  	else{
  		return this.push(cooperative);
  	}
  }

  fetch(key: string){
  	return this.getOneById(key);
  }

  fetcAll(){
  	return this.getAll();
  }

  uploadImgLogo(file: File) {
    return this.uploadImg(file);
  }


}
