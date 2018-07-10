import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { LoginPage } from '../login/login';
import { CooperativeCreatePage } from '../cooperative-create/cooperative-create';
import { CooperativeListPage } from '../cooperative-list/cooperative-list';

/**
 * Generated class for the ConnectedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-connected',
   templateUrl: 'connected.html',
 })
 export class ConnectedPage {

   user:any;
   constructor(private facebookProvider: FacebookProvider, public navCtrl: NavController, public navParams: NavParams) {
   }

   ionViewDidLoad() {
     this.facebookProvider.getUser().then((user)=>{
       this.user = user;
     })
   }

   logout(){
     this.facebookProvider.logout();
   }

   addCooperative(){
     this.navCtrl.push(CooperativeCreatePage);
   }

   cooperatives(){
     this.navCtrl.push(CooperativeListPage);
   }

 }
