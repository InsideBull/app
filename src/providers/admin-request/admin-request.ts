import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseProvider } from '../firebase/firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the AdminRequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdminRequestProvider extends FirebaseProvider{

  protected __path = 'admin-request';
  
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }

  save(uid: any, key ?: string){
  	if (key) {
  		return this.push(uid,key);
  	}
  	else{
  		return this.push(uid);
  	}
  }

  customPath(path:string){
    this.setPath(path);
  }

  fetch(key: string){
    return this.getOneById(key);
  }

  fetcAll(){
    return this.getAll();
  }

  deleteAdminRequest(i: string){
    this.delete(i);
  }

}
