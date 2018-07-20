import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { StationProvider } from '../../providers/station/station';
import { StationDetailPage } from '../station-detail/station-detail';

/**
 * Generated class for the StationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-station-list',
  templateUrl: 'station-list.html',
})
export class StationListPage {

  stations: any;
  private loading: Loading;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public stationProvider: StationProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.stations = [];
    this.stationProvider.fetcAll().subscribe(
      (data)=>{
        for(let key in data){
          data[key].key= key;
         this.stations.push(data[key]); 
        }
        this.loading.dismiss();
      }
    );

  }

  onClickLabel(key){
    this.navCtrl.push(StationDetailPage, {key: key});
  }

  onClickIcon(i){
    this.stations.splice(i, 1);
    this.stationProvider.deleteStation(i);
    this.navCtrl.push(StationListPage);
  }

}
