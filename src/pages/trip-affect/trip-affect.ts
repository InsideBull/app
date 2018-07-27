import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Voyage } from '../../models/voyage.model';
import { VoyageProvider } from '../../providers/voyage/voyage';
import { CarProvider } from '../../providers/car/car';
import { TripProvider } from '../../providers/trip/trip';
import { Trip } from '../../models/trip.model'
import { NotificationProvider } from '../../providers/notification/notification';
import { TripListPage } from '../trip-list/trip-list';
import { Worker } from '../../models/worker.model';
import { StationProvider } from '../../providers/station/station'
import { Station } from '../../models/station.model';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';
import { Car } from '../../models/car.model';
import { WorkerType } from '../../models/worker-type.model';
import { WorkerTypeProvider } from '../../providers/worker-type/worker-type';
import { PhoneProvider } from '../../providers/phone/phone';
import { WorkerProvider } from '../../providers/worker/worker';

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
 	coop: any;
 	voyage: Voyage = new Voyage();
 	cars = [];
 	selectedCar = [];
 	startstation: Station = new Station();
 	arrivalstation: Station = new Station();
 	cooperative: Cooperative = new Cooperative();
 	constructor(private workerProvider: WorkerProvider, private phoneProvider: PhoneProvider, private workerTypeProvider: WorkerTypeProvider, private cooperativeProvider: CooperativeProvider, private stationProvider: StationProvider, private tripProvider: TripProvider, private carProvider: CarProvider, private voyageProvider: VoyageProvider, public navCtrl: NavController, public navParams: NavParams, public notif: NotificationProvider) {
 	}

 	ionViewWillEnter() {
 		this.cars = [];
 		this.key = this.navParams.get('key');
 		this.coop = this.navParams.get('coop');

 		this.voyageProvider.fetch(this.key).then((voyage: Voyage)=>{
 			this.voyage = voyage;

 			let cooperative$ = this.voyage.cooperative;

 			let path = `cooperative/${cooperative$}/car`;

 			this.carProvider.customPath(path);

 			this.carProvider.fetcAll().subscribe((cars)=>{

 				let path = `trip/${this.key}`;
 				this.tripProvider.customPath(path);

 				this.tripProvider.fetcAll().subscribe((tripCars)=>{

 					if (!tripCars) {
 						for(let key in cars){
 							this.cars.push(cars[key]);
 						}
 					}
 					else{
 						for(let key in cars){

 							let exist = false
 							for(let _key in tripCars){

 								if (cars[key].matricule == tripCars[_key].car) {
 									exist = true;
 									break;
 								}
 							}

 							if (!exist) {
 								this.cars.push(cars[key])
 							}

 						}
 					}

 				})
 				
 			})
 		})


 	}

 	save(){

 		
 		let message = "Voulez vous affecter ces voitures à ce voyage";
 		let title = "Affection de voiture";

 		this.notif.presentConfirm(message, title).then((confirm)=>{
 			let path = `trip/${this.key}/`;
 			this.tripProvider.customPath(path);
 			for(let c in this.selectedCar){
 				let key = this.tripProvider.save(new Trip({car:this.selectedCar[c], voyage:this.key}));

 				if (key) {
 					
 					this.carProvider.fetch(this.selectedCar[c]).then((car:Car)=>{

 						if (car.workers) {
 							let workers = JSON.parse(car.workers);

 							let wpath = `cooperative/${this.coop}/worker`;

 							this.workerProvider.customPath(wpath);

 							for(let w in workers){

 								this.workerProvider.fetch(workers[w]).then((worker: Worker)=>{

 									if (worker.tel) {
 										this.workerTypeProvider.fetch(worker.type).then((type: WorkerType)=>{

 											this.smsNotification(worker,car,type);

 										});
 									}

 								});
 							}
 						}

 						

 					});

 				}

 			}
 			this.navCtrl.push(TripListPage, {key:this.key});

 		},()=>{});
 	}

 	smsNotification(worker: Worker, car: Car, type: WorkerType){

 		this.stationProvider.fetch(this.voyage.startstation).then((startstation: Station)=>{

 			this.startstation = startstation;

 			this.stationProvider.fetch(this.voyage.arrivalstation).then((arrivalstation: Station)=>{
 				
 				this.arrivalstation = arrivalstation;

 				this.cooperativeProvider.fetch(this.voyage.cooperative).then((cooperative: Cooperative)=>{
 					this.cooperative = cooperative;

 					let message = worker.name + '! Vous participer a un voyage dans la coopérative ' + this.cooperative.name + '. ' + this.startstation.location + ', ' + this.startstation.city + ' - ' + this.arrivalstation.location + ', ' + this.arrivalstation.city + ' du ' + this.voyage.date + ' comme etatnt ' + type.occupation + ' de la voiture N° ' + car.matricule + '.';   

 					this.phoneProvider.sendSMS(String(worker.tel),message);

 				})

 			})

 		})
 	}

 }
