import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../firebase/firebase';
import { Planning } from '../../models/planning.model';
import { AngularFireStorage } from 'angularfire2/storage';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the PlanningProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlanningProvider extends FirebaseProvider {

  protected __path = 'planning';
  
  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }
  
  save(planning: Planning, key ?: string){

  	if (key) {
  		return this.push(planning,key);
  	}
  	else{
  		return this.push(planning);
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
  deletePlanning(i: string){
    this.delete(i);
  }

}
