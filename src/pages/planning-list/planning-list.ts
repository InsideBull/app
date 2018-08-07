import { Component, StaticProvider } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlanningProvider } from '../../providers/planning/planning';
import { Planning } from '../../models/planning.model'
import { TrajetProvider } from '../../providers/trajet/trajet';
import { StationProvider } from '../../providers/station/station';
import { BookingClassProvider } from '../../providers/booking-class/booking-class';
import { DayPlanning } from '../../models/day-planning.model';
import { PlanningDetailsPage } from '../planning-details/planning-details';

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

 	plannings: any;
	 coop: string;
	 days = new DayPlanning().days;
	 myInput: any;
	 
 	constructor(
 		public navCtrl: NavController,
 		public navParams: NavParams,
		private planningProvider: PlanningProvider,
		public trajetProvider: TrajetProvider,
		public stationProvider: StationProvider,
		public bookingClassProvider: BookingClassProvider

 		) {
 		this.init()
 	}

 	init(){

		 this.coop = this.navParams.get('coop');
		 this.myInput = this.navParams.get('search');

 		let ppath = `cooperative/${this.coop}/planning`;
		this.planningProvider.customPath(ppath);
		let pathTrajet = `cooperative/${this.coop}/trajet`;
		this.trajetProvider.customPath(pathTrajet);
		let pathBooking = `cooperative/${this.coop}/booking_class`;
		this.bookingClassProvider.customPath(pathBooking);


 		this.planningProvider.fetcAll().subscribe((plannings)=>{
 			
			 this.plannings = [];
			  for(let a in plannings){

				  
				  for(let b in plannings[a]){
					  
					for(let c in plannings[a][b]){

						for(let d in plannings[a][b][c]){

							let planning = {}

							planning['day'] = this.days.find(day=> day.id.toString() == a);					
							planning['time'] = b;

							this.trajetProvider.fetch(c).then((traject)=>{
								planning['traject'] = traject;
								planning['traject'].key = c;

								this.stationProvider.fetch(traject['depart']).then((depart)=>{
									planning['traject'].depart = depart;
								});
								this.stationProvider.fetch(traject['arrive']).then((arrive)=>{
									planning['traject'].arrive = arrive;
								});
							});

							this.bookingClassProvider.fetch(d).then((classe)=>{
								planning['class'] = classe;
								planning['class'].key = d;
								
							})
							// planning['cars'] = plannings[a][b][c][d].cars;

		
							this.plannings.push(planning);

						}

					}
				}
					
			}
		 });

		 



 	}

 	ionViewDidLoad() {

	 }
	 
	 onClickItem(planning){
		this.navCtrl.push(PlanningDetailsPage, {keyClass: planning.class.key, traject: planning.traject.key, day: planning.day.id, time: planning.time, coop: this.coop});

	 }

 }
