import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StationProvider } from '../../providers/station/station';

/**
 * Generated class for the StationManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-station-manage',
  templateUrl: 'station-manage.html',
})
export class StationManagePage {

  param: string;
  station: any;
  name: string;
  location: string;


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
