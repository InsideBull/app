import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { CarTypeProvider } from '../../providers/car-type/car-type';
import { Car } from '../../models/car.model';
import { CarProvider } from '../../providers/car/car';
import { CarDetailsPage } from '../car-details/car-details';
import { CameraProvider } from '../../providers/camera/camera';
import { NotificationProvider } from '../../providers/notification/notification';
import { StatusCars } from '../../models/statusCar.model';
import { ImageWidgetPage } from '../image-widget/image-widget';
import { WorkerProvider } from '../../providers/worker/worker';
import { WorkerTypeProvider } from '../../providers/worker-type/worker-type'


/**
 * Generated class for the CarAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-car-add',
 	templateUrl: 'car-add.html',
 })
 export class CarAddPage {

 	form: FormGroup;
 	key:any;
 	cooperative: Cooperative = new Cooperative();
 	cartypes: any;
 	statusList = new StatusCars().statusList;
 	nbplace: number = 0;
 	image :any;
 	url:any;
 	workers = [];
 	workersList: any;

 	constructor(private cameraProvider: CameraProvider, 
 		private workerTypeProvider: WorkerTypeProvider,
 		private workerProvider: WorkerProvider,
 		private modalCtrl: ModalController,
 		private carProvider: CarProvider, 
 		private cartypeProvider: CarTypeProvider, 
 		private cooperativeProvider: CooperativeProvider, public navCtrl: NavController, 
 		public navParams: NavParams, 
 		public formBuilder: FormBuilder,
 		public notif: NotificationProvider) {
 		this.form = this.formBuilder.group({
 			matricule: ['',Validators.required],			
 			cartype: ['',Validators.required],	
 			nbplace: [0,Validators.required],	
 			status: ['',Validators.required],
 			workers: [],	

		 }); 
		 
		 this.toConstruct();
 	}

 	ionViewWillEnter() {

	 }
	 
	 toConstruct(){
		this.workersList = [];

 		this.url = "assets/icon/bus.png" 
 		this.key = this.navParams.get('key');
 		this.cooperativeProvider.fetch(this.key).then(
 			(data: Cooperative) => {
 				this.cooperative = data;
 			});

 		this.cartypes = [];

 		this.cartypeProvider.fetcAll().subscribe((cartypes)=>{

 			for(let key in cartypes){
 				cartypes[key].key = key;
 				this.cartypes.push(cartypes[key]);
 			}
 		});


 		this.getWorkers();
	 }

 	getWorkers(){

 		let path = `cooperative/${this.key}/worker`;

 		this.workerProvider.customPath(path);

 		this.workerProvider.fetcAll().subscribe((workers)=>{
 			for(let w in workers){
 				
 				workers[w].key = w;
 				this.workerTypeProvider.fetch(workers[w].type).then((workerType)=>{
 					workers[w].type = workerType;
 					this.workersList.push(workers[w]);
 				})

 			}
 		})

 	}

 	getNbplace(cartypeKey: string){
 		this.cartypeProvider.fetch(cartypeKey).then((cartype)=>{
 			let notavailable = JSON.parse(cartype['notavailable']);
 			let nbplace = cartype['nbplace'] - Object.keys(notavailable).length;
 			this.nbplace = nbplace;
 		})
 	}

 	onSubmit(){
 		let message = "Voulez vous vraimment ajouter la voiture N° " + this.form.value.matricule + " dans " + this.cooperative.name;
 		let title = "Ajout de voiture"
 		this.notif.presentConfirm(message, title).then(
 			(confirm)=>{
 				let value = this.form.value;
 				if(this.url){
 					value.image = this.url;
 				}

 				if (this.workers) {
 					value.workers = JSON.stringify(this.workers);
 				}

 				let car = new Car(value);
 				let customPath = `cooperative/${this.key}/car`;
 				this.carProvider.customPath(customPath);
 				this.carProvider.save(car,car.matricule);
 				this.navCtrl.setRoot(CarDetailsPage, {key: car.matricule, coop: this.key});
 			},
 			()=>{});
 		
 	}



 	imageWidget(){
 		let modal = this.modalCtrl.create(ImageWidgetPage, null, {cssClass:'pricebreakup' });

 		modal.onDidDismiss(image => {
 			if (image) {
 				this.image = image;
 				this.carProvider.uploadImage(this.image).then((url)=>{
 					this.url = url;
 				})
 			}
 		})

 		modal.present();

 	}

 }
