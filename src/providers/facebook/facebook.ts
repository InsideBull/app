import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { App, IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the FacebookProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class FacebookProvider {

  	private loading: Loading;
  	user: any;
  	logged: boolean;
    connected: boolean;
    redirection: any = LoginPage;
    constructor( private app: App, private facebook: Facebook, public loadingCtrl: LoadingController) {
      this.logged = false;
      this.connected = false;
    }

    login(redirection ?: any){
      this.loading = this.loadingCtrl.create();
      this.facebook.login(['user_birthday', 'email', 'user_location', 'public_profile']).then(()=>{
        this.logged = true;
        this.loading.dismiss();
        this.app.getActiveNav().setRoot(redirection);
      })
    }

    logout() {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.facebook.logout().then(() => {
        this.loading.dismiss();
        this.app.getActiveNav().setRoot(this.redirection);
      })
    }

    getUser(){
      return new Promise((resolve)=>{
        if (!this.logged) {
          this.app.getActiveNav().setRoot(this.redirection)
        }
        this.facebook.api('me?fields=id,email,name,birthday,picture.width(720).height(720).as(picture_large),location', []).then((profile)=>{
          let user = {
            email: profile['email'],
            name: profile['name'],
            picture: profile['picture_large']['data']['url'],
            birthday: profile['birthday'],
            city: profile['location'].name,
          };

          resolve(user);
        })
      })
    }

    status(){
      return new Promise((resolve)=>{
        this.facebook.getLoginStatus().then((reponse)=>{
          if(reponse.status === 'connected'){
            this.connected = true;
          }
          resolve(this.connected);
        })
      })
    }

    getUserFriends(){
      
      return new Promise((resolve)=>{
        if(!this.logged)  {
          this.app.getActiveNav().setRoot(this.redirection)
        }      
        this.facebook.api('me/friends?fields=id,name,picture.width(720).height(720).as(picture_large)',['user_friends'])
        .then((friends)=>{
          resolve(friends);
        });
      });
    }


  }
