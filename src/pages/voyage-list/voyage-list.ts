import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VoyageProvider } from '../../providers/voyage/voyage';
import { StationProvider } from '../../providers/voyage/station';
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

    constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public stationProvider: StationProvider,
  	public voyageProvider: VoyageProvider) {
  	}

	ionViewDidLoad() {

		this.voyages = [];
	  	this.voyageProvider.fetcAll().subscribe(
	  		(data) => {
	  			for(let key in data){
	  				data[key].key = key;

	  				this.voyages.push(data[key]);				
	  			}
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

	onClickItem(i: any) {
  		this.navCtrl.push(VoyageDetailPage, {key: i});
  	}

  }

