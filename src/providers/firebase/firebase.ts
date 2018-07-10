
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { storage } from 'firebase';
import 'firebase/storage';
import * as firebase from 'firebase';





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

        let id = 'coop' + Math.floor(Math.random() * 1000000);

        let path = `cooperative/${id}`;

        let ref = firebase.storage().ref(path);

        let task = ref.put(file);

        task.on('state_changed',
          (snapshot) => {
            const snap = snapshot as firebase.storage.UploadTaskSnapshot;
            let percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            console.log('Upload is ' + percentage + '% done');
          },
          (error) => {
            console.log(error);
          },
          () => {
            ref.getDownloadURL().then((url)=>{
              resolve(url);
            })
          }
          )

      })
    }

  }
