import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarProvider } from '../../providers/car/car';
import { Car } from '../../models/car.model';
import { WorkerProvider } from '../../providers/worker/worker';
import { WorkerTypeProvider } from '../../providers/worker-type/worker-type'

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
 	constructor(private workerTypeProvider: WorkerTypeProvider, private workerProvider: WorkerProvider, private carProvider: CarProvider, public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {

 		this.workers = [];

 		this.key = this.navParams.get('key');
 		this.coop = this.navParams.get('coop');

 		let path = `cooperative/${this.coop}/car`;

 		this.carProvider.customPath(path);

 		this.carProvider.fetch(this.key).then((car:Car)=>{
 			this.car = car;

 			let workers = JSON.parse(this.car.workers);

 			console.log(workers);

 			let wpath = `cooperative/${this.coop}/worker`;

 			this.workerProvider.customPath(wpath);

 			for(let w in workers){


 				this.workerProvider.fetch(workers[w]).then((worker)=>{

 					if (worker) {

 						if (!worker['image']) {
 							worker['image'] = "assets/icon/man.png";
 						}

 						this.workerTypeProvider.fetch(worker['type']).then((type)=>{
 							worker['type'] = type;
 							this.workers.push(worker);
 						})
 					}

 				})

 			}

 		})

 	}

 }
