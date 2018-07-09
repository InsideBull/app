
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export abstract class FirebaseProvider {

    //entity path in firebase database
    protected __path: string;
    constructor( public firebase: AngularFireDatabase) {

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

    uploadImg(file: File) {
      return new Promise(
        (resolve, reject)=> {
          const almostUniqueName = Date.now().toString();
          const upload = this.firebase.storage().ref()
          .child('/images/cooperative/' + almostUniqueName + file.name)
          .put(file);
          upload.on(this.firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log("Chargement...");
          },
            (error)=>{
            console.log(error);
          },
            ()=>{
              resolve(upload.snapshot.downloadURL);
            }
          );
        }
      );
    }

  }
