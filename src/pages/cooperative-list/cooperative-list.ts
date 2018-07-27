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
   loading: Loading;
   uid: any;
   constructor(
     public navCtrl: NavController, 
     public navParams: NavParams,
     public cooperativeProvider: CooperativeProvider,
     public facebookProvider: FacebookProvider,
     private loadingCtrl: LoadingController
     ){




   }

   
   ionViewWillEnter() {

     this.showLoading();

     this.uid = this.navParams.get('uid');
     this.cooperatives = [];
     this.cooperativeProvider.fetcAll().subscribe((cooperatives) => {

         for(let key in cooperatives){

           cooperatives[key].key = key;           

           if (cooperatives[key].admins) {

             let admins = [];
             admins = JSON.parse(cooperatives[key].admins);

             let in_admins = admins.find( me => me == "2186409438249498" );

             if (in_admins) {  
               if (!cooperatives[key].logo) {
                 cooperatives[key].logo = "assets/icon/copyright.png"
               } 

               this.cooperatives.push(cooperatives[key]);
             } 

           }
           
         }

         this.dismissLoading();
         

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

   showLoading() {
     if(!this.loading){
       this.loading = this.loadingCtrl.create({
         content: 'Please Wait...',
         dismissOnPageChange: false,
         enableBackdropDismiss: true
       });
       this.loading.present();
     }
   }

   dismissLoading(){
     if(this.loading){
       this.loading.dismiss();
       this.loading = null;
     }
   }

 }
