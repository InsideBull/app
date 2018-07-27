import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VoyageProvider } from '../../providers/voyage/voyage';
import { StationProvider } from '../../providers/station/station';
import { Station } from '../../models/station.model';
import { Voyage } from '../../models/voyage.model';
import { VoyageDetailPage } from '../voyage-detail/voyage-detail';
import { NotificationProvider } from '../../providers/notification/notification';
import { CooperativeProvider } from '../../providers/cooperative/cooperative';
import { Cooperative } from '../../models/cooperative.model';

/**
 * Generated class for the VoyageManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voyage-manage',
  templateUrl: 'voyage-manage.html',
})
export class VoyageManagePage {

	param: any;
	coop: any;
	cooperative: Cooperative = new Cooperative();
	voyage: Voyage = new Voyage();
	stations: any;
	min: any;
	max: any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public stationProvider: StationProvider,
		public voyageProvider: VoyageProvider,
		public notif: NotificationProvider,
	public cooperativeProvider: CooperativeProvider) {
  }
 
  ionViewWillEnter() {
	this.param = this.navParams.get('key');
	this.coop = this.navParams.get('coop');

    this.voyageProvider.fetch(this.param).then(
  		(data: Voyage) => {
  				this.voyage = data;

  			});

  	this.stations = [];
    this.stationProvider.fetcAll().subscribe(
    	(data) => {
    		for(let key in data){
  				data[key].key = key;
  				this.stations.push(data[key]);
  			}

		});

		this.cooperativeProvider.fetch(this.param).then(
			(data: Cooperative) => { 
			  this.cooperative = data;
			});
		
		this.min = this.monent().toISOString();
       let max = this.monent(); 
       max.setDate(max.getDate()+365);
       this.max = max.toISOString(); 

	}
	
	change(){
		let message = "Voulez vous enregistrer les modifications?";
    let title = "Modification";
    this.notif.presentConfirm(message, title).then((confirm)=>{
			this.voyageProvider.save(this.voyage, this.param);
			this.navCtrl.push(VoyageDetailPage, {key: this.param, coop: this.coop});
		},()=>{});
	}
	
 
	monent(){
		return new Date();
	  }
}
