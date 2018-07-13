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
         this.cooperatives = cooperatives;
       });
     
   }

   onClickItem(i: any) {
     this.navCtrl.push(CooperativeDetailsPage, {'key': i});
   }

   myCooperatives(cooperatives){

     let myCoops = [];
     
     for(let key in cooperatives){
       let cooperative = cooperatives[key];

       let admins = [];

       admins = JSON.parse(cooperative.admins);

       let inAdmin = admins.find(me => me == this.user.id);

       if (inAdmin) {
         myCoops.push(cooperative);
       }

     }

     return myCoops;
   }

 }
