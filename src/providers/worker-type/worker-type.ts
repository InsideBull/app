import { FirebaseProvider } from '../firebase/firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';
export class WorkerTypeProvider extends FirebaseProvider{
    protected __path = 'workerType';

    constructor(public storage: AngularFireStorage, 
        public firebase: AngularFireDatabase, 
        public loadingCtrl : LoadingController) {
        super(storage,firebase,loadingCtrl);
      }

    save(workerType: any, key ?: string){
        if (key) {
            return this.push(workerType,key);
        }
        else{
            return this.push(workerType);
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
  
    deleteWorkerType(i: string){
      this.delete(i);
    }
}