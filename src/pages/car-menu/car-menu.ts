import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';
import { CarListPage } from '../car-list/car-list';
import { CarAddPage } from '../car-add/car-add';
import { CarTypePage } from '../car-type/car-type'

/**
 * Generated class for the CarMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-car-menu',
 	templateUrl: 'car-menu.html',
 })
 export class CarMenuPage {

 	key:any;
 	cooperative: Cooperative = new Cooperative();
 	constructor(private cooperativeProvider: CooperativeProvider, public navCtrl: NavController, public navParams: NavParams) {
		 this.key = this.navParams.get('key');
		 this.cooperativeProvider.fetch(this.key).then(
			 (data: Cooperative) => {
				 this.cooperative = data;
				 if(!this.cooperative.logo){
					 this.cooperative.logo = "assets/icon/copyright.png";
				 }
			 });
 	}

 	ionViewWillEnter() {
 	}

 	addCarType(){
 		this.navCtrl.push(CarTypePage, {key: this.key});
 	}

 	listCar(){
		this.navCtrl.push(CarListPage, {key: this.key});
 	}

 	addCar(){
 		this.navCtrl.push(CarAddPage, {key:this.key});
 	}

 }
