
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class FirebaseProvider {

    constructor( private firebase: AngularFireDatabase) {

    }

    getOneById( path: string, id : string){
      return new Promise ((resolve)=>{
        this.firebase.object(`${path}/${id}`).valueChanges().subscribe((object)=>{
          resolve(object);
        });
      });

    }

    getAll(path: string){
      return this.firebase.object(path).valueChanges();
    }

    push( path: string, object: any, key ?: string){
      if(key){
        return this.firebase.list(path).update(key,object);
      }
      else{
        return this.firebase.list(path).push(object).key;
      }
    }

  }
