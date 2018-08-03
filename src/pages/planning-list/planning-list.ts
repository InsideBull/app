import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlanningProvider } from '../../providers/planning/planning';
import { Planning } from '../../models/planning.model'

/**
 * Generated class for the PlanningListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-planning-list',
 	templateUrl: 'planning-list.html',
 })
 export class PlanningListPage {

 	plannings = [];
 	coop: string;
 	constructor(
 		public navCtrl: NavController,
 		public navParams: NavParams,
 		private planningProvider: PlanningProvider

 		) {
 		this.init()
 	}

 	init(){

 		this.coop = this.navParams.get('coop');

 		let ppath = `cooperative/${this.coop}/planning`;
 		this.planningProvider.customPath(ppath);
 		this.planningProvider.fetcAll().subscribe((plannings)=>{
 			
 			this.plannings = [];

 			for(let p in plannings){

 				let planningDay = plannings[p];

 				for(let d in planningDay){

 						let planningHour = planningDay[d];

 						for(let h in planningHour){

 							let planningTraject = planningHour[h];

 							for(let t in planningTraject){

 								let planningClass = planningTraject[t];

 								let plan = new Planning(planningClass);

 								let cars = JSON.parse(plan.cars);
 							}
 						}



 				}

 			}



 		})



 	}

 	ionViewDidLoad() {

 	}

 }
