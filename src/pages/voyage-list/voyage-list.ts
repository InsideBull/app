import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { VoyageProvider } from '../../providers/voyage/voyage';
import { StationProvider } from '../../providers/station/station';
import { Station } from '../../models/station.model';
import { VoyageDetailPage } from '../../pages/voyage-detail/voyage-detail';

/**
 * Generated class for the VoyageListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-voyage-list',
 	templateUrl: 'voyage-list.html',
 })
 export class VoyageListPage {

 	param: string;
 	voyages: any;
	 stations : any;
	private loading: Loading;

 	constructor(public navCtrl: NavController, 
 		public navParams: NavParams,
 		public stationProvider: StationProvider,
		public voyageProvider: VoyageProvider,
		private loadingCtrl: LoadingController) {
 	}

 	ionViewWillEnter() {
		this.loading = this.loadingCtrl.create();
		this.loading.present();

 		this.param = this.navParams.get('key');

		 this.voyageFilter();
		 
		 
		}
		
		
		
		voyageFilter(){
			this.voyages = [];

			
			this.voyageProvider.fetcAll().subscribe((voyages)=>{
				
				

				for(let key in voyages){

					voyages[key].key = key;

					let voyage = voyages[key];

					if (voyage.cooperative == this.param) {

						
 					this.stationProvider.fetch(voyage.arrivalstation).then((arrival)=>{
						 
 						voyage.arrivalstation = arrival;
					})
					.then(()=>{
						this.stationProvider.fetch(voyage.startstation).then((start)=>{
							voyage.startstation = start;
						})
					})
					.then(()=>{
						this.voyages.push(voyage)
					})
				}
				
			}
			
			this.loading.dismiss();
		})
		
 	}

 	onClickItem(i: any) {
 		this.navCtrl.push(VoyageDetailPage, {key: i, coop: this.param});
	 }

 }

