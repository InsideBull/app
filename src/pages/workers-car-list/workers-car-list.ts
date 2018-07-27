import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import { Car } from '../../models/car.model';
import { WorkerProvider } from '../../providers/worker/worker';
import { WorkerTypeProvider } from '../../providers/worker-type/worker-type';
import { CarDetailsPage } from '../car-details/car-details'
import { NotificationProvider } from '../../providers/notification/notification';


/**
 * Generated class for the WorkersCarListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-workers-car-list',
 	templateUrl: 'workers-car-list.html',
 })
 export class WorkersCarListPage {

 	key: any;
 	coop: any;
 	car: Car = new Car();
 	workers: any;
 	constructor(private workerTypeProvider: WorkerTypeProvider, private workerProvider: WorkerProvider, private carProvider: CarProvider, public navCtrl: NavController, public navParams: NavParams, public notif: NotificationProvider) {
 	}

 	ionViewDidLoad() {

 		this.workers = [];

 		this.key = this.navParams.get('key');
 		this.coop = this.navParams.get('coop');

 		let path = `cooperative/${this.coop}/car`;

 		this.carProvider.customPath(path);

 		this.carProvider.fetch(this.key).then((car:Car)=>{
 			this.car = car;

 			if(this.car.workers){
 				let workers = JSON.parse(this.car.workers);

 				let wpath = `cooperative/${this.coop}/worker`;

 				this.workerProvider.customPath(wpath);

 				for(let w in workers){


 					this.workerProvider.fetch(workers[w]).then((worker)=>{

 						if (worker) {

 							if (!worker['image']) {
 								worker['image'] = "assets/icon/man.png";
 							}

 							this.workerTypeProvider.fetch(worker['type']).then((type)=>{
 								worker['typeO'] = type;
 								this.workers.push(worker);
 							})
 						}

 					})

 				}
 			}

 		})

	 }
	 
	 delete(i: any){
		 let message = "Voulez vous enlever cette personne de cette voiture";
		 let title = "Suppression";
		this.notif.presentConfirm(message, title).then((confirm)=>{
			let workers = [];
			workers = JSON.parse(this.car.workers);
			workers.splice(workers.indexOf(i), 1);
		   this.car.workers = JSON.stringify(workers);
		   this.carProvider.save(this.car, this.car.matricule);
		},()=>{});
	 }

 	showDetails(){
 		this.navCtrl.push(CarDetailsPage, {key: this.key, coop: this.coop})
 	}

 }
