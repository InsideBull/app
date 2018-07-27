import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VoyageProvider } from '../../providers/voyage/voyage';
import { StationProvider } from '../../providers/station/station';
import { Station } from '../../models/station.model';
import { VoyageManagePage } from '../../pages/voyage-manage/voyage-manage';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';
import { Voyage } from '../../models/voyage.model';
import { VoyageParametersPage } from '../voyage-parameters/voyage-parameters'
import { VoyageListPage } from '../voyage-list/voyage-list';
import { NotificationProvider } from '../../providers/notification/notification';
import { MapPage } from '../map/map';
import { Coordinate } from '../../classes/coordinate.class';


/**
 * Generated class for the VoyageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-voyage-detail',
   templateUrl: 'voyage-detail.html',
 }) 
 export class VoyageDetailPage {

   param: string;
   voyage: Voyage = new Voyage();
   startstation: Station = new Station();
   arrivalstation: Station = new Station();
   cooperative: Cooperative = new Cooperative();
   coop: any;

   origin: Coordinate;
   destination: Coordinate;

   constructor(public navCtrl: NavController, 
     public navParams: NavParams,
     public stationProvider: StationProvider,
     public voyageProvider: VoyageProvider,
     public cooperativeProvider: CooperativeProvider,
     public notif: NotificationProvider) {
   }

   ionViewWillEnter() {

     this.param = this.navParams.get('key');
     this.coop = this.navParams.get('coop');

     this.showDetails();

   }


   showDetails(){

     this.voyageProvider.fetch(this.param).then((voyage: Voyage)=>{
       this.voyage = voyage;

       let startstation = this.voyage.startstation;

       let arrivalstation = this.voyage.arrivalstation;

       let cooperative$ = this.voyage.cooperative;

       this.stationProvider.fetch(startstation).then((start: Station)=>{
         this.startstation = start;

         this.origin = new Coordinate({
           lat : this.startstation.latitude,
           lng: this.startstation.longitude
         });

       })
       .then(()=>{
         this.stationProvider.fetch(arrivalstation).then((arrival: Station)=>{
           this.arrivalstation = arrival;

           this.destination = new Coordinate({
             lat : this.arrivalstation.latitude,
             lng: this.arrivalstation.longitude
           });

         })
       })
       .then(()=>{
         this.cooperativeProvider.fetch(cooperative$).then((cooperative: Cooperative)=>{
           this.cooperative = cooperative;
         })
       })

     })
   }


   goToParameters(){
     this.navCtrl.push(VoyageParametersPage, {key: this.param, coop: this.coop});
   }

   delete(){
     let message : 'Voulez vous supprimer ce voyage ?'; 
     let title = 'Suppression';

     this.notif.presentConfirm(message, title).then((confirm)=>{
       this.voyageProvider.deleteVoyage(this.param);
       this.navCtrl.push(VoyageListPage, {key: this.coop});
     },()=>{});
   }

   showCarte(){
     this.navCtrl.push(MapPage, {origin: this.origin, destination: this.destination});
   }

 }
