
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

        let path = `test/cooperative/${file.name}`;

        let ref = firebase.storage().ref(path);

        let task = ref.put(file);

        task.on('state_changed',
          () => {
            ref.getDownloadURL().then((url)=>{
              resolve(url);
            })
          }
          )

      })
    }

  }
