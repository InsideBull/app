
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { storage } from 'firebase';
import 'firebase/storage';
import * as firebase from 'firebase';
import { IonicPage, LoadingController, Loading } from 'ionic-angular';





/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export abstract class FirebaseProvider {

    //entity path in firebase database
    protected __path: string;
    public loading: Loading;
    constructor(public storage: AngularFireStorage, public firebase: AngularFireDatabase, public loadingCtrl : LoadingController) {

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
        this.loading = this.loadingCtrl.create({
          content: '0 %'
        });
        this.loading.present();

        let id = '' + Math.floor(Math.random() * 1000000);

        let _path = this.getPath();

        let path = `${_path}/${id}`;

        let ref = firebase.storage().ref(path);

        //let task = ref.put(file);

        let task = ref.putString(file, 'base64', {contentType: 'image/png'})


        task.on('state_changed',
          (snapshot) => {
            const snap = snapshot as firebase.storage.UploadTaskSnapshot;
            let percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);

            this.loading.data.content = percentage + ' %';
          },
          (error) => {
            alert (JSON.stringify(error));
          },
          () => {
            ref.getDownloadURL().then((url)=>{
              this.loading.dismiss()
              resolve(url);
            })
          }
          )

      })
    }

    setPath(customPath: string){
      this.__path = customPath;
    }

    getPath(){
      return this.__path;
    }

    delete(i:string){
      this.firebase.list(this.__path).remove(i);
    }

    deleteFile(url: string){
      let storageRef = firebase.storage().refFromURL(url);
      storageRef.delete();
    }

    /*uploadImage(image: any){
      return new Promise((resolve)=>{
        let id = Math.floor(Math.random() * 1000000) + '';
        let ref = firebase.storage().ref(this.getPath() + '/');
        ref.child(id)
        .putString(image, 'base64', {contentType: 'image/png'})
        .then((picture)=>{
          resolve(picture.downloadURL);
        })
      })
    }*/

  }
