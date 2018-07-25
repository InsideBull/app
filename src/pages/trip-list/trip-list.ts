import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
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
  private loading: Loading;

  constructor(private tripProvider: TripProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.key = this.navParams.get('key');
    this.trips = [];
    
    let path = `trip/${this.key}`;
    this.tripProvider.customPath(path);

    this.tripProvider.fetcAll().subscribe((trips)=>{
    	for(let key in trips){
        trips[key].key = key;
    		this.trips.push(trips[key]);
    	}
      this.loading.dismiss();
    });

  }
  delete(key: string){
    this.tripProvider.deleteTrip(key);
    this.navCtrl.push(TripListPage, {key: this.key});
  }

}
