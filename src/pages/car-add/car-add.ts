import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Cooperative } from '../../models/cooperative.model';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { CarTypeProvider } from '../../providers/car-type/car-type';
import { Car } from '../../models/car.model';
import { CarProvider } from '../../providers/car/car';
import { CarDetailsPage } from '../car-details/car-details'


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
 	statusList = ['available', 'breakdown', 'travelling'];
 	nbplace: number = 0;
 	constructor(private carProvider: CarProvider, private cartypeProvider: CarTypeProvider, private cooperativeProvider: CooperativeProvider, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
 		this.form = this.formBuilder.group({
 			matricule: ['',Validators.required],			
 			cartype: ['',Validators.required],	
 			nbplace: [0,Validators.required],	
 			status: ['',Validators.required],	

 		});
 	}

 	ionViewDidLoad() {
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
 		let value = this.form.value;
 		let car = new Car(value);
 		let customPath = `cooperative/${this.key}/car`;
 		this.carProvider.customPath(customPath);
 		let key = this.carProvider.save(car);
 		this.navCtrl.push(CarDetailsPage, {key: key, coop: this.key});
 		
 	}

 }
