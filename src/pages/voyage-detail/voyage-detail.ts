import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VoyageProvider } from '../../providers/voyage/voyage';
import { StationProvider } from '../../providers/voyage/station';
import { Station } from '../../models/station.model';
import { VoyageManagePage } from '../../pages/voyage-manage/voyage-manage';


/**
 * Generated class for the VoyageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voyage-detail',
  templateUrl: 'voyage-detail.html',
})
export class VoyageDetailPage {

	param: string;
	voyage: any;
	stations : any;
	arrivalStation: any;
	startstation: any;


  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public stationProvider: StationProvider,
  	public voyageProvider: VoyageProvider) {
  }

  ionViewDidLoad() {

  	this.param = this.navParams.get('key');

  	this.voyageProvider.fetch(this.param).then(
  		(data) => {
  				this.voyage = data;
  				// console.log(data);
  			});

  	this.stations = [];
    this.stationProvider.fetcAll().subscribe(
    	(data) => {
    		for(let key in data){
  				data[key].key = key;
  				
  				if(this.voyage.arrivalstation == key){
  					this.arrivalStation = data[key];
  				}else if(this.voyage.startstation == key){
  					this.startstation = data[key];
  				}
  			}
    	});

    }

    goToManage(i){
      this.navCtrl.push(VoyageManagePage, {key: i});
    }

  }
