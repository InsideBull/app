import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VoyageProvider } from '../../providers/voyage/voyage';
import { StationProvider } from '../../providers/station/station';
import { Station } from '../../models/station.model';
import { Voyage } from '../../models/voyage.model';
import { VoyageDetailPage } from '../voyage-detail/voyage-detail';
import { NotificationProvider } from '../../providers/notification/notification';

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
	voyage: Voyage = new Voyage();
	stations: any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public stationProvider: StationProvider,
		public voyageProvider: VoyageProvider,
		public notif: NotificationProvider) {
  }
 
  ionViewDidLoad() {
    this.param = this.navParams.get('key');

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

	}
	
	change(){
		let message = "Voulez vous enregistrer les modifications?"
    let title = "Modification";
    this.notif.presentConfirm(message, title).then((confirm)=>{
			this.voyageProvider.save(this.voyage, this.param);
			this.navCtrl.push(VoyageDetailPage, {key: this.param});
		},()=>{});
	}

}
