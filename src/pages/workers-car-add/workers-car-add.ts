import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Car } from '../../models/car.model';
import { CarProvider } from '../../providers/car/car';
import { WorkerProvider } from '../../providers/worker/worker';
import { WorkerTypeProvider } from '../../providers/worker-type/worker-type'

/**
 * Generated class for the WorkersCarAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

 @IonicPage()
 @Component({
 	selector: 'page-workers-car-add',
 	templateUrl: 'workers-car-add.html',
 })
 export class WorkersCarAddPage {

 	key: any;
 	coop: any;
 	car: Car = new Car();
 	workersList: any;
 	workers = [];
 	constructor(private workerTypeProvider: WorkerTypeProvider, private workerProvider: WorkerProvider, private carProvider: CarProvider, public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {
 		this.key = this.navParams.get('key');
 		this.coop = this.navParams.get('coop');

 		this.workersList = [];

 		let path = `cooperative/${this.coop}/car`;

 		this.carProvider.customPath(path);

 		this.carProvider.fetch(this.key).then((car: Car)=>{
 			this.car = car;

 			let wpath = `cooperative/${this.coop}/worker`;

 			this.workerProvider.customPath(wpath);

 			this.workerProvider.fetcAll().subscribe((workers)=>{

 				let myWorkers = [];

 				if (this.car.workers) {
 					myWorkers = JSON.parse(this.car.workers);
 				}

 				for(let w in workers){

 					workers[w].key = w;

 					let in_workers = myWorkers.find( key => key == workers[w].key );

 					if (!in_workers) {

 						this.workerTypeProvider.fetch(workers[w].type).then((type)=>{
 							workers[w].type = type;
 							this.workersList.push(workers[w]);
 						})

 					}     			
 				}

 			})

 		});

 	}

 	save(){

 		let path = `cooperative/${this.coop}/car`;

 		this.carProvider.customPath(path);

 		let workers = [];

 		if (this.car.workers) {
 			workers = JSON.parse(this.car.workers);
 		}


 		for(let w in this.workers){

 			workers.push(this.workers[w]);
 		}

 		this.car.workers = JSON.stringify(workers);

 		this.carProvider.save(this.car,this.car.matricule);

 	}

 }
