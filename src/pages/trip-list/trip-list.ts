import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { TripProvider } from '../../providers/trip/trip';
import { NotificationProvider } from '../../providers/notification/notification';

/**
 * Generated class for the TripListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-trip-list',
   templateUrl: 'trip-list.html',
 })
 export class TripListPage {

   key: any;
   trips: any;
   private loading: Loading;
   empty: boolean = false;

   constructor(private tripProvider: TripProvider, 
     public navCtrl: NavController, 
     public navParams: NavParams,
     private loadingCtrl: LoadingController,
     public notif: NotificationProvider) {

     this.key = this.navParams.get('key');
   }

   ionViewWillEnter (){
     this.tripList();
   }

   tripList(){
     this.loading = this.loadingCtrl.create();
     this.loading.present();

     this.trips = [];

     let path = `trip/${this.key}`;
     this.tripProvider.customPath(path);

     this.tripProvider.fetcAll().subscribe((trips)=>{
       if (trips) {
         for(let key in trips){
         trips[key].key = key;
         this.trips.push(trips[key]);
       }
       }
       else{
         this.empty = true;
       }
       this.loading.dismiss();
     });
   }

   delete(key: string){
     let message = "Voulez-vous supprimer cette voiture de ce voyage";
     let title = "Suppression";
     this.notif.presentConfirm(message, title).then((confirm)=>{
       this.tripProvider.deleteTrip(key);
       this.navCtrl.push(TripListPage, {key: this.key});
     },()=>{});
   }

 }
