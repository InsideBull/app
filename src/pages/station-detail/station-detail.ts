import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StationProvider } from '../../providers/voyage/station';

/**
 * Generated class for the StationDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-station-detail',
  templateUrl: 'station-detail.html',
})
export class StationDetailPage {

  param: string;
  station: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public stationProvider: StationProvider) {
  }

  ionViewDidLoad() {
    this.param = this.navParams.get('key');
    this.stationProvider.fetch(this.param).then(
      (data)=>{
        this.station = data;
      }
    );
  }

}
