import { FirebaseProvider } from '../firebase/firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class WorkerTypeProvider extends FirebaseProvider{
    protected __path = 'workertype';

    constructor(public storage: AngularFireStorage, 
        public firebase: AngularFireDatabase, 
        public loadingCtrl : LoadingController) {
        super(storage,firebase,loadingCtrl);
      }

    save(workerType: string, key ?: string){
        if (key) {
            return this.push(workerType,key);
        }
        else{
            return this.push(workerType);
        }
    }

  
    fetch(key: string){
      return this.getOneById(key);
    }
  
    fetcAll(){
      return this.getAll();
    }
  
    deleteWorkerType(i: string){
      this.delete(i);
    }
}