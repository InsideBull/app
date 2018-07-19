import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Voyage } from '../../models/voyage.model';
import { VoyageProvider } from '../../providers/voyage/voyage';
import { CarProvider } from '../../providers/car/car';
import { TripProvider } from '../../providers/trip/trip';
import { Trip } from '../../models/trip.model'
import { NotificationProvider } from '../../providers/notification/notification';

/**
 * Generated class for the TripAffectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-trip-affect',
 	templateUrl: 'trip-affect.html',
 })
 export class TripAffectPage {

 	key: any;
 	voyage: Voyage = new Voyage();
 	cars = [];
 	selectedCar = [];
 	constructor(private tripProvider: TripProvider, private carProvider: CarProvider, private voyageProvider: VoyageProvider, public navCtrl: NavController, public navParams: NavParams, public notif: NotificationProvider) {
 	}

 	ionViewDidLoad() {
 		this.key = this.navParams.get('key');

 		this.voyageProvider.fetch(this.key).then((voyage: Voyage)=>{
 			this.voyage = voyage;

 			let cooperative$ = this.voyage.cooperative;

 			let path = `cooperative/${cooperative$}/car`;

 			this.carProvider.customPath(path);

 			this.carProvider.fetcAll().subscribe((cars)=>{

 				console.log(path, cars);


 				for(let key in cars){
 					this.cars.push(cars[key]);
 				}
 			})
 		})


 	}

 	save(){
		 let message = "Voulez vous affecter cette voiture à ce voyage";
		 let title = "Affection de voiture";

		 this.notif.presentConfirm(message, title).then((confirm)=>{
			let path = `trip/${this.key}/`;
			this.tripProvider.customPath(path);

			for(let key in this.selectedCar){
 				this.tripProvider.save(new Trip({car:this.selectedCar[key], voyage:this.key}));
 			}
		 },()=>{});
 	}

 }
