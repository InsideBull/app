import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeDetailsPage } from '../../pages/cooperative-details/cooperative-details';
import { FacebookProvider } from '../../providers/facebook/facebook';

/**
 * Generated class for the CooperativeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-cooperative-list',
   templateUrl: 'cooperative-list.html',
 })
 export class CooperativeListPage {

   cooperatives : any;
   user: any;
   coop: any;

   constructor(public navCtrl: NavController, 
     public navParams: NavParams,
     public cooperativeProvider: CooperativeProvider,
     public facebookProvider: FacebookProvider) {
   }



   ionViewDidLoad() {

     this.cooperatives = [];

     this.facebookProvider.getUser().then((user)=>{
       this.user = user;
     });

     this.cooperativeProvider.fetcAll().subscribe(
       (cooperatives) => {

         for(let key in cooperatives){

           cooperatives[key].key = key;
           
           let cooperative = cooperatives[key];

           let admins = [];

           if (cooperative.admins) {
             admins = JSON.parse(cooperative.admins);

             let in_admins = admins.find( me => me == '2186409438249498' );


             if (in_admins) {              
               this.cooperatives.push(cooperatives[key]);
             } 
           }

         }


       });
     
   }

   onClickItem(i: any) {
     this.navCtrl.push(CooperativeDetailsPage, {'key': i});
   }

   onClickIcon(i: string){
    this.cooperatives.splice(i, 1);
    this.cooperativeProvider.deleteCooperative(i);
    this.navCtrl.push(CooperativeListPage);

 }

 }
