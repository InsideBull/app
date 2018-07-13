import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';

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
 	}

 	ionViewDidLoad() {
 		this.key = this.navParams.get('key');
 		this.cooperativeProvider.fetch(this.key).then(
 			(data: Cooperative) => {
 				this.cooperative = data;
 			});
 	}

 	addCarType(){

 	}

 	listCar(){

 	}

 	addCar(){
 		
 	}

 }