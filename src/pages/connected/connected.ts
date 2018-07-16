import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { LoginPage } from '../login/login';
import { CooperativeCreatePage } from '../cooperative-create/cooperative-create';
import { CooperativeListPage } from '../cooperative-list/cooperative-list';
import { AdministratorProvider } from '../../providers/administrator/administrator';

import { ValidationPage } from '../validation/validation';
import { StationMenuPage } from '../station-menu/station-menu'



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

   is_admin: boolean;

   pending: boolean;

   user: any;

   constructor(private adminProvider: AdministratorProvider, private facebookProvider: FacebookProvider, public navCtrl: NavController, public navParams: NavParams) {
     this.is_admin = false;
     
     this.pending = false;

     this.isAdmin();
   }


   isAdmin(){
     this.facebookProvider.getUser().then((user)=>{

       this.user = user;

       this.adminProvider.fetch(user['id']).then((admin)=>{

         if(admin){
           this.is_admin = true; 
         }
         else{
           this.pending = true;
         }

       });

     });
   }

   ionViewDidLoad() {

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

   qrcodeRequest(){
     this.navCtrl.push(ValidationPage);
   }

   goToStation(){
     this.navCtrl.push(StationMenuPage);
   }

 }
