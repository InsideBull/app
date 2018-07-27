import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Coordinate } from '../../classes/coordinate.class';
import { NotificationProvider } from '../../providers/notification/notification';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-map',
   templateUrl: 'map.html',
 })
 export class MapPage {

   position: Coordinate;
   origin: Coordinate;
   destination: Coordinate;


   constructor(public navCtrl: NavController, public navParams: NavParams) {

     if(this.navParams.get('position')){
       this.position = this.navParams.get('position');
     }

     if(this.navParams.get('origin')){
       this.origin = this.navParams.get('origin');
       this.destination = this.navParams.get('destination');
     }

   }

   ionViewWillEnter() {

   }

 }
