import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TripProvider } from '../../providers/trip/trip';

/**
 * Generated class for the TripListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trip-list',
  templateUrl: 'trip-list.html',
})
export class TripListPage {

  key: any;
  trips: any;
  constructor(private tripProvider: TripProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.key = this.navParams.get('key');
    this.trips = [];
    
    let path = `trip/${this.key}`;
    this.tripProvider.customPath(path);

    this.tripProvider.fetcAll().subscribe((trips)=>{
    	for(let key in trips){
    		this.trips.push(trips[key]);
    	}
    })

  }

}
