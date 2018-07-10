
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export abstract class FirebaseProvider {

    //entity path in firebase database
    protected __path: string;
    constructor(public storage: AngularFireStorage,  public firebase: AngularFireDatabase) {

    }

    getOneById(id : string){
      return new Promise ((resolve)=>{
        this.firebase.object(`${this.__path}/${id}`).valueChanges().subscribe((object)=>{
          resolve(object);
        });
      });

    }

    getAll(){
      return this.firebase.object(this.__path).valueChanges();
    }

    push(object: any, key ?: string){
      if(key){
        return this.firebase.list(this.__path).update(key,object);
      }
      else{
        return this.firebase.list(this.__path).push(object).key;
      }
    }

    upload(file){    
      return new Promise((resolve)=>{
        let key = 'coop-taxibr' + Math.floor(Math.random() * 1000000);
        let path = `upload/cooperative/${key}`;
        let ref = this.storage.ref(path);
        let task = this.storage.upload(path, file);

        task.snapshotChanges().pipe(
          finalize(()=>{
            ref.getDownloadURL().map((value:string)=> value).subscribe((url)=>{

              console.log(url)

              resolve(url)
            })
          })
          )
      })
    }

  }
