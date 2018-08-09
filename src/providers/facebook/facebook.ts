import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { App, LoadingController, Loading } from 'ionic-angular';
import { User } from '../../models/user.model';

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
    constructor( private app: App, private facebook: Facebook, public loadingCtrl: LoadingController) {
      this.logged = false;
      this.connected = false;
    }

    login(redirection ?: any){
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.facebook.login(['email', 'public_profile']).then(()=>{
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
        /*        this.app.getActiveNav().setRoot(this.redirection);*/
      })
    }

    getUser(fields ?: any){
      return new Promise((resolve)=>{
        this.facebook.api('me?fields=id,email,name,picture.width(720).height(720).as(picture_large)', []).then((profile)=>{
                
          let _user = {
            id: profile['id'],
            email: profile['email'],
            name: profile['name'],
            picture: profile['picture_large']['data']['url']
          };

          let user: User;

          if (!fields) {
            user = new User(_user);
          }
          else { this._check(_user, fields); }

            resolve(user);

        });
      });
    }

    protected _check(_user: any, fields){
      let user = {};
      
      if(typeof fields === 'string'){
        user[fields] = _user[fields];
      }
      else{
        for(let key in fields){
          user[key] = _user[key];
        }
      }
      
      return user;
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
        this.loading = this.loadingCtrl.create();
        this.loading.present(); 
        this.facebook.api('me/friends?fields=id,email,name,picture.width(720).height(720).as(picture_large)',['user_friends'])
        .then((friends)=>{
          let _friends = this.prepareFriendsProfile(friends.data);
          this.loading.dismiss();
          resolve(_friends);

        });

      });
    }

    protected prepareFriendsProfile(friends){

      let _friends  = [];

      for(let key in friends){

        let friend = {};
        friend['id'] = friends[key]['id'];       
        friend['name'] = friends[key]['name'];
        if (friends[key]['email']) {
          friend['email'] = friends[key]['email'];
        }

        if (friends[key]['picture_large']['data']['url']) {
          friend['picture'] = friends[key]['picture_large']['data']['url'];
        }

        _friends.push(friend);

      }

      return _friends;

    }


  }
