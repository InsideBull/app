import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StationProvider } from '../../providers/voyage/station';
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public stationProvider: StationProvider) {
  }

  ionViewDidLoad() {
    this.stations = [];
    this.stationProvider.fetcAll().subscribe(
      (data)=>{
        for(let key in data){
          data[key].key= key;
         this.stations.push(data[key]); 
        }
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