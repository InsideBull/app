import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
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
   private loading: Loading;
   constructor(
     public navCtrl: NavController, 
     public navParams: NavParams,
     public cooperativeProvider: CooperativeProvider,
     public facebookProvider: FacebookProvider,
     private loadingCtrl: LoadingController
     ){}



   ionViewDidLoad() {

     

     this.cooperatives = [];

    //  this.facebookProvider.getUser().then((user)=>{
    //    this.user = user;
    //  });

     this.cooperativeProvider.fetcAll().subscribe(
       (cooperatives) => {

         this.loading = this.loadingCtrl.create();
         this.loading.present();

         for(let key in cooperatives){

           cooperatives[key].key = key;           


           if (cooperatives[key].admins) {

             let admins = [];

             admins = JSON.parse(cooperatives[key].admins);

             let in_admins = admins.find( me => me == /*this.user.id*/"2186409438249498" );

             if (in_admins) {  
               if (!cooperatives[key].logo) {
                 cooperatives[key].logo = "assets/icon/copyright.png"
               } 

               this.cooperatives.push(cooperatives[key]);
             } 

           }
           
         }
         
         this.loading.dismiss();

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
