import { Injectable } from '@angular/core';
import { FirebaseProvider } from '../firebase/firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Worker } from '../../models/worker.model';


/*
  Generated class for the WorkerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WorkerProvider extends FirebaseProvider {

  protected __path = "";

  constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {
    super(storage,firebase,loadingCtrl);
  }

  save(worker: Worker, key ?: string){
  	if (key) {
  		return this.push(worker,key);
  	}
  	else{
  		return this.push(worker);
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
  
  deleteWorker(i: string){
    this.delete(i);
  }

  uploadImage(image){
    return this.upload(image);
  }

  deleteImg(url: string){
    this.deleteFile(url);
  }

}
